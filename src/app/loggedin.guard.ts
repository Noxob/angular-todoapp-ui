import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  notLoggedIn:boolean=false;
  constructor(private authService: AuthService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authService.isLoggedIn.subscribe(isLoggedIn =>  {
        if (isLoggedIn) {
          this.router.navigate(["/"]);
          this.notLoggedIn=false;
          return false;
        }
        this.notLoggedIn=true;
        return true;
    });
    return this.notLoggedIn;
  }
}