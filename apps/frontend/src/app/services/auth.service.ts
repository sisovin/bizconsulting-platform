import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authApiService: AuthApiService) {}

  login(email: string, password: string): Observable<any> {
    return this.authApiService.login(email, password);
  }

  register(email: string, password: string): Observable<any> {
    return this.authApiService.register(email, password);
  }

  refreshToken(token: string): Observable<any> {
    return this.authApiService.refreshToken(token);
  }
}
