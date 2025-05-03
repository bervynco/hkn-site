import { Component, OnInit, Inject } from '@angular/core';
import { WriteCommentComponent } from "../write-comment/write-comment.component";
import { CommonModule } from '@angular/common';
import { CommentService } from '../service/comment.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-comment',

  imports: [WriteCommentComponent, CommonModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: any[] = [];
  sortCriteria: string = 'recent';
  localUsername: string = '';

  constructor(
    private commentService: CommentService, 
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.localUsername = localStorage.getItem('user_username') || '';
    }
    this.getCommentByPost();
  }

  getCommentByPost(): void {
    this.commentService.getComments().subscribe(
      response => {
        // Ensure comments is always an array
        if (Array.isArray(response)) {
          this.comments = response;
        } else {
          this.comments = []; // fallback if it's not array
        }

        // Check matching usernames
        this.comments.forEach(comment => {
          const user = this.getParsedUser(comment.data);
          if (user?.username === this.localUsername) {
            // Do something when username matches
          }
        });

        this.sortComments();
      },
      error => {
        console.error('Failed to fetch comments:', error);
      }
    );
  }

  getParsedUser(data: string): any {
    try {
      const firstParse = JSON.parse(data);
      return JSON.parse(firstParse);
    } catch {
      return {};
    }
  }

  canDeleteComment(comment: any): boolean {
    const user = this.getParsedUser(comment.data);
    return user?.username === this.localUsername;
  }

  deleteComment(commentId: number): void {
    if (confirm('Are you sure you want to delete your comment?')) {
      this.commentService.deleteComment(commentId).subscribe(
        () => {
          this.comments = this.comments.filter(c => c.id !== commentId);
        },
        error => {
          console.error('Delete failed:', error);
        }
      );
    }
  }

  sortComments(): void {
    if (this.sortCriteria === 'recent') {
      this.comments.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (this.sortCriteria === 'hottest') {
      this.comments.sort((a, b) => {
        const replyDiff = (b.replies || 0) - (a.replies || 0);
        if (replyDiff !== 0) return replyDiff;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    }
  }

  setSortCriteria(criteria: string): void {
    this.sortCriteria = criteria;
    this.sortComments();
    this.comments = [...this.comments]; // trigger UI update
  }

  showDeleteModal = false;
  commentIdToDelete: number | null = null;

  openDeletePopup(commentId: number): void {
    this.commentIdToDelete = commentId;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.commentIdToDelete !== null) {
      this.commentService.deleteComment(this.commentIdToDelete).subscribe(
        () => {
          this.comments = this.comments.filter(c => c.id !== this.commentIdToDelete);
          this.showDeleteModal = false;
          this.commentIdToDelete = null;
        },
        error => {
          console.error('Delete failed:', error);
          this.showDeleteModal = false;
          this.commentIdToDelete = null;
        }
      );
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.commentIdToDelete = null;
  }

  getInitial(name: string): string {
    return name?.charAt(0).toUpperCase() || 'G';
  }

  getAvatarStyle(name: string) {
    const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#f472b6'];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return {
      'background-color': colors[index],
      color: '#fff',
      'border-radius': '9999px',
      width: '35px',
      height: '35px',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'font-weight': 'bold',
      'font-size': '14px',
      'margin-right': '12px',
      'text-transform': 'uppercase',
      'flex-shrink': '0'
    };
  }
}
