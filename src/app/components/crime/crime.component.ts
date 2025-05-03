import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { parseISO, formatDistanceToNowStrict } from 'date-fns';
import { ArticleService } from '../service/article.service';
import { CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-crime',

  imports: [CommonModule],
  templateUrl: './crime.component.html',
  styleUrls: ['./crime.component.css']
})
export class CrimeComponent implements OnInit {

  news: any[] = [];
  mainImage: string = ''; // Stores the first news image
  localStorageAvailable: boolean = false;

  constructor(
    private httpArticle: ArticleService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  setSelectedArticle(article: any) {
    if (isPlatformBrowser(this.platformId)) {
      // Only set the article to localStorage on the client side
      localStorage.setItem('selectedArticle', JSON.stringify(article));
    }
    this.httpArticle.setSelectedArticle(article);
  }

  // Convert the published_at timestamp to a relative time
  getRelativeTime(publishedAt: string): string {
    const parsedDate = parseISO(publishedAt); // Parse the ISO 8601 string to a Date object
    return formatDistanceToNowStrict(parsedDate); // Get the relative time without "about"
  }

  ngOnInit(): void {
    this.getArticles();
    this.localStorageAvailable = isPlatformBrowser(this.platformId); // Check if localStorage is available
  }

  private baseUrl = 'https://new.hardknocknews.tv/upload/media/posts';

  getArticles(): void {
    this.httpArticle.getArticle().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.posts)) {
          // Filter posts to include only those with type 'Crime'
          this.news = response.posts
            .filter((post: any) => post.categories === 'Crime')
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
    // Clear the previously selected article from localStorage (only on client-side)
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('selectedArticle');
    }

    this.httpArticle.getsinglepost(type, slug).subscribe(result => {
      this.setSelectedArticle(article);

      // Navigate based on type, pass real values, not param names
      if (type === 'video') {
        this.router.navigate(['video-news', type, slug]);
      } else if (type === 'news') {
        this.router.navigate(['article', type, slug]);
      }
    });
  }
}
