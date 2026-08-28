import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { UpdateUserRoleRequest } from '../interfaces/update-user-role-request.interface';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(role?: Role): Observable<User[]> {
    let params = new HttpParams();

    if (role) {
      params = params.set('role', role);
    }

    return this.http
      .get<User[]>(this.apiUrl, { params })
      .pipe(catchError((error) => this.handleError(error)));
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  updateUserRole(id: string, data: UpdateUserRoleRequest): Observable<User> {
    return this.http
      .patch<User>(`${this.apiUrl}/${id}/role`, data)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let friendlyMessage = 'Ocurrió un error inesperado. Intenta nuevamente.';

    switch (error.status) {
      case 401:
        friendlyMessage = 'Tu sesión ha expirado. Inicia sesión nuevamente.';
        break;
      case 403:
        friendlyMessage = 'No tienes permisos para gestionar usuarios.';
        break;
      case 404:
        friendlyMessage = 'El usuario no existe.';
        break;
      case 500:
        friendlyMessage = 'Error interno del servidor. Intenta más tarde.';
        break;
    }

    return throwError(() => new Error(friendlyMessage));
  }
}