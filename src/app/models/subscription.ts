export interface Subscription {
  id: string;
  premium: boolean;
  price: number;
  durationInMonths: number;
  features: string[];
}
