import { Component } from '@angular/core';

import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
@Component({
  selector: 'app-registration',
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    }),
  });

  signupError: string | null = null;
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  showSuccessDialog(firstname: string) {
    const capitalizedFirstname =
      firstname.charAt(0).toUpperCase() + firstname.slice(1);
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Welcome to Yoga Community!',
        message: `Welcome, ${capitalizedFirstname}! You've successfully signed up. Redirecting to the home page...`,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'please fix errors in the form';
      return;
    }

    const password = this.signUpForm.get('password')?.value;
    const rePassword = this.signUpForm.get('rePassword')?.value;

    if (password !== rePassword) {
      this.signupError = 'passwords do not match';
      return;
    }
    const userData: Partial<User> = {
      name: {
        firstname: this.signUpForm.get('name.firstname')?.value || '',
        lastname: this.signUpForm.get('name.lastname')?.value || '',
      },
      email: this.signUpForm.get('email')?.value || '',
      subscription: false,
    };

    const firstname = this.signUpForm.get('name.firstname')?.value || '';
    const email = this.signUpForm.get('email')?.value;
    const passwordValue = this.signUpForm.get('password')?.value;

    if (!email || !passwordValue) {
      this.signupError = 'Email and password are required.';
      return;
    }

    this.authService
      .signUp(email, passwordValue, userData)
      .then((userCredential) => {
        this.authService.updateLoginStatus(true);
        this.showSuccessDialog(firstname);
      })
      .catch((error: any) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.signupError = 'This email address is already in use';
            break;
          case 'auth/invalid-email':
            this.signupError = 'The email address is not valid';
            break;
          case 'auth/weak-password':
            this.signupError = 'The password is too weak';
            break;
          case 'auth/network-request-failed':
            this.signupError =
              'Network error. Please check your connection and try again';
            break;
          default:
            this.signupError =
              'Error signing up: ' +
              (error.message || 'Please try again later');
        }
      });
  }
}
