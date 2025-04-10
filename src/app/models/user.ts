export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; 
  subscription: 'free' | 'premium';
  joinedAt: Date;
}
