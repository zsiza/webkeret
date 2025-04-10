import { Injectable } from '@angular/core';
import { Rating } from './models/rating';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private ratings: Rating[] = [];

  constructor(private userService: UserService) {
    const users = this.userService.getUsers();

    this.ratings = [
      {
        videoId: '1',
        user: this.getUser(users, 'user1'),
        stars: 5,
        comment: 'Amazing content!',
        watchedCount: 3,
      },
      {
        videoId: '1',
        user: this.getUser(users, 'user2'),
        stars: 4,
        comment: 'Really good.',
        watchedCount: 2,
      },
      {
        videoId: '2',
        user: this.getUser(users, 'user3'),
        stars: 3,
        watchedCount: 1,
      },
      {
        videoId: '2',
        user: this.getUser(users, 'user4'),
        stars: 2,
        comment: 'Could be better.',
        watchedCount: 2,
      },
      {
        videoId: '3',
        user: this.getUser(users, 'user1'),
        stars: 4,
        comment: 'Nice visuals!',
        watchedCount: 4,
      },
      {
        videoId: '4',
        user: this.getUser(users, 'user2'),
        stars: 5,
        comment: 'Very informative.',
        watchedCount: 5,
      },
      {
        videoId: '5',
        user: this.getUser(users, 'user5'),
        stars: 1,
        comment: 'Did not enjoy this.',
        watchedCount: 1,
      },
      {
        videoId: '6',
        user: this.getUser(users, 'user3'),
        stars: 3,
        comment: 'It was okay.',
        watchedCount: 3,
      },
      {
        videoId: '7',
        user: this.getUser(users, 'user4'),
        stars: 2,
        watchedCount: 2,
      },
      {
        videoId: '8',
        user: this.getUser(users, 'user1'),
        stars: 5,
        comment: 'Brilliant!',
        watchedCount: 6,
      },
      {
        videoId: '9',
        user: this.getUser(users, 'user5'),
        stars: 4,
        watchedCount: 3,
      },
      {
        videoId: '9',
        user: this.getUser(users, 'user2'),
        stars: 5,
        comment: 'Watched it twice!',
        watchedCount: 2,
      },
    ];
  }

  private getUser(users: any[], id: string) {
    const user = users.find((u) => u.id === id);
    if (!user) throw new Error(`User not found: ${id}`);
    return user;
  }

  getRatings(): Rating[] {
    return this.ratings;
  }

  getRatingsByVideo(videoId: string): Rating[] {
    return this.ratings.filter((r) => r.videoId === videoId);
  }
}
