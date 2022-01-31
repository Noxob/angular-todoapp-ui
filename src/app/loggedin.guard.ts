import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class LoggedInGuard implements CanActivate {
  notLoggedIn:boolean=false;
  constructor(private authService: AuthService,private router: Router, private snackBar: MatSnackBar) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authService.isLoggedIn.subscribe(isLoggedIn =>  {
        if (isLoggedIn) {
            this.snackBar.open("You are already logged in.", "OK", {
              duration: 2000,
            });
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