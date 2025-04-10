import { User } from './user';

export interface Rating {
  videoId: string;
  user: User;
  stars: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  watchedCount: number;
}
