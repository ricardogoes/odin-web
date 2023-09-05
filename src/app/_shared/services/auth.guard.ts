import { Injectable } from '@angular/core';
import {
  Router
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.checkLogin()) {
      return true;
    }

    alert('User not authenticated');
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

  canLoad(): boolean {
    if (this.authService.checkLogin()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
