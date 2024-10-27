import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'; // Assuming you are using Toastr for notifications

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          console.log(error)
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error : ${error.message}`;
        }
        this.toastr.error(errorMessage, 'Error', { closeButton: true }); // Show error message
        return throwError(error);
      })
    );
  }
}
