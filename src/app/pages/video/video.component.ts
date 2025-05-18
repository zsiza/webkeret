import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../../models/video';
import { VideoService } from '../../shared/services/video.service';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RatingService } from '../../shared/services/rating.service';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../shared/services/auth.service';
import { TimePipe } from '../../shared/pipes/time.pipe';
import { Rating } from '../../models/rating';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    CommonModule,
    MatDividerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    FormsModule,
    MatCardActions,
    HighlightDirective,
    MatInputModule,
    MatSelectModule,
    TimePipe,
  ],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef<HTMLVideoElement>;

  selectedVideo!: Video;
  notFound = false;
  relatedVideos: Video[] = [];
  newComment = '';
  newStars: 1 | 2 | 3 | 4 | 5 = 5;

  ratings: Rating[] = [];
  userNames: { [userId: string]: string } = {};

  isLoggedIn = false;
  isSubscribed = false;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private ratingService: RatingService,
    private authService: AuthService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const videoId = params.get('id');
      if (videoId) {
        try {
          const video = this.videoService.getVideoById(videoId);
          this.selectedVideo = video;

          this.loadRatingsWithUsernames(videoId);

          const categoryVideos = this.videoService.getVideosByCategory(
            video.category
          );
          this.relatedVideos = categoryVideos.filter(
            (v) =>
              v.id !== video.id &&
              v.chips.some((chip) => video.chips.includes(chip))
          );

          setTimeout(() => {
            const videoEl = this.videoPlayerRef?.nativeElement;
            if (videoEl) {
              videoEl.load();
              videoEl.play();
            }
          });
        } catch (err) {
          this.notFound = true;
          console.warn('Video not found!', err);
        }
      }
    });

    this.authService.currentUser.subscribe((user) => {
      this.isLoggedIn = !!user;

      if (user) {
        this.authService.getSubscriptionStatus().subscribe((status) => {
          this.isSubscribed = status;
        });
      } else {
        this.isSubscribed = false;
      }
    });
  }

  selectVideo(video: Video): void {
    this.router.navigate(['/video', video.id]);
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  async addComment(): Promise<void> {
    if (!this.selectedVideo) return;

    try {
      await this.ratingService.addOrUpdateRating(
        this.selectedVideo.id,
        this.newStars,
        this.newComment.trim()
      );

      this.newComment = '';
      this.newStars = 5;

      this.loadRatingsWithUsernames(this.selectedVideo.id);
    } catch (err) {
      console.error('Error submitting rating:', err);
    }
  }

  private loadRatingsWithUsernames(videoId: string): void {
    this.ratingService.getRatingsByVideo(videoId).subscribe((ratings) => {
      this.ratings = ratings;

      const userIds = [...new Set(ratings.map((r) => r.userId))];

      userIds.forEach((id) => {
        if (!this.userNames[id]) {
          this.authService.getUserNameById(id).then((name) => {
            this.userNames[id] = name ?? 'Anonymous';
          });
        }
      });
    });
  }
}
