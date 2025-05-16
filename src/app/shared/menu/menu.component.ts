import { Component, computed, inject, OnInit } from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../services/theme.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatSidenavModule,
  ],

  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isSmallScreen = false;
  isLoggedIn = false;
  isSubscribed = false;

  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private breakpointObserver = inject(BreakpointObserver);

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
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

  logout() {
    this.authService.logout();
  }
  toggleTheme(event: MatSlideToggleChange) {
    this.themeService.setTheme(event.checked ? 'dark' : 'light');
  }

  isDarkMode = computed(
    () => this.themeService.selectedTheme()?.name === 'dark'
  );
}
