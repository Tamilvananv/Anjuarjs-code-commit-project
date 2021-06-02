import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private routes: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    // tslint:disable-next-line:no-debugger
    state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('userToken') != null) {
      return true;
    } else {
      this.routes.navigate(['/login']);
      return false;
    }
  }
}
