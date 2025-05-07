import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { ArticleService } from '../service/article.service';

import { CommentComponent } from '../comment-control/comment/comment.component';
import { LikeDislikeComponent } from "../share/like-dislike/like-dislike.component";
import { MoreNewsComponent } from '../more-news/more-news.component';
import { TrandingNewsComponent } from "../tranding-news/tranding-news.component";
import { DomSanitizer, Meta, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-article',
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
export class ArticleComponent implements OnInit, OnDestroy {


  private baseUrl = 'https://new.hardknocknews.tv';

  article: any;
  thumbUrl: string | null = null;
  extraImageUrls: string[] = [];
  showPopup = false;
  linkCopied: boolean = false;
  loading: boolean = true;
  firstTextEntry: any = null;
  allTimeStats = 0;

  private localStorageAvailable: boolean = false;


  tags: { id: number; name: string; slug: string; icon: string | null; color: string | null }[] = [];

  constructor(
    private renderer: Renderer2,
    private articleService: ArticleService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private meta: Meta,


    @Inject(PLATFORM_ID) private platformId: Object



  ) { }

  ngOnInit(): void {
    this.localStorageAvailable = isPlatformBrowser(this.platformId);

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

      this.loadArticleFromApi(type, slug); // Fetch article if not in localStorage


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

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });  // Only run in the browser
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
    // Simply sanitize the HTML without replacements
    return this.sanitizer.bypassSecurityTrustHtml(body);
  }



  handleArticle(data: any): void {
    this.article = data;
    this.setThumbFromEntriesOnly(data.entries || []);
    this.firstTextEntry = data.entries?.find((e: any) => e.type === 'text' && e.body) || null;
    this.setExtraImages(data.entries || []);
    this.tags = data.tags || [];
    this.article.spdate = this.calculateTimeAgo(data.spdate);
    // ✅ Set SEO meta tags
    // ✅ Set SEO meta tags
    const description = data.body || data.title;  // Use article body or title as fallback

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: `${this.baseUrl}/upload/media/posts/${data.thumb}-s.jpg` });



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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('selectedArticle');
    }
  }


  setExtraImages(entries: any[]): void {
    this.extraImageUrls = [];

    let imageSkipped = false; // flag to skip first image

    entries.forEach((entry: any) => {
      if (entry.type === 'image' && entry.image) {
        if (!imageSkipped) {
          imageSkipped = true; // skip the first image
          return;
        }
        const imageUrl: string | null = this.setImageUrl(entry.image);
        if (imageUrl) {
          this.extraImageUrls.push(imageUrl);
        }
      }

      if (entry.type === 'video' && entry.video) {
        this.setVideoUrl(entry.video);
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

    // Always get absolute time difference in seconds
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


}
