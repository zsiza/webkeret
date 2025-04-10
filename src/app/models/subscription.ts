export interface Subscription {
  id: string;
  name: 'Free' | 'Premium';
  price: number;
  durationInMonths: number;
  features: string[];
}
