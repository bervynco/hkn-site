import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { LikeServiceService } from '../service/like-service.service';

@Component({
  selector: 'app-like-dislike',
  imports: [CommonModule, RouterLink],
  templateUrl: './like-dislike.component.html',
  styleUrls: ['./like-dislike.component.css']
})
export class LikeDislikeComponent implements OnInit {
  showPopup = false;
  showLoginPopup = false;
  article: any;
  reactions: any[] = [];
  selectedReactionIcon: string | null = null;
  liked = false;
  likeCount = 0;
  likeData: any;
  showReactions = true;
  linkCopied: boolean = false;
  reactionMessage: string | null = null;

  constructor(
    private renderer: Renderer2,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private likeServiceHttp: LikeServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const type = params['type'];
      const slug = params['slug'];
  
      this.articleService.getsinglepost(type, slug).subscribe(data => {
        this.article = data;
        this.likeCount = Array.isArray(data.reactions) ? data.reactions.length : 0;
  
        this.loadReactionData(type, slug);
        this.loadReactionIcon(type, slug);
        this.getLike();
      });
    });
  }
  

  loadReactionData(type: string, slug: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentUserId = localStorage.getItem('userId');
      if (currentUserId) {
        this.articleService.getLike(type, slug).subscribe({
          next: (res) => {
            this.likeData = res?.post;
  
            // Find the current user's reaction and update the icon
            const userReaction = this.likeData?.reactions?.find(
              (reaction: any) => reaction.user_id == currentUserId
            );
            if (userReaction) {
              this.selectedReactionIcon = 'https://new.hardknocknews.tv' + userReaction.gif;
            }
          },
          error: (err) => console.error('Error loading reactions:', err)
        });
      }
    }
  }

  reactionss: any[] = [];
  baseUrl: string = 'https://new.hardknocknews.tv/';

  loadReactionIcon(type: string, slug: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.articleService.getLike(type, slug).subscribe({
        next: (res) => {
          console.log("res.post:", res.post);

          const allReactions = res.post.reactions;

          // Filter unique by reaction_type
          const uniqueReactions = allReactions.filter((reaction: any, index: number, self: any[]) =>
            index === self.findIndex((r: any) => r.reaction_type === reaction.reaction_type)
          );

          this.reactionss = uniqueReactions;
        },
        error: (err) => console.error('Error loading reaction icons:', err)
      });
    }
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
    this.renderer[this.showPopup ? 'addClass' : 'removeClass'](document.body, 'blur-bg');
  }

  @HostListener('document:click', ['$event'])
  closePopup(event: Event) {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.popup-container') &&
      !target.closest('.share-btn') &&
      !target.closest('.like-dislike')
    ) {
      this.renderer.removeClass(document.body, 'blur-bg');
    }
  }

  toggleLike() {
    this.liked = !this.liked;
    this.likeCount += this.liked ? 1 : -1;
    this.sendReaction(this.liked ? 'like' : 'dislike');
  }

  sendReaction(reactionType: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const userId = Number(localStorage.getItem('userId'));
      const selectedArticle = localStorage.getItem('selectedArticle');
      const postId = selectedArticle ? JSON.parse(selectedArticle).post.id : null;
    
      // If the user or post ID is not available, show login popup and return
      if (!userId || !postId) {
        this.showLoginPopup = true;
        return;
      }
    
      const data = {
        user_id: userId,
        post_id: postId,
        reaction_type: reactionType
      };
    
      // Send the reaction to the backend
      this.likeServiceHttp.addReaction(data).subscribe(
        (res: any) => {
          console.log('Reaction sent successfully:', res);
    
          // Update the selected reaction icon with the new reaction data
          const userReaction = res?.post?.reactions?.find(
            (reaction: any) => reaction.user_id == userId
          );
          if (userReaction) {
            this.selectedReactionIcon = 'https://new.hardknocknews.tv' + userReaction.gif;
          }
    
          // Display the reaction message for feedback
          this.reactionMessage = `Reacted with ${reactionType}`;
          setTimeout(() => {
            this.reactionMessage = null;
          }, 1000);
    
          // After reaction is successfully sent, load the updated reaction data
          this.loadReactionData(this.article.type, this.article.slug);
        },
        (err) => {
          console.error('Failed to add reaction:', err);
          alert('Error submitting reaction');
        }
      );
    }
  }

  getLike(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.likeServiceHttp.getReaction().subscribe(
        (res: any) => {
          this.reactions = res.reactions;
        },
        (err) => {
          console.error('Failed to get reaction:', err);
        }
      );
    }
  }

  closePopups() {
    this.showLoginPopup = false;
  }

  shareOn(platform: string): void {
    let url = '';
    if (isPlatformBrowser(this.platformId)) {
      url = encodeURIComponent(window.location.href);
    }    
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${url}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${url}`;
        break;
      case 'reddit':
        shareUrl = `https://www.reddit.com/submit?url=${url}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Check this out&body=${url}`;
        break;
      case 'text':
        shareUrl = `sms:?body=${url}`;
        break;
      case 'link':
        // Copy the URL to the clipboard
        if (isPlatformBrowser(this.platformId)) {
          const url = window.location.href;
          navigator.clipboard.writeText(url).then(() => {
            this.linkCopied = true;
            this.showPopup = false;
            setTimeout(() => {
              this.linkCopied = false;
            }, 1000);
          }).catch(err => {
            console.error('Error copying text: ', err);
          });
        }
        return; // Exit the function after copying the link
      default:
        alert('Sharing not supported for this platform.');
        return;
    }

    // Open the share URL in a new tab
    this.openInNewTab(shareUrl); // ✅ Correct usage

    // Close the "Link Copied!" popup after sharing
    this.linkCopied = false;
    this.showPopup = false;
  }

  openInNewTab(shareUrl: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.open(shareUrl, '_blank');
    }
  }

}
