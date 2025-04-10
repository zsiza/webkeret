import { Injectable, signal, computed } from '@angular/core';

export interface AppTheme {
  name: 'light' | 'dark' | 'system';
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme';

  private appTheme = signal<'light' | 'dark' | 'system'>(
    (localStorage.getItem(this.STORAGE_KEY) as 'light' | 'dark' | 'system') ||
      'system',
  );

  private themes: AppTheme[] = [
    { name: 'light', icon: 'light_mode' },
    { name: 'dark', icon: 'dark_mode' },
    { name: 'system', icon: 'desktop_windows' },
  ];

  selectedTheme = computed(() =>
    this.themes.find((t) => t.name === this.appTheme()),
  );

  selectedThemeClass = computed(() => {
    const theme = this.appTheme();
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'darkMode'
        : 'lightMode';
    }
    return `${theme}Mode`;
  });

  getThemes() {
    return this.themes;
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    this.appTheme.set(theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }
}
