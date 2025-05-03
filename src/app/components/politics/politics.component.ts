import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { parseISO, formatDistanceToNowStrict } from 'date-fns';
import { ArticleService } from '../service/article.service';
import { CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-politics',

  imports: [CommonModule],
  templateUrl: './politics.component.html',
  styleUrls: ['./politics.component.css']
})
export class PoliticsComponent implements OnInit {

  news: any[] = [];
  isLoading: boolean = true; // Loading state
  errorMessage: string = ''; // Error message
  localStorageAvailable: boolean = false; // To check if localStorage is available

  private baseUrl = 'https://new.hardknocknews.tv/upload/media/posts';

  constructor(
    private httpArticle: ArticleService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    // Check if we are in the browser environment
    this.localStorageAvailable = isPlatformBrowser(this.platformId);
    this.getArticles();
  }

  // Convert the published_at timestamp to a relative time
  getRelativeTime(publishedAt: string): string {
    const parsedDate = parseISO(publishedAt); // Parse the ISO 8601 string to a Date object
    return formatDistanceToNowStrict(parsedDate); // Get the relative time without "about"
  }

  getArticles(): void {
    this.httpArticle.getArticle().subscribe({
      next: (response) => {
        console.log('API Response:', response);

        if (response && Array.isArray(response.posts)) {
          this.news = response.posts
            .filter((post: any) => post.categories === 'Politics')
            .map((post: any) => {
              const updatedThumb = post.thumb ? `${this.baseUrl}/${post.thumb}-s.jpg` : null;
              return {
                ...post,
                thumb: updatedThumb,
                relativeTime: this.getRelativeTime(post.spdate), // Add relative time to each post
              };
            });

          this.news.sort((a, b) => {
            const dateA = new Date(a.spdate).getTime();
            const dateB = new Date(b.spdate).getTime();
            return dateB - dateA; // Sort in descending order
          });
        } else {
          console.error('Invalid API response format:', response);
          this.news = [];
          this.errorMessage = 'Failed to load articles. Please try again later.';
        }
        this.isLoading = false; // Stop loading after data is processed
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
        this.isLoading = false;
        this.errorMessage = 'An error occurred while fetching the articles. Please try again later.';
      }
    });
  }

  getPost(type: string, slug: string, article: any) {
    // Clear the previously selected article from localStorage only if in the browser environment
    if (this.localStorageAvailable) {
      localStorage.removeItem('selectedArticle');
    }

    this.httpArticle.getsinglepost(type, slug).subscribe(result => {
      this.httpArticle.setSelectedArticle(article);

      // Store the new article in localStorage only if in the browser environment
      if (this.localStorageAvailable) {
        localStorage.setItem('selectedArticle', JSON.stringify(article));
      }

      // Navigate based on type, pass real values, not param names
      if (type === 'video') {
        this.router.navigate(['video-news', type, slug]);
      } else if (type === 'news') {
        this.router.navigate(['article', type, slug]);
      }

      console.log(result);
    });
  }
}
