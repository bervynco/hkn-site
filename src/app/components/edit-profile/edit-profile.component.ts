import { Component, Input, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() user: any;
  updatedUser: any = {};
  showSuccess: boolean = false; // ✅ For showing popup
  localStorageAvailable: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.localStorageAvailable = isPlatformBrowser(this.platformId); // Check if localStorage is available

    if (this.localStorageAvailable) {
      const storedUser = localStorage.getItem('editUser');
      if (storedUser) {
        this.updatedUser = JSON.parse(storedUser);
      } else {
        this.router.navigate(['/my-profile']);
      }
    }
  }

  updateProfile(): void {
    this.userService.updateUserProfile(this.updatedUser).subscribe({
      next: (res: any) => {
        if (res) {
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
            this.router.navigate(['/my-profile']);
          }, 1000);
        }
      },
      error: (err) => {
        console.error('Error updating profile:', err);
      }
    });
  }
}
