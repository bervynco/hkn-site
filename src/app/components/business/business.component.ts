import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { parseISO, formatDistanceToNowStrict } from 'date-fns';
import { ArticleService } from '../service/article.service';
import { CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({

  selector: 'app-business',

  imports: [CommonModule],
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']  // Fixed plural form
})
export class BusinessComponent implements OnInit {

  news: any[] = [];
  mainImage: string = ''; // Stores the first news image

  constructor(
    private httpArticle: ArticleService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  setSelectedArticle(article: any) {
    if (isPlatformBrowser(this.platformId)) {
      // Only set in browser
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
  }

  private baseUrl = 'https://new.hardknocknews.tv/upload/media/posts';

  getArticles(): void {
    this.httpArticle.getArticle().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.posts)) {
          // Filter posts to include only those with type 'business'
          this.news = response.posts
            .filter((post: any) => post.categories === 'Business')
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
          this.news = [];
        }
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
        // Optionally display an error message to the user
        alert('Failed to load business articles. Please try again later.');
      },
    });
  }

  getPost(type: string, slug: string, article: any) {
    if (isPlatformBrowser(this.platformId)) {
      // Clear the previously selected article from localStorage, only in browser
      localStorage.removeItem('selectedArticle');
    }

    this.httpArticle.getsinglepost(type, slug).subscribe(result => {
      this.httpArticle.setSelectedArticle(article);

      // Navigate based on type, pass real values, not param names
      if (type === 'video') {
        this.router.navigate(['video-news', type, slug]);
      } else if (type === 'news') {
        this.router.navigate(['article', type, slug]);
      }
    }, error => {
      console.error('Error fetching single post:', error);
      alert('Failed to load the selected article. Please try again later.');
    });
  }
}
