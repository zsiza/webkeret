import { Injectable } from '@angular/core';
import { Subscription } from './models/subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private subscriptions: Subscription[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      durationInMonths: 0,
      features: ['Limited video access', 'No guided meditations'],
    },
    {
      id: 'premium',
      name: 'Premium',
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

  getSubscriptionByName(name: 'Free' | 'Premium'): Subscription | undefined {
    return this.subscriptions.find((sub) => sub.name === name);
  }
}
