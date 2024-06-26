import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (!this.authService.user || !this.authService.token) {
      this.router.navigateByUrl("/login");
      return false;
    }
    let token = this.authService.token;
    let expiration = (JSON.parse(atob(token.split('.')[1]))).exp;
    if (Math.floor((new Date).getTime()/1000)>= expiration) {
      this.authService.logout();
      return false;
    }
    return true;
  }
}