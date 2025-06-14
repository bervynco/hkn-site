import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  Inject,
  ChangeDetectorRef,
  AfterViewInit,  // <-- added
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ArticleService } from '../service/article.service';
import { CommentComponent } from '../comment-control/comment/comment.component';
import { LikeDislikeComponent } from '../share/like-dislike/like-dislike.component';
import { MoreNewsComponent } from '../more-news/more-news.component';
import { TrandingNewsComponent } from '../tranding-news/tranding-news.component';
import { DomSanitizer } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-video-news',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    LikeDislikeComponent,
    MoreNewsComponent,
    TrandingNewsComponent
  ],
  templateUrl: './video-news.component.html',
  styleUrls: ['./video-news.component.css'],
})
export class VideoNewsComponent implements OnInit, OnDestroy, AfterViewInit {  // <-- implements AfterViewInit
  private baseUrl = 'https://new.hardknocknews.tv';

  article: any;
  extraImageUrls: string[] = [];
  videoUrl: string | null = null;
  loading: boolean = true;
  showPopup = false;
  isMobile = false;
  showDescription = false;
  isBrowser: boolean = false;

  allTimeStats = 0;
  tags: {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    color: string | null;
  }[] = [];

  private localStorageAvailable: boolean = false;
  private maxRetries = 5;
  private retryInterval = 100; // ms

  private articleReady = false; // <-- track when article is ready

  constructor(
    private renderer: Renderer2,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private meta: Meta,
    private changeDetectorRef: ChangeDetectorRef,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.localStorageAvailable = this.isBrowser;
    this.updateIsMobile();

    this.route.params.subscribe((params) => {
      const { type, slug } = params;
      if (this.localStorageAvailable) {
        const storedArticle = localStorage.getItem('selectedArticle');
        if (storedArticle) {
          this.article = JSON.parse(storedArticle);
          console.log(this.article);
          this.handleArticle(this.article);
        }
      }
      this.loadArticleFromApi(type, slug);
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
  
    const checkReady = () => {
      const container = document.getElementById('connatix-player');
      if (this.articleReady && container) {
        this.loadConnatixHeadScript();
        this.loading = false;
      } else {
        setTimeout(checkReady, 150);
      }
    };
  
    checkReady();
  }
  

  loadArticleFromApi(type: string, slug: string): void {
    if (!type || !slug) {
      console.error('Missing route parameters (type or slug)');
      return;
    }

    this.articleService.getsinglepost(type, slug).subscribe({
      next: (response: any) => {
        if (response && response.post) {
          const matchedArticle = response.post;
          if (matchedArticle) {
            this.incrementPostView(matchedArticle);
            this.fetchCount(type, slug);
            this.handleArticle(matchedArticle);
            if (this.localStorageAvailable) {
              localStorage.setItem('selectedArticle', JSON.stringify(matchedArticle));
            }
            this.loading = false;
          }
        }
      },
      error: (error) => {
        console.error('Error fetching article:', error);
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.localStorageAvailable) {
      localStorage.removeItem('selectedArticle');
      localStorage.removeItem('hasRefreshed');
    }
  }

  getSafeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  handleArticle(data: any): void {
    this.article = data;
    this.article.formattedCreatedAt = data.created_at
      ? this.formatDate(data.created_at)
      : '';
    this.article.formattedUpdatedAt = data.updated_at
      ? this.formatDate(data.updated_at)
      : '';

    const imageUrl = `${this.baseUrl}/upload/media/posts/${this.article.thumb}-s.jpg`;

    this.titleService.setTitle(this.article.title);
    this.meta.updateTag({ name: 'description', content: this.article.altdescription || this.article.title });
    this.meta.updateTag({ property: 'og:title', content: this.article.title });
    this.meta.updateTag({ property: 'og:description', content: this.article.altdescription || this.article.title });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });

    this.changeDetectorRef.detectChanges();

    this.articleReady = true;  // <-- set ready here, so polling can detect
  }

  loadConnatixHeadScript(): void {
    const containerExists = document.getElementById('connatix-player');
    if (!containerExists) {
      console.warn('Connatix container not found');
      return;
    }

    const existingScript = document.querySelector('script[src*="connatix.player.js"]');
    if (!existingScript) {
      const script = this.renderer.createElement('script');
      script.src = 'https://cd.connatix.com/connatix.player.js?cid=ecbe7164-e3a1-480d-a223-ae612c2f1530&pid=f38e66b5-6bf2-412e-aa16-7422c994e60e';
      script.async = true;
      script.onload = () => {
        console.log('Connatix script loaded.');
        this.tryRenderPlayer(0);
      };
      script.onerror = () => {
        console.error('Failed to load Connatix script.');
      };
      this.renderer.appendChild(document.head, script);
    } else {
      console.log('Connatix script already present');
      this.tryRenderPlayer(0);
    }
  }

  tryRenderPlayer(retryCount: number): void {
    if (!window.cnx || !window.cnx.cmd) {
      if (retryCount < this.maxRetries) {
        console.log(`Connatix not ready, retrying (${retryCount + 1}/${this.maxRetries})...`);
        setTimeout(() => this.tryRenderPlayer(retryCount + 1), this.retryInterval);
      } else {
        console.error('Max retries reached, Connatix failed to initialize.');
      }
      return;
    }
    this.renderPlayer();
  }

  renderPlayer(): void {
    const containerId = 'connatix-player';
    const videoUrl = this.article?.entries?.[0]?.video ? this.getVideoUrl(this.article.entries[0].video) :'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    console.log('Rendering player for:', videoUrl);

    new Image().src = `https://capi.connatix.com/tr/si?token=f38e7164-6bf2-412e-aa16-7422c994e60e&cid=ecbe7164-e3a1-480d-a223-ae612c2f1530`;

    window.cnx.cmd.push(() => {
      window.cnx({
        playerId: 'f38e66b5-6bf2-412e-aa16-7422c994e60e',
        settings: {
          playbackMode: window.cnx.configEnums.PlaybackModeEnum.AutoPlay,
          defaultSoundMode: window.cnx.configEnums.DefaultSoundModeEnum.ClickToPlay,
          playlist: [{
            imageUrl: `${this.baseUrl}/upload/media/posts/${this.article.thumb}-s.jpg`,
            sources: [{
              file: `${videoUrl}`,
              quality: window.cnx.configEnums.QualityEnum.Medium480p
            }],
            clickUrl: ''
          }]
        }
      }).render(containerId);
    });
  }

  getVideoUrl(path: string): string {
    return `https://new.hardknocknews.tv/${path}`;
  }

  setExtraImages(entries: any[]): void {
    this.extraImageUrls = entries.map((entry: any) => `https://new.hardknocknews.tv/${entry.image}`);
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
    if (this.showPopup) {
      this.renderer.addClass(document.body, 'blur-bg');
    } else {
      this.renderer.removeClass(document.body, 'blur-bg');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.popup-container') && !target.closest('.share-btn')) {
      this.showPopup = false;
      this.renderer.removeClass(document.body, 'blur-bg');
    }
  }

  @HostListener('window:resize')
  updateIsMobile(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? 'Invalid date'
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  incrementPostView(articleData?: any): void {
    const data = articleData || JSON.parse(localStorage.getItem('selectedArticle') || '{}');
    const postId = data?.id;

    if (postId) {
      this.articleService.postIncriment(postId).subscribe();
    }
  }

  fetchCount(type: any, slug: any): void {
    this.articleService.getcount(type, slug).subscribe({
      next: (res) => {
        this.allTimeStats = res?.stats?.all_time_stats || 0;
      },
      error: (err) => {
        console.error('Error in fetchCount:', err);
      },
    });
  }

  processArticles(posts: any[]): void {
    console.log(posts);
  }
}
