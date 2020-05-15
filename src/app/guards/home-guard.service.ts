import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      if (this.authService.isParent) {
        this.router.navigate([`profile/parent/${this.authService.userId}`]);
      } else {
        this.router.navigate([`profile/sitter/${this.authService.userId}`]);
      }
      return false;
    } else {return true; }
  }
}
