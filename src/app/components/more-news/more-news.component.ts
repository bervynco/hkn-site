import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseISO, formatDistanceToNowStrict } from 'date-fns';
import { ArticleService } from '../service/article.service';
import { CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-more-news',

  imports: [CommonModule],
  templateUrl: './more-news.component.html',
  styleUrls: ['./more-news.component.css']
})
export class MoreNewsComponent implements OnInit {
  news: any[] = [];
  private readonly baseUrl = 'https://new.hardknocknews.tv/upload/media/posts';
  loading: boolean = true;
  localStorageAvailable: boolean = false;

  constructor(
    private readonly httpArticle: ArticleService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    // Check if we are in the browser environment
    // this.localStorageAvailable = isPlatformBrowser(this.platformId);
    
    // Always fetch articles from the API
    this.fetchArticles();
  }

  private fetchArticles(): void {
    this.loading = true;

    this.httpArticle.getArticle().subscribe({
      next: (res: any) => {
        const posts = res?.posts;
        if (!Array.isArray(posts)) {
          this.news = [];
          return;
        }

        // Map and sort posts
        const mapped = posts.map((post: any) => this.mapPost(post)).sort(
          (a, b) => new Date(b.spdate).getTime() - new Date(a.spdate).getTime()
        );

        // Optionally store the fetched articles in localStorage for caching (only available in the browser)
        if (this.localStorageAvailable) {
          localStorage.setItem('articles', JSON.stringify(mapped));
        }

        // Set the news array
        this.news = this.shuffleAndLimit(mapped, 16);
      },
      error: () => {
        this.news = [];
        this.loading = false;
      },
      complete: () => {
        setTimeout(() => this.loading = false, 300); // 300ms delay for smooth blink
      }
    });
  }

  getPost(type: string, slug: string, article: any) {
    // Only use localStorage if it's available (client-side)
    if (this.localStorageAvailable) {
      localStorage.removeItem('selectedArticle');
    }

    this.httpArticle.getsinglepost(type, slug).subscribe(result => {
      this.httpArticle.setSelectedArticle(article);

      // Only use localStorage if it's available (client-side)
      if (this.localStorageAvailable) {
        localStorage.setItem('selectedArticle', JSON.stringify(article));
      }

      const routePath = type === 'video' ? 'video-news' : 'article';

      // Force component reload using Angular route strategy
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([routePath, type, slug]);
    });
  }

  private mapPost(post: any): any {
    return {
      ...post,
      thumb: post.thumb ? `${this.baseUrl}/${post.thumb}-s.jpg` : null,
      relativeTime: this.getRelativeTime(post.spdate)
    };
  }

  private shuffleAndLimit(arr: any[], count: number): any[] {
    return arr
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, count)
      .map(({ value }) => value);
  }

  private getRelativeTime(date: string): string {
    return formatDistanceToNowStrict(parseISO(date));
  }
}
