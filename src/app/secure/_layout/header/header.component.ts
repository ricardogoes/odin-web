import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'odin-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isProfileMenuOpened = false;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  setIsProfileMenuOpened(isProfileMenuOpened: boolean): void {
    this.isProfileMenuOpened = isProfileMenuOpened;
  }

  handleLogout(): void {
    this.authService.logout();
  }

  openUserProfile(): void {
    this.toastrService.error('Not implemented');
  }

}


