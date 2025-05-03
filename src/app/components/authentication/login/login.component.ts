import { Component, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpRequestService } from '../service/http-request.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login',

  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  showLoginSuccess: boolean = false;

  constructor(
    private httpRequestService: HttpRequestService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  loginUser(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.httpRequestService.login(this.user).subscribe(
      (response: any) => {
        // Show success message
        this.showLoginSuccess = true;

        // Store token and user info if in browser (SSR check)
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response.user.id.toString());
          localStorage.setItem('user_username', response.user.username);
          localStorage.setItem('user_email', response.user.email);
        }

        // Redirect after delay
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error => {
        alert('Login failed!');
      }
    );
  }
}
