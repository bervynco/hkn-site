import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'https://new.hardknocknews.tv/easy/public/api/comments/content';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  getComments(): Observable<any> {
    let contentId = '';
    
    // Only access localStorage on the browser
    if (isPlatformBrowser(this.platformId)) {
      const selectedArticle = localStorage.getItem('selectedArticle');
      const article = selectedArticle ? JSON.parse(selectedArticle) : null;
      contentId = article ? `Post_${article.id}` : '';
    }

    return this.http.get(`${this.apiUrl}/${contentId}`);
  }

  editComment(url: string, data: any) {
    return this.http.post(url, data);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`https://new.hardknocknews.tv/easy/public/api/comments_api/${commentId}/delete`);
  }
}
