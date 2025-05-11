import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseISO, formatDistanceToNowStrict } from 'date-fns';
import { ArticleService } from '../service/article.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-tranding-news',
  imports: [CommonModule],
  templateUrl: './tranding-news.component.html',
  styleUrls: ['./tranding-news.component.css']
})
export class TrandingNewsComponent implements OnInit {
  @Input() article: any;

  news: any[] = [];
  private readonly baseUrl = 'https://new.hardknocknews.tv/upload/media/posts';
  localStorageAvailable: boolean = false; 

  constructor(
    private readonly httpArticle: ArticleService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.localStorageAvailable = isPlatformBrowser(this.platformId);

    this.fetchArticles();
  }

  private fetchArticles(): void {
    this.httpArticle.getArticle().subscribe({
      next: (res: any) => {
        const posts = res?.posts;
        if (!Array.isArray(posts)) {
          this.news = [];
          return;
        }

        const topPosts = posts
          .filter((post: any) => post.popularity_stats?.all_time_stats > 0)
          .sort((a: any, b: any) =>
            b.popularity_stats.all_time_stats - a.popularity_stats.all_time_stats
          )
          .slice(0, 15)
          .map((post: any) => this.mapPost(post));

        // Store in localStorage only if running in the browser
        if (this.localStorageAvailable) {
          localStorage.setItem('articles', JSON.stringify(topPosts));
        }

        this.news = topPosts;
      },
      error: () => {
        this.news = [];
      }
    });
  }

  getPost(type: string, slug: string, article: any): void {
    // Remove the previously selected article from localStorage only if in the browser environment
    if (this.localStorageAvailable) {
      localStorage.removeItem('selectedArticle');
    }

    this.httpArticle.getsinglepost(type, slug).subscribe(() => {
      this.httpArticle.setSelectedArticle(article);

      // Store the new article in localStorage only if in the browser environment
      if (this.localStorageAvailable) {
        localStorage.setItem('selectedArticle', JSON.stringify(article));
      }

      const routePath = type === 'video' ? 'video-news' : 'article';

      // Force reload of the component on route navigation
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

  private getRelativeTime(date: string): string {
    return formatDistanceToNowStrict(parseISO(date));
  }

  // Unused for now — kept for future use if needed
  private shuffleAndLimit(arr: any[], count: number): any[] {
    return arr
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, count)
      .map(({ value }) => value);
  }
}
