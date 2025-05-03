import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpRequestService } from '../service/http-request.service';
import { FormsModule, NgForm } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-register',

  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Fixed plural form
})
export class RegisterComponent {

  showRegisterSuccess: boolean = false;

  user = {
    username: '',
    email: '',
    password: '',
  };

  constructor(
    private httpRequestService: HttpRequestService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  registerUser(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    const requestData = this.user;

    this.httpRequestService.register(requestData).subscribe({
      next: (response) => {
        // ✅ Show bottom success message
        this.showRegisterSuccess = true;

        // ✅ Reset form after success
        form.resetForm();

        // ✅ Optional: Auto-hide message after 3 sec
        setTimeout(() => {
          this.showRegisterSuccess = false;
        }, 3000);

        // Optionally, store data in localStorage if needed (ensure it's in the browser)
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response.user.id.toString());
          localStorage.setItem('user_username', response.user.username);
          localStorage.setItem('user_email', response.user.email);
        }
      },
      error: (error) => {
        if (error.status === 422 && error.error.errors) {
          const messages = Object.entries(error.error.errors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('\n');
          alert('Validation errors:\n' + messages);
        } else {
          alert(error.error.message || 'Registration failed!');
        }
      }
    });
  }
}
