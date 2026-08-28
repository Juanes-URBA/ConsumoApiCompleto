import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Ticket } from '../interfaces/ticket.interface';
import { TicketFilters } from '../interfaces/ticket-filters.interface';
import { TicketListResponse } from '../interfaces/pagination.interface';
import { CreateTicketRequest } from '../interfaces/create-ticket-request.interface';
import { UpdateTicketRequest } from '../interfaces/update-ticket-request.interface';

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

  createTicket(data: CreateTicketRequest): Observable<Ticket> {
    return this.http
      .post<Ticket>(this.apiUrl, data)
      .pipe(catchError((error) => this.handleError(error)));
  }

  updateTicket(id: string, data: UpdateTicketRequest): Observable<Ticket> {
    return this.http
      .patch<Ticket>(`${this.apiUrl}/${id}`, data)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let friendlyMessage = 'Ocurrió un error inesperado. Intenta nuevamente.';

    switch (error.status) {
      case 400:
        friendlyMessage = 'Los datos ingresados no son válidos.';
        break;
      case 401:
        friendlyMessage = 'Tu sesión ha expirado. Inicia sesión nuevamente.';
        break;
      case 403:
        friendlyMessage = 'No tienes permisos para realizar esta acción.';
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