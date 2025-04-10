import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SubscriptionService } from '../../subscription.service';
import { Subscription } from '../../models/subscription';
import { CurrencyConvertPipe } from '../../currency.pipe';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-subscribe',
  imports: [
    MatCardModule,
    RouterLink,
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
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss',
})
export class SubscribeComponent {
  selectedCurrency: 'USD' | 'EUR' | 'GBP' = 'USD';

  dataSource: Subscription[] = [];

  ngOnInit() {
    this.dataSource = this.subscriptionService.getSubscriptions();
  }
  constructor(private subscriptionService: SubscriptionService) {}

  columnsToDisplay = ['name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Subscription | null;

  /** Checks whether an element is expanded. */
  isExpanded(element: Subscription) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: Subscription) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
}
