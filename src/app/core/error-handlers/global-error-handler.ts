import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastService } from '../../shared/components/toast/toast.service';

// Captura errores NO manejados por los catchError() de cada servicio
// (por ejemplo, errores de template, de parsing, o bugs inesperados en runtime).
// Los errores HTTP normales siguen manejándose donde ya se manejaban desde el Avance 2.
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // Se inyecta Injector (no ToastService directamente) para evitar
  // una dependencia circular entre el manejador global y el resto de la app.
  constructor(private injector: Injector) {}

  handleError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      // Los errores HTTP ya muestran su propio mensaje amigable
      // vía catchError() en cada servicio; aquí solo se registran.
      console.error('[HTTP Error]', error);
      return;
    }

    console.error('[Unexpected Error]', error);

    const toastService = this.injector.get(ToastService);
    toastService.show('Ocurrió un error inesperado en la aplicación.', 'error');
  }
}