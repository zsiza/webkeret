import { AuthService } from './../services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      }
      console.log('User not logged in, redirecting to login page');
      router.navigate(['/login']);
      return false;
    })
  );
};

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    map((user) => {
      if (!user) {
        return true;
      }
      console.log('User already logged in, redirecting to home page');
      router.navigate(['/']);
      return false;
    })
  );
};

import { switchMap } from 'rxjs/operators';

export const subscriptionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser.pipe(
    take(1),
    switchMap((user) => {
      if (user) {
        return authService.getSubscriptionStatus().pipe(
          map((hasSubscription) => {
            if (hasSubscription) {
              return false;
            }
            console.log(
              'User already has a subscription, redirecting to home page'
            );
            router.navigate(['/']);
            return false;
          })
        );
      }
      return [true];
    })
  );
};
