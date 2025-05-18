export interface Rating {
  videoId: string;
  userId: string;
  stars: 1 | 2 | 3 | 4 | 5;
  comment?: string;
}
