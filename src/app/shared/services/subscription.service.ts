import { Injectable } from '@angular/core';
import { Subscription } from '../../models/subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private subscriptions: Subscription[] = [
    {
      id: 'free',
      premium: false,
      price: 0,
      durationInMonths: 0,
      features: ['Limited video access', 'No guided meditations'],
    },
    {
      id: 'premium',
      premium: true,
      price: 14.99,
      durationInMonths: 1,
      features: [
        'Unlimited video library',
        'Guided meditations',
        'Cancel anytime',
      ],
    },
  ];

  constructor() {}

  getSubscriptions(): Subscription[] {
    return this.subscriptions;
  }
  getSubscriptionByType(premium: boolean): Subscription | undefined {
    return this.subscriptions.find((sub) => sub.premium === premium);
  }
}
