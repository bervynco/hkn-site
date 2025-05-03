import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { TransferState, makeStateKey } from '@angular/core';
import { isPlatformServer } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private selectedArticle: any;
  private apiBase = 'https://new.hardknocknews.tv/api';

  constructor(private http: HttpClient,  private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  // Store selected article
  setSelectedArticle(article: any) {
    this.selectedArticle = article;
  }

  // Get selected article
  getSelectedArticle() {
    return this.selectedArticle;
  }

  // Get all articles
  getArticle(): Observable<any> {
    const ARTICLES_KEY = makeStateKey<any>('articles');
    
    // Check if we already have data
    if (this.transferState.hasKey(ARTICLES_KEY)) {
      const articles = this.transferState.get(ARTICLES_KEY, []);
      return of(articles);
    }
  
    return this.http.get(`${this.apiBase}/posts/all`).pipe(
      tap((data: any) => {
        if (isPlatformServer(this.platformId)) {
          // Save data for client hydration
          this.transferState.set(ARTICLES_KEY, data.posts);
        }
      }),
      catchError(error => of([]))
    );
  }
  

  // Get single post by type and slug
  getsinglepost(type: string, slug: string): Observable<any> {
    const url = `${this.apiBase}/post/${type}/${slug}`;
    return this.http.get(url, { responseType:  'json' }) // if pure HTML string
    
  }

  // Increment view for post ID
  postIncriment(postId: any): Observable<any> {
    const url = `${this.apiBase}/posts/${postId}/increment-view`;
    return this.http.post(url, {}).pipe(
      catchError((error) => {
        // Handle error gracefully, no logging in production
        return of(null); // Return null if there's an error
      })
    );
  }

  // Get like details
  getLike(type: string, slug: string): Observable<any> {
    const url = `${this.apiBase}/post/simple/${type}/${slug}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        return of(null); // Return null if there's an error
      })
    );
  }
  

  // Get count stats
  getcount(type: string, slug: string): Observable<any> {
    const url = `${this.apiBase}/post/${type}/${slug}/stats`;
  
    return this.http.get(url).pipe(
      catchError((error) => {
        // Handle error gracefully, no logging in production
        return of(null); // Return null if there's an error
      })
    );
  }
  
}
