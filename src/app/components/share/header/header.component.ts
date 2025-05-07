import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewEncapsulation } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
isDropdownOpen = false;
  isMenuOpen = false;
  isMobileDropdownOpen = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // SSR safety: Ensure menu only shows after client render
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

  goToProfileOrLogin() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      this.router.navigate([token ? '/my-profile' : '/login']);
    }
  }
}