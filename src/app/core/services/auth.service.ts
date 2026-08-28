import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { STORAGE_KEYS } from '../constants/storage-keys.constant';
import { LoginRequest } from '../interfaces/login-request.interface';
import { RegisterRequest } from '../interfaces/register-request.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { RefreshRequest } from '../interfaces/refresh-request.interface';
import { User } from '../interfaces/user.interface';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => this.saveSession(response)),
      catchError((error) => this.handleError(error))
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((response) => this.saveSession(response)),
      catchError((error) => this.handleError(error))
    );
  }

  logout(): Observable<void> {
    const refreshToken = this.getRefreshToken();
    const body: RefreshRequest = { refreshToken: refreshToken ?? '' };

    return this.http.post<void>(`${this.apiUrl}/logout`, body).pipe(
      tap(() => this.clearSession()),
      catchError((error) => {
        // Aunque falle en el backend, limpiamos la sesión localmente.
        this.clearSession();
        return this.handleError(error);
      })
    );
  }

  refreshToken(refreshToken: string): Observable<AuthResponse> {
    const body: RefreshRequest = { refreshToken };

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, body).pipe(
      tap((response) => this.saveSession(response)),
      catchError((error) => this.handleError(error))
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  saveSession(response: AuthResponse): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
  }

  clearSession(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  getCurrentUser(): User | null {
    const rawUser = localStorage.getItem(STORAGE_KEYS.USER);
    return rawUser ? (JSON.parse(rawUser) as User) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getUserRole(): Role | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let friendlyMessage = 'Ocurrió un error inesperado. Intenta nuevamente.';

    switch (error.status) {
      case 400:
        friendlyMessage = 'Los datos ingresados no son válidos.';
        break;
      case 401:
        friendlyMessage = 'Correo o contraseña incorrectos.';
        break;
      case 403:
        friendlyMessage = 'No tienes permisos para realizar esta acción.';
        break;
      case 404:
        friendlyMessage = 'El servicio solicitado no existe.';
        break;
      case 409:
        friendlyMessage = 'El correo ya se encuentra registrado.';
        break;
      case 500:
        friendlyMessage = 'Error interno del servidor. Intenta más tarde.';
        break;
    }

    return throwError(() => new Error(friendlyMessage));
  }
}