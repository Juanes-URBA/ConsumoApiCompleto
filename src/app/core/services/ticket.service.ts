import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Ticket } from '../interfaces/ticket.interface';
import { TicketFilters } from '../interfaces/ticket-filters.interface';
import { TicketListResponse } from '../interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly apiUrl = `${environment.apiUrl}/tickets`;

  constructor(private http: HttpClient) {}

  getTickets(filters: TicketFilters): Observable<TicketListResponse<Ticket>> {
    let params = new HttpParams()
      .set('page', filters.page)
      .set('limit', filters.limit);

    if (filters.status) {
      params = params.set('status', filters.status);
    }

    if (filters.priority) {
      params = params.set('priority', filters.priority);
    }

    return this.http
      .get<TicketListResponse<Ticket>>(this.apiUrl, { params })
      .pipe(catchError((error) => this.handleError(error)));
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.http
      .get<Ticket>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let friendlyMessage = 'Ocurrió un error inesperado. Intenta nuevamente.';

    switch (error.status) {
      case 400:
        friendlyMessage = 'La solicitud no es válida.';
        break;
      case 401:
        friendlyMessage = 'Tu sesión ha expirado. Inicia sesión nuevamente.';
        break;
      case 403:
        friendlyMessage = 'No tienes permisos para ver este ticket.';
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