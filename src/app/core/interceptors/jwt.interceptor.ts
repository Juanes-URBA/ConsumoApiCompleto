import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

const EXCLUDED_PATHS = ['/auth/login', '/auth/register', '/auth/refresh'];

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isExcluded = EXCLUDED_PATHS.some((path) => request.url.includes(path));

    if (isExcluded) {
      return next.handle(request);
    }

    const accessToken = this.authService.getAccessToken();

    if (!accessToken) {
      return next.handle(request);
    }

    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return next.handle(authRequest);
  }
}