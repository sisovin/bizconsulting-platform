import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { LoginResponse, RefreshTokenResponse } from '@libs/interfaces/src/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authApiService: AuthApiService) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.authApiService.login(email, password);
  }

  register(email: string, password: string): Observable<any> {
    return this.authApiService.register(email, password);
  }

  refreshToken(token: string): Observable<RefreshTokenResponse> {
    return this.authApiService.refreshToken(token);
  }
}
