import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common'; // Import to check platform

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://new.hardknocknews.tv/api/user/details';
  private apiUrls = 'https://new.hardknocknews.tv/api/user';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to check platform
  ) {}

  // Get userId from localStorage (only on browser)
  private getUserId(): number {
    if (isPlatformBrowser(this.platformId)) {
      return Number(localStorage.getItem('userId'));
    }
    return 0; // Return null if on server-side
  }

  // Get user details
  getUserDetails(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      return of(null); // Return null if no user ID is found in localStorage
    }
    
    return this.http.get(`${this.apiUrl}/${userId}`).pipe(
      catchError((error) => {
        // Handle error gracefully, no logging in production
        return of(null); // Return null in case of error
      })
    );
  }

  // Update user profile
  updateUserProfile(userData: any): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      return of(null); // Return null if no user ID is found in localStorage
    }

    return this.http.put<any>(`${this.apiUrls}/${userId}`, userData).pipe(
      catchError((error) => {
        // Handle error gracefully, no logging in production
        return of(null); // Return null in case of error
      })
    );
  }
}
