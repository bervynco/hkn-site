import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { ArticleService } from '../service/article.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-carousel',

  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  newss: any[] = [];
  currentIndex = 0;
  private interval: any;
  private readonly baseUrl = 'https://new.hardknocknews.tv/upload/media/posts';
  isBrowser: boolean = false;

  constructor(
    private httpArticle: ArticleService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
              this.isBrowser = isPlatformBrowser(this.platformId);  // ✅ Add this line

    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
      this.getArticles();
    }
  }
  

  nextSlide(): void {
    const maxIndex = Math.ceil(this.newss.length / 3) - 1;
    this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
  }

  prevSlide(): void {
    const maxIndex = Math.ceil(this.newss.length / 3) - 1;
    this.currentIndex = this.currentIndex === 0 ? maxIndex : this.currentIndex - 1;
  }

  startAutoSlide(): void {
    this.interval = setInterval(() => this.nextSlide(), 3000);
  }

  stopAutoSlide(): void {
    clearInterval(this.interval);
  }

  private getArticles(): void {
    this.httpArticle.getArticle().subscribe({
      next: (res: any) => {
        const posts = res?.posts;
        if (!Array.isArray(posts)) {
          this.newss = [];
          return;
        }

        const topPosts = posts
          .filter((post: any) => post.popularity_stats?.all_time_stats > 0)
          .sort((a: any, b: any) =>
            b.popularity_stats.all_time_stats - a.popularity_stats.all_time_stats
          )
          .slice(0, 15)
          .map((post: any) => this.mapPost(post));

        // Only set in browser, check platform
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('articles', JSON.stringify(topPosts));
        }

        this.newss = topPosts;
      },
      error: () => {
        this.newss = [];
      }
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

  private shuffleAndLimit(arr: any[], count: number): any[] {
    return arr
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, count)
      .map(({ value }) => value);
  }

  getPost(type: string, slug: string, article: any): void {
    if (isPlatformBrowser(this.platformId)) {
      // Clear the previously selected article from localStorage only in the browser
      localStorage.removeItem('selectedArticle');
    }

    this.httpArticle.getsinglepost(type, slug).subscribe(result => {
      this.httpArticle.setSelectedArticle(article);

      // Only set selected article in localStorage if running in browser
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('selectedArticle', JSON.stringify(article));
      }

      const routePath = type === 'video' ? 'video-news' : 'article';
      this.router.navigate([routePath, type, slug]);

      console.log(result);
    });
  }
}
