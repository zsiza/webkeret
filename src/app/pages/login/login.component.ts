import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  authSubscription?: Subscription;
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  login() {
    this.loginError = '';

    if (this.email.invalid || this.password.invalid) {
      if (this.email.invalid) {
        this.loginError = 'Please enter a valid email address.';
      }
      if (this.password.invalid) {
        this.loginError = 'Please enter a valid password.';
      }
    }

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.authService
      .login(emailValue, passwordValue)
      .then((UserCredential) => {
        console.log('User logged in:', UserCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Login error:', error);
        console.error('Error code:', error.code); // add this temporarily

        switch (error.code) {
          case 'auth/user-not-found':
            this.loginError = 'User not found. Please check your email.';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Incorrect password. Please try again.';
            break;
          case 'auth/invalid-email':
            this.loginError =
              'Invalid email format. Please enter a valid email.';
            break;
          case 'auth/invalid-credential':
            this.loginError =
              'Invalid credentials. Please check your email or password.';
            break;
          default:
            this.loginError = 'An error occurred. Please try again later.';
        }
      });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
