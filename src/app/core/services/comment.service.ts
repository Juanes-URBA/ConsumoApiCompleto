import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Comment } from '../interfaces/comment.interface';
import { CreateCommentRequest } from '../interfaces/create-comment-request.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = `${environment.apiUrl}/tickets`;

  constructor(private http: HttpClient) {}

  getComments(ticketId: string): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`${this.apiUrl}/${ticketId}/comments`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  addComment(ticketId: string, data: CreateCommentRequest): Observable<Comment> {
    return this.http
      .post<Comment>(`${this.apiUrl}/${ticketId}/comments`, data)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let friendlyMessage = 'Ocurrió un error inesperado. Intenta nuevamente.';

    switch (error.status) {
      case 400:
        friendlyMessage = 'El comentario no es válido.';
        break;
      case 401:
        friendlyMessage = 'Tu sesión ha expirado. Inicia sesión nuevamente.';
        break;
      case 403:
        friendlyMessage = 'No tienes permisos para comentar en este ticket.';
        break;
      case 404:
        friendlyMessage = 'El ticket no existe.';
        break;
      case 500:
        friendlyMessage = 'Error interno del servidor. Intenta más tarde.';
        break;
    }

    return throwError(() => new Error(friendlyMessage));
  }
}