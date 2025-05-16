import { AuthService } from './../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { SubscriptionService } from '../../shared/services/subscription.service';
import { Subscription } from '../../models/subscription';
import { CurrencyConvertPipe } from '../../shared/pipes/currency.pipe';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-subscribe',
  imports: [
    MatCardModule,
    FormsModule,
    CurrencyConvertPipe,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatLabel,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss',
})
export class SubscribeComponent {
  selectedCurrency: 'USD' | 'EUR' | 'GBP' = 'USD';
  currentUser: any;
  dataSource: Subscription[] = [];
  userData: any;

  ngOnInit() {
    this.dataSource = this.subscriptionService.getSubscriptions();
  }
  constructor(
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        this.loadUserData(user.uid);
      }
    });
  }
  async loadUserData(userId: string) {
    try {
      this.userData = await this.authService.getCurrentUser(userId);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  columnsToDisplay = ['name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Subscription | null;

  isExpanded(element: Subscription) {
    return this.expandedElement === element;
  }

  toggle(element: Subscription) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

  showSuccessDialog(firstname: string) {
    const capitalizedFirstname =
      firstname.charAt(0).toUpperCase() + firstname.slice(1);
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Subscription successful!',
        message: `Welcome, ${capitalizedFirstname}! You've successfully subscribed. Redirecting to the home page...`,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  async subscribe() {
    if (!this.currentUser) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/subscribe' },
      });
      return;
    }
    try {
      await this.authService.updateSubscriptionStatus(true);
      const firstname = this.userData.name.firstname || this.userData.firstname;
      this.showSuccessDialog(firstname);
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  }
}
