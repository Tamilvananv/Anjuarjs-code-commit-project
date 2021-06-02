import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('no-auth') === 'True') {
      return next.handle(req.clone());
    }
    if (sessionStorage.getItem('userToken') != null) {
      const clonedrq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('userToken'))
      });
      return next.handle(clonedrq).pipe(tap(
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            console.log('req url :: ' + req.url);
            if (err.status === 401) {
              this.router.navigate(['user']);
            }
          }
        }
      ));
    } else {
      if(sessionStorage.getItem('msal.idtoken') == null){
        this.router.navigateByUrl('/login');
      }
    }
    return next.handle(req);
  }
}

