import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  isMenuOpen = false; // Default to false, ensures menu is closed initially
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
    // Ensure the menu is closed on page load (for browsers)
    if (isPlatformBrowser(this.platformId)) {
      this.isMenuOpen = false; // Explicitly close menu on load
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
    if (isPlatformBrowser(this.platformId)) {
      window.location.reload();
    }
  }

  goToProfileOrLogin() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      this.router.navigate([token ? '/my-profile' : '/login']);
    }
  }
}
