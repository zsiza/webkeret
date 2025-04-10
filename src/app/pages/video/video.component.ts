import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../../models/video';
import { VideoService } from '../../video.service';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { RatingService } from '../../rating.service';
import { Rating } from '../../models/rating';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../highlight.directive';
import { MatInputModule } from '@angular/material/input';

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
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  addComment() {
    throw new Error('Method not implemented.');
  }
  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef<HTMLVideoElement>;

  selectedVideo!: Video;
  notFound = false;
  relatedVideos: Video[] = [];
  ratings: Rating[] = [];
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private ratingService: RatingService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.viewportScroller.scrollToPosition([0, 0]);
      });

    this.route.paramMap.subscribe((params) => {
      const videoId = params.get('id');
      if (videoId) {
        try {
          this.ratings = this.ratingService.getRatingsByVideo(videoId);
          const video = this.videoService.getVideoById(videoId);
          this.selectedVideo = video;

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
  }

  selectVideo(video: Video): void {
    this.router.navigate(['/video', video.id]);
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
