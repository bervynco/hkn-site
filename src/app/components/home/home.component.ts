import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { AllNewsComponent } from "../all-news/all-news.component";
import { CarouselComponent } from "../carousel/carousel.component";

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule,  AllNewsComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchText: string = '';
  showNews: boolean = false;
    isBrowser: boolean = false;
constructor(    @Inject(PLATFORM_ID) private platformId: Object
){

}

  ngOnInit(): void {
           this.isBrowser = isPlatformBrowser(this.platformId);  // ✅ Add this line

  }
  onSearchInput(value: string) {
    this.searchText = value;
  }
}
