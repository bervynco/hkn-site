import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarService } from './sidebar.service';

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
    private sidebarService: SidebarService,  // Inject SidebarService
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Close the menu on route change
        this.sidebarService.setMenuState(false);  // Use the service to close the menu
        this.isMobileDropdownOpen = false;
        this.isDropdownOpen = false;
      }
    });
  }

  ngOnInit() {
    // Initialize the menu state by fetching from the SidebarService
    if (isPlatformBrowser(this.platformId)) {
      this.isMenuOpen = this.sidebarService.getMenuState();
      this.isDropdownOpen = false; // Reset dropdown on load
      this.isMobileDropdownOpen = false; // Reset mobile dropdown on load
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.sidebarService.setMenuState(this.isMenuOpen);  // Update sidebar state via the service
  }

  toggleMobileDropdown() {
    this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
  }

  onMobileLinkClick(): void {
    this.isMenuOpen = false;
    this.isMobileDropdownOpen = false;
  }
@ViewChild('dropdownMenu') dropdownMenuRef!: ElementRef;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;

  setTimeout(() => {
    if (this.dropdownMenuRef?.nativeElement?.hasAttribute('class')) {
      console.log('Dropdown element found.');
    }
  });
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
