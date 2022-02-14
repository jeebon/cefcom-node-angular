import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class UnAuthorizedInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log('unAuthInterceptor: ', err);

      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authService.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }),
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Response Intercept:', event);
        }
      })
    );
  }
}
