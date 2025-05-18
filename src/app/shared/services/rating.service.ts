import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  query,
  where,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import { Rating } from '../../models/rating';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  getRatingsByVideo(videoId: string): Observable<Rating[]> {
    const ratingsRef = collection(this.firestore, 'ratings');
    const q = query(ratingsRef, where('videoId', '==', videoId));
    return collectionData(q, { idField: 'id' }) as Observable<Rating[]>;
  }

  async addOrUpdateRating(
    videoId: string,
    stars: 1 | 2 | 3 | 4 | 5,
    comment?: string
  ): Promise<void> {
    const userId = await this.authService.getUserId(); // assumed to return Promise<string>
    const ratingRef = collection(this.firestore, 'ratings');

    const q = query(
      ratingRef,
      where('videoId', '==', videoId),
      where('userId', '==', userId)
    );
    const existingRatingsSnap = await collectionData(q, { idField: 'id' })
      .pipe(take(1))
      .toPromise();

    if (existingRatingsSnap && existingRatingsSnap.length > 0) {
      const existingRating = existingRatingsSnap[0];
      const ratingDocRef = doc(ratingRef, existingRating.id);
      await updateDoc(ratingDocRef, {
        stars,
        comment,
      });
    } else {
      const newRating: Rating = { videoId, userId, stars, comment };
      await addDoc(ratingRef, newRating);
    }
  }
}
