import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('AUTH_API_URL') public apiUrl: string
  ) {}

  authenticate(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiUrl}/v1/auth/sign-in`,
        { Username: username, Password: password },
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .pipe(
        map((response) => {
          this.loadSessions(response);
          return response;
        })
      );
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  checkLogin(): boolean {
    return sessionStorage.getItem('access_token') !== null;
  }

  private loadSessions(json: any): void {
    sessionStorage.setItem('username', json.username);
    sessionStorage.setItem('id_token', json.tokens.access_token);
    sessionStorage.setItem('access_token', json.tokens.access_token);
    sessionStorage.setItem('refresh_token', json.tokens.access_token);
  }

  getLocalToken(): string {
    return sessionStorage.getItem('id_token') || '';
  }
}
