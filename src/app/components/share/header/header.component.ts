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
  isBrowser: boolean = false;

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
    // Set isBrowser flag only on the client (browser)
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.isMenuOpen = false; // Menu closed on initial load in the browser
    }
  }

  toggleMenu() {
    if (this.isBrowser) {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }

  toggleMobileDropdown() {
    if (this.isBrowser) {
      this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
    }
  }

  onMobileLinkClick(): void {
    if (this.isBrowser) {
      this.isMenuOpen = false;
      this.isMobileDropdownOpen = false;
    }
  }

  toggleDropdown() {
    if (this.isBrowser) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  closeDropdown() {
    if (this.isBrowser) {
      this.isDropdownOpen = false;
    }
  }

  goToProfileOrLogin() {
    if (this.isBrowser) {
      const token = localStorage.getItem('authToken');
      this.router.navigate([token ? '/my-profile' : '/login']);
    }
  }
}
