import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Video } from '../../models/video';
import { VideoService } from '../../shared/services/video.service';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { VideoListComponent } from '../video-list/video-list.component';

@Component({
  selector: 'app-yoga',
  imports: [
    MatCardModule,
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    RouterModule,
    VideoListComponent,
  ],

  templateUrl: './yoga.component.html',
  styleUrls: ['./yoga.component.scss'],
})
export class YogaComponent implements OnInit {
  constructor(private router: Router, private videoService: VideoService) {}

  selectVideo(video: Video): void {
    this.router.navigate(['/video', video.id]);
  }
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  currentChip: string = '';
  searchChips: string[] = [];
  chipOptions: string[] = [];

  ngOnInit() {
    this.videos = this.videoService.getVideos();
    this.filteredVideos = this.videos;
    const allChips = this.videos.flatMap((video) => video.chips);
    this.chipOptions = Array.from(new Set(allChips)).sort();
  }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  get filteredChipOptions(): string[] {
    return this.chipOptions.filter((chip) => !this.searchChips.includes(chip));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (
      value &&
      !this.searchChips.includes(value) &&
      this.chipOptions.includes(value)
    ) {
      this.searchChips.push(value);
      this.filterVideos();
    }

    if (event.chipInput) {
      event.chipInput.clear();
    }
  }

  remove(chip: string): void {
    const index = this.searchChips.indexOf(chip);
    if (index >= 0) {
      this.searchChips.splice(index, 1);
      this.filterVideos();
    }
  }

  selected(event: any): void {
    const value = event.option.value;
    if (value && !this.searchChips.includes(value)) {
      this.searchChips.push(value);
      this.filterVideos();
    }
  }

  filterVideos(): void {
    if (this.searchChips.length === 0) {
      this.filteredVideos = this.videos;
      return;
    }

    this.filteredVideos = this.videos.filter((video) =>
      this.searchChips.every((chip) => video.chips.includes(chip))
    );
  }
}
