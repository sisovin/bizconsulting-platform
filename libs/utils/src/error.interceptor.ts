import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomError } from '@libs/interfaces/src/error.interface';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let customError: CustomError;

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          customError = {
            message: 'An error occurred: ' + error.error.message,
            status: error.status,
            type: 'client',
            details: error.error
          };
        } else if (error.status >= 500) {
          // Server-side error
          customError = {
            message: 'A server error occurred: ' + error.message,
            status: error.status,
            type: 'server',
            details: error.error
          };
        } else {
          // Network error
          customError = {
            message: 'A network error occurred: ' + error.message,
            status: error.status,
            type: 'network',
            details: error.error
          };
        }

        // Log the error to a monitoring service
        this.logErrorToMonitoringService(customError);

        return throwError(customError);
      })
    );
  }

  private logErrorToMonitoringService(error: CustomError): void {
    // Implement your logging logic here
    console.error('Logging error to monitoring service:', error);
  }
}
