import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SitterProfileGuardService implements CanActivate {

  constructor(public router: Router, public authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!(this.authService.isParent) && route.params.id === this.authService.userId) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }  }
}
