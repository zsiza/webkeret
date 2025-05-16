import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Video } from '../../models/video';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    MatChipsModule,
  ],
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent {
  @Input() videos: Video[] = [];
  @Output() videoSelected = new EventEmitter<Video>();
  isLoggedIn = false;
  isSubscribed = false;

  private authService = inject(AuthService);

  onSelect(video: Video) {
    this.videoSelected.emit(video);
  }
  ngOnInit() {
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
}
