import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, Renderer2, Inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ArticleService } from '../service/article.service';
import { CommentComponent } from '../comment-control/comment/comment.component';
import { LikeDislikeComponent } from '../share/like-dislike/like-dislike.component';
import { MoreNewsComponent } from '../more-news/more-news.component';
import { TrandingNewsComponent } from '../tranding-news/tranding-news.component';
import { DomSanitizer } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-video-news',
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
export class VideoNewsComponent implements OnInit, OnDestroy {
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

  constructor(
    private renderer: Renderer2,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private meta: Meta,
    private changeDetectorRef: ChangeDetectorRef,

        private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: any // Inject PLATFORM_ID to check if running in browser
  ) {}

  ngOnInit(): void {
    this.localStorageAvailable = isPlatformBrowser(this.platformId);
    this.updateIsMobile();

    this.route.params.subscribe((params) => {
      const { type, slug } = params;
      console.log('Type from URL:', type);
      console.log('Slug from URL:', slug);

      // If article is not already in localStorage, load it from API
      // if (this.localStorageAvailable) {
      //   const storedArticle = localStorage.getItem('selectedArticle');
      //   if (storedArticle) {
      //     this.article = JSON.parse(storedArticle);
      //     this.handleArticle(this.article);
      //     this.loading = false;
      //   } else {
      //     this.loadArticleFromApi(type, slug); // Fetch article if not in localStorage
      //   }
      // }

      if (this.localStorageAvailable) {
        const storedArticle = localStorage.getItem('selectedArticle');
        if (storedArticle) {
          this.article = JSON.parse(storedArticle);
          this.handleArticle(this.article);
          this.loading = false;
        } 
      }
                this.loadArticleFromApi(type, slug); // 🔁 Only call if no localStorage

    });
  }

 


  loadArticleFromApi(type: string, slug: string): void {
    if (!type || !slug) {
      console.error('Missing route parameters (type or slug)');
      return;
    }

    this.articleService.getsinglepost(type, slug).subscribe({
      next: (response: any) => {
        if (response && response.post) {
          // const matchedArticle = response.find(
          //   (post: any) => post.slug === slug && post.type === type
          // );
          const matchedArticle = response.post;
          console.log('Response matchedArticle from API:', matchedArticle);
          if (matchedArticle) {

            this.incrementPostView(matchedArticle);
            this.fetchCount(type, slug);
            this.handleArticle(matchedArticle);

            // Store the article in localStorage
            if (this.localStorageAvailable) {
              localStorage.setItem('selectedArticle', JSON.stringify(matchedArticle));
            }

            this.loading = false;
          } else {
            console.warn('No matching article found for type and slug');
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
  
    // ✅ Set SEO meta tags
    this.titleService.setTitle(this.article.title);
    this.meta.updateTag({ name: 'description', content: this.article.altdescription ||  this.article.title});
    this.meta.updateTag({ property: 'og:title', content: this.article.title });
    this.meta.updateTag({ property: 'og:description', content: this.article.altdescription  ||  this.article.title});
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
  
    this.changeDetectorRef.detectChanges();
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
      this.isMobile = window.innerWidth <= 768; // Add your mobile-width condition
    }
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  incrementPostView(articleData?: any): void {
    const data = articleData || JSON.parse(localStorage.getItem('selectedArticle') || '{}');
    const postId = data?.id;

    if (postId) {
      console.log('Incrementing views for post:', postId);
      this.articleService.postIncriment(postId).subscribe();
    }
  }

  fetchCount(type: any, slug: any): void {
    this.articleService.getcount(type, slug).subscribe({
      next: (res) => {
        this.allTimeStats = res?.stats?.all_time_stats || 0;
        console.log('Total views:', this.allTimeStats);
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
