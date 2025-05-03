import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { parseISO, formatDistanceToNowStrict } from 'date-fns';
import { ArticleService } from '../service/article.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-entertainment',

  imports: [CommonModule],
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.css']
})
export class EntertainmentComponent implements OnInit {

  news: any[] = [];
  mainImage: string = ''; // Stores the first news image
  localStorageAvailable: boolean = false;

  constructor(
    private httpArticle: ArticleService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  setSelectedArticle(article: any) {
    this.httpArticle.setSelectedArticle(article);
  }

  // Convert the published_at timestamp to a relative time
  getRelativeTime(publishedAt: string): string {
    const parsedDate = parseISO(publishedAt); // Parse the ISO 8601 string to a Date object
    return formatDistanceToNowStrict(parsedDate); // Get the relative time without "about"
  }

  ngOnInit(): void {
    this.localStorageAvailable = isPlatformBrowser(this.platformId); // Check if localStorage is available
    this.getArticles();
  }

  private baseUrl = 'https://new.hardknocknews.tv/upload/media/posts';

  getArticles(): void {
    this.httpArticle.getArticle().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.posts)) {
          // Filter posts to include only those with type 'Entertainment'
          this.news = response.posts
            .filter((post: any) => post.categories === 'Entertainment')
            .map((post: any) => {
              const updatedThumb = post.thumb ? `${this.baseUrl}/${post.thumb}-s.jpg` : null;
              return {
                ...post,
                thumb: updatedThumb,
                relativeTime: this.getRelativeTime(post.spdate), // Add relative time to each post
              };
            });

          // Sort the news array by the spdate (latest date first)
          this.news.sort((a, b) => {
            const dateA = new Date(a.spdate).getTime();
            const dateB = new Date(b.spdate).getTime();
            return dateB - dateA; // Sort in descending order
          });
        } else {
          this.news = []; // fallback if the API response format is not as expected
        }
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
      },
    });
  }

  getPost(type: string, slug: string, article: any) {
    // Only access localStorage on the client-side
    if (this.localStorageAvailable) {
      // Clear the previously selected article from localStorage
      localStorage.removeItem('selectedArticle');
      this.httpArticle.getsinglepost(type, slug).subscribe(result => {
        this.httpArticle.setSelectedArticle(article);
        localStorage.setItem('selectedArticle', JSON.stringify(article)); // Save the new article to localStorage

        // Navigate based on type, pass real values, not param names
        if (type === 'video') {
          this.router.navigate(['video-news', type, slug]);
        } else if (type === 'news') {
          this.router.navigate(['article', type, slug]);
        }
      });
    } else {
      // For SSR, handle navigation without using localStorage
      this.httpArticle.setSelectedArticle(article);
      if (type === 'video') {
        this.router.navigate(['video-news', type, slug]);
      } else if (type === 'news') {
        this.router.navigate(['article', type, slug]);
      }
    }
  }
}
