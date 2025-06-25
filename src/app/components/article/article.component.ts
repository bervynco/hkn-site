import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  Inject,
  ChangeDetectorRef,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { CommentComponent } from '../comment-control/comment/comment.component';
import { LikeDislikeComponent } from "../share/like-dislike/like-dislike.component";
import { MoreNewsComponent } from '../more-news/more-news.component';
import { TrandingNewsComponent } from "../tranding-news/tranding-news.component";
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { SidebarService } from '../share/header/sidebar.service';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    LikeDislikeComponent,
    MoreNewsComponent,
    TrandingNewsComponent
  ],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class ArticleComponent implements OnInit, OnDestroy, AfterViewInit {
  private baseUrl = 'https://new.hardknocknews.tv';

  article: any;
  thumbUrl: string | null = null;
  extraImageUrls: string[] = [];
  showPopup = false;
  linkCopied: boolean = false;
  loading: boolean = true;
  firstTextEntry: any = null;
  allTimeStats = 0;
  isBrowser: boolean = false;
  isMobile = false;
  videoUrl: string | null = null;
  
  tags: { id: number; name: string; slug: string; icon: string | null; color: string | null }[] = [];

  private localStorageAvailable: boolean = false;
  private maxRetries = 5;
  private retryInterval = 100; // ms
  private articleReady = false;

  constructor(
    private renderer: Renderer2,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private meta: Meta,
    private titleService: Title,
    private sidebarService: SidebarService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

 ngOnInit(): void {
  this.isBrowser = isPlatformBrowser(this.platformId);
  this.localStorageAvailable = this.isBrowser;
  this.updateIsMobile();

  this.route.params.subscribe((params) => {
    const { type, slug } = params;
    const previousMenuState = this.sidebarService.getMenuState();

    // ✅ Always load from API so SSR gets real content
    if (type && slug) {
      this.loadArticleFromApi(type, slug);
    }
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
    const previousMenuState = this.sidebarService.getMenuState();

    if (!type || !slug) {
      console.error('Missing route parameters (type or slug)');
      this.loading = false;
      return;
    }

    this.articleService.getsinglepost(type, slug).subscribe({
      next: (response: any) => {
        const matchedArticle = response?.post;

        if (!matchedArticle) {
          console.warn('No matching article found for type and slug');
          this.loading = false;
          return;
        }

        this.incrementPostView(matchedArticle);
        this.fetchCount(type, slug);
        this.handleArticle(matchedArticle);

        if (this.localStorageAvailable) {
          localStorage.setItem('selectedArticle', JSON.stringify(matchedArticle));
        }

        this.loading = false;
        this.sidebarService.setMenuState(previousMenuState);
      },
      error: (error) => {
        console.error('Error fetching article:', error);
        this.loading = false;
        this.sidebarService.setMenuState(previousMenuState);
      },
    });
  }

  loadConnatixHeadScript(): void {
    const hasVideoEntry = this.article?.entries?.some((e: any) => e.type === 'video');
    if (!hasVideoEntry) return;

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
    const videoEntry = this.article?.entries?.find(
      (e: any) => e.type === 'video' && !!e.video
    );
        console.log('tessss',videoEntry);
    if (!videoEntry) return;

    const videoUrl = videoEntry.video ? this.getVideoUrl(videoEntry.video) : null;
    if (!videoUrl) return;

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
    return path.startsWith('http') ? path : `${this.baseUrl}/${path}`;
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

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.classList.remove('bg-gray-300', 'animate-pulse');
  }

  getSafeHtml(body: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(body);
  }

  handleArticle(data: any): void {
    this.article = data;
    this.setThumbFromEntriesOnly(data.entries || []);
    this.firstTextEntry = data.entries?.find((e: any) => e.type === 'text' && e.body) || null;
    this.setExtraImages(data.entries || []);
    this.tags = data.tags || [];
    this.article.spdate = this.calculateTimeAgo(data.spdate);
    
    this.titleService.setTitle(this.article.title);
   // ✅ Set SEO meta tags
    const description =  this.article.altdescription || data.title;  // Use article body or title as fallback

    this.meta.updateTag({ property: 'og:title', content: data.title });
this.meta.updateTag({ property: 'og:description', content: this.article.altdescription });
this.meta.updateTag({ property: 'og:image', content: `${this.baseUrl}/upload/media/posts/${data.thumb}-s.jpg` });



    this.changeDetectorRef.detectChanges();
    this.articleReady = true;
  }

  setThumbFromEntriesOnly(entries: any[]): void {
    const imageEntry = entries.find((entry: any) => entry.type === 'image' && entry.image);

    if (imageEntry) {
      const cleanImage = imageEntry.image.replace(/(-s|-m|-l)?\.jpg$/, '.jpg');
      this.thumbUrl = cleanImage.startsWith('http')
        ? cleanImage
        : `${this.baseUrl}/upload/media/entries/${cleanImage}`;
    }
  }

  setThumbUrl(thumb: string): void {
    if (!thumb) return;

    const cleanThumb = thumb.replace(/(-s|-m|-l)?\.jpg$/, '');
    this.thumbUrl = cleanThumb.startsWith('http')
      ? `${cleanThumb}-s.jpg`
      : `${this.baseUrl}/upload/media/entries/${cleanThumb}-s.jpg`;
  }

  ngOnDestroy(): void {
    if (this.localStorageAvailable) {
      localStorage.removeItem('selectedArticle');
    }
  }

  setExtraImages(entries: any[]): void {
    this.extraImageUrls = [];
    let imageSkipped = false;

    entries.forEach((entry: any) => {
      if (entry.type === 'image' && entry.image) {
        if (!imageSkipped) {
          imageSkipped = true;
          return;
        }
        const imageUrl: string | null = this.setImageUrl(entry.image);
        if (imageUrl) {
          this.extraImageUrls.push(imageUrl);
        }
      }

      if (entry.type === 'video' && entry.video) {
        this.videoUrl = this.setVideoUrl(entry.video);
      }

      if (entry.type === 'texts' && entry.body) {
        this.extraImageUrls.push(entry.body);
      }
    });
  }

  setImageUrl(image: string): string | null {
    if (!image || !image.endsWith('.jpg')) {
      return null;
    }

    const cleanImage = image
      .replace(/-0-/, '-')
      .replace(/(-s|-m|-l)?\.jpg$/, '.jpg');

    return cleanImage.startsWith('http')
      ? cleanImage
      : `${this.baseUrl}/upload/media/entries/${cleanImage}`;
  }

  setVideoUrl(video: string): string {
    let finalVideoUrl = video.startsWith('http')
      ? video
      : `${this.baseUrl}/${video}`;

    return finalVideoUrl.replace(/[^a-zA-Z0-9\-._~:\/?#[\]@!$&'()*+,;=]/g, (match) => {
      return '%' + match.charCodeAt(0).toString(16).toUpperCase();
    });
  }

  calculateTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);

    const seconds = Math.abs(Math.floor((now.getTime() - date.getTime()) / 1000));
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
    this.showPopup
      ? this.renderer.addClass(document.body, 'blur-bg')
      : this.renderer.removeClass(document.body, 'blur-bg');
  }

  @HostListener('document:click', ['$event'])
  closePopup(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.popup-container') && !target.closest('.share-btn')) {
      this.showPopup = false;
      this.renderer.removeClass(document.body, 'blur-bg');
    }
  }

  @HostListener('window:resize')
  updateIsMobile(): void {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth <= 768;
    }
  }
}

declare global {
  interface Window {
    cnx: any;
  }
}