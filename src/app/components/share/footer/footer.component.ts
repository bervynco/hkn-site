import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-footer',

  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  isBrowser: boolean = false;
   constructor(

    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);  
  }

}
