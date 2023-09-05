import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('http') != -1)
      this.spinner.show();

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getLocalToken()}`,
      },
    });

    return next.handle(request).pipe(
      tap((evt: any) => {
        if (evt instanceof HttpResponse) {
          this.spinner.hide();
        }

        return evt;
      }),
      catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        if(error.status === 401) {
          this.toastrService.error('Session expired');
          this.router.navigate(['/login']);
          return EMPTY;
        }
        else
          return throwError(() => error);
      })
    );
  }
}
