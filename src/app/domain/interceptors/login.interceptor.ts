import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((err) => {
        switch (err.status) {
          case 401:
            this.authService.logout();
            this.toastrService.error(err.error.msg, 'Error de autenticación');
            this.router.navigate(['/']);
            break;

          case 403:
            err.error.errors.forEach((error: any) => {
              this.toastrService.error(error.msg, 'Error de validación');
            });
            break;

          case 404:
            this.toastrService.error(err.error.msg, 'Error, no encontrado');
            break;

          case 500:
            this.toastrService.error(err.error.msg, 'Error interno');
            break;

          default:
            this.toastrService.error(err.error.msg, 'Error interno');
            break;
        }
        return throwError(err);
      })
    );
  }
}
