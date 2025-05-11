import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  isMenuOpen = false; // Set default to false (menu will be closed initially)
  isMobileDropdownOpen = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Close the menu on route change
        this.isMenuOpen = false;
        this.isMobileDropdownOpen = false;
        this.isDropdownOpen = false;
      }
    });
  }

  ngOnInit() {
    // Menu will be closed by default when page loads
    if (isPlatformBrowser(this.platformId)) {
      this.isMenuOpen = false; // Menu closed on initial load
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMobileDropdown() {
    this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
  }

  onMobileLinkClick(): void {
    this.isMenuOpen = false;
    this.isMobileDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
    reloadPage() {
    // Check if running on the client (browser)
    if (isPlatformBrowser(this.platformId)) {
      // First reload
      window.location.reload();
      setTimeout(() => {
        // Second reload after a brief delay
        window.location.reload();
      }, 100);
    }
  }
 goToProfileOrLogin() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      this.router.navigate([token ? '/my-profile' : '/login']);
    }
  }
}
