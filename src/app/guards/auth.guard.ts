import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot,  RouterStateSnapshot,  CanActivate,  Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({ providedIn: 'root'})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}