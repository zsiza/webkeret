import { AuthService } from './shared/services/auth.service';
import {
  Component,
  computed,
  effect,
  inject,
  NgModule,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ThemeService } from './shared/services/theme.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'yoga-meditation';
  private themeService = inject(ThemeService);

  themeClass = computed(() => this.themeService.selectedThemeClass());

  isLoggedIn = false;
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authSubscription = this.authService.currentUser.subscribe((user) => {
      this.isLoggedIn = !!user;
      localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
    });
  }
  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
  logout(): void {
    this.authService.logout();
  }
}
