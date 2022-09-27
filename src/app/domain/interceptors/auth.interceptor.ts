import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/auth')) {
      return next.handle(request);
    }

    const tokenAccess = this.authService.getAccessToken();
    let authorizationString: string = `Bearer ${tokenAccess}`;
    // console.log(authorizationString);
    let req = request.clone({
      setHeaders: {
        Authorization: authorizationString,
      },
      // headers: new HttpHeaders({
      //   'Content-type': 'application/json',
      //   Authorization: authorizationString,
      // }),
    });
    return next.handle(req);
  }
}
