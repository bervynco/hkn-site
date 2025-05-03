import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  imports: [CommonModule]
})
export class MyProfileComponent implements OnInit {
  user: any;
  isLoading: boolean = true;
  errorMessage: string = '';
  localStorageAvailable: boolean = false;

  constructor(
    private userService: UserService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    // Check if the platform is the browser (client-side)
    this.localStorageAvailable = isPlatformBrowser(this.platformId);

    if (this.localStorageAvailable) {
      const token = localStorage.getItem('authToken');

      if (!token) {
        this.router.navigate(['/login']);
        return;
      }

      this.fetchUserDetails();
    } else {
      this.handleSSR();
    }
  }

  private fetchUserDetails(): void {
    this.userService.getUserDetails().subscribe(
      (res) => {
        if (res.success) {
          this.user = res.user;
        } else {
          this.errorMessage = 'Failed to load user details. Please try again.';
        }
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching your details. Please try again.';
        this.isLoading = false;
      }
    );
  }

  private handleSSR(): void {
    // Handle SSR (Server-Side Rendering) scenario when localStorage is unavailable
    this.errorMessage = 'Unable to access localStorage during SSR.';
    this.isLoading = false;
  }

  editProfile(): void {
    if (this.localStorageAvailable && this.user) {
      localStorage.setItem('editUser', JSON.stringify(this.user));
      this.router.navigate(['/edit-profile']);
    }
  }

  logout(): void {
    if (this.localStorageAvailable) {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
    }
  }
}
