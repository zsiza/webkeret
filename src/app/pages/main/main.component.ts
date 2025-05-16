import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HighlightDirective } from '../../shared/directives/highlight.directive';

@Component({
  selector: 'app-main',
  imports: [MatButtonModule, RouterLink, HighlightDirective],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
