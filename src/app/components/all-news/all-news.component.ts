import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, Input, OnChanges, OnInit, OnDestroy, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { Router } from '@angular/router';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-all-news',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() searchTerm: string = '';
  
  news: any[] = [];
  filteredNews: any[] = [];
  groupedArticles: { [key: string]: any[] } = {};
  translatePositions: { [key: string]: number } = {};
  autoSlideIntervals: { [key: string]: any } = {};
  categoryGroups: { [key: string]: any[] } = {};
  
  visibleCards = 5;
  Math = Math;
  objectKeys = Object.keys;
  
  loading: boolean = true;
  error: boolean = false;
  errorGif: string = 'https://i.gifer.com/7efs.gif';

  pageSize: number = 72;
  currentPage: number = 1;

  heading: string[] = ['Celebrity', 'Politics', 'Crime', 'Business', 'Entertainment'];
  private baseUrl: string = 'https://new.hardknocknews.tv/upload/media/posts';

  constructor(
    private httpArticle: ArticleService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.setVisibleCards();

    if (isPlatformBrowser(this.platformId)) {
      this.getArticles();
    }

    this.applySearch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.applySearch();
    }
  }

  ngOnDestroy(): void {
    this.clearAutoSlideIntervals();
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.setVisibleCards();
  }

  setVisibleCards(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const width = window.innerWidth;
    this.visibleCards = width < 640 ? 2 : width < 1024 ? 3 : 5;
  }

  getArticles(): void {
    this.loading = true;

    this.httpArticle.getArticle().subscribe({
      next: (response) => {
        const posts = response?.posts || [];
        this.processArticles(posts);
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.news = [];
        this.error = true;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        if (isPlatformBrowser(this.platformId)) {
          this.initializeAutoSlide();
        }
      }
    });
  }

  processArticles(posts: any[]): void {
    const grouped: { [key: string]: any[] } = {};

    posts.forEach(post => {
      const category = post.categories || 'Uncategorized';
      if (!grouped[category]) grouped[category] = [];

      grouped[category].push({
        title: post.title,
        image: post.thumb ? `${this.baseUrl}/${post.thumb}-s.jpg` : null,
        type: post.type,
        slug: post.slug,
        original: post
      });
    });

    this.groupedArticles = grouped;

    this.news = posts.map(post => ({
      ...post,
      thumb: post.thumb ? `${this.baseUrl}/${post.thumb}-s.jpg` : null,
      relativeTime: this.getRelativeTime(post.spdate)
    })).sort((a, b) =>
      new Date(b.spdate).getTime() - new Date(a.spdate).getTime()
    );
  }

  applySearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredNews = this.news;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredNews = this.news.filter(post =>
      post.title?.toLowerCase().includes(term) ||
      post.categories?.toLowerCase().includes(term)
    );
  }

  get paginatedNews(): any[] {
    const source = this.filteredNews.length ? this.filteredNews : this.news;
    const start = (this.currentPage - 1) * this.pageSize;
    return source.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.news.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  getHeading(index: number): string {
    return this.heading[Math.floor(index / 8) % this.heading.length];
  }

  nextSlide(key: string): void {
    const group = this.groupedArticles[key];
    if (!group || group.length <= this.visibleCards) return;

    const totalCards = group.length;
    const cardWidth = 100 / this.visibleCards;
    const maxTranslate = -((totalCards - this.visibleCards) * cardWidth);

    this.translatePositions[key] = this.translatePositions[key] > maxTranslate
      ? this.translatePositions[key] - cardWidth
      : 0;
  }

  prevSlide(key: string): void {
    if (this.translatePositions[key] < 0) {
      this.translatePositions[key] += 100 / this.visibleCards;
    }
  }

  initializeAutoSlide(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    Object.keys(this.groupedArticles).forEach(category => {
      this.translatePositions[category] = 0;

      this.autoSlideIntervals[category] = setInterval(() => {
        this.nextSlide(category);
      }, 3000);
    });
  }

  clearAutoSlideIntervals(): void {
    Object.values(this.autoSlideIntervals).forEach(interval => {
      if (interval) clearInterval(interval);
    });
  }

  getRelativeTime(publishedAt: string): string {
    return formatDistanceToNowStrict(parseISO(publishedAt));
  }

  setSelectedArticle(article: any): void {
    this.httpArticle.setSelectedArticle(article);
  }

  getPost(type: string, slug: string, article: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('selectedArticle');
      console.log('Selected Post:', article);
    }

    this.httpArticle.getsinglepost(type, slug).subscribe(() => {
      this.httpArticle.setSelectedArticle(article);

      const route = type === 'video' ? 'video-news' : 'article';
      this.router.navigate([route, type, slug]);
    });
  }
}
