import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './entity/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  
  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  url:string = "http://localhost:8080";

  public login(user:User):Observable<any>{
    return this.http.post(`${this.url}/login`, user, {observe:'response'}).pipe(
      map(authenticateSuccess.bind(this))
    );

    function authenticateSuccess(resp) {
      const status = resp.status;
      const bearerToken = resp.headers.get('Authorization');
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ' && status == 200) {
          const jwt = bearerToken.slice(7, bearerToken.length);
          window.sessionStorage.setItem("token", jwt);
          this.loggedIn.next(true);
          this.router.navigate(['']);
          this.snackBar.open("Login Successful!", "OK", {
            duration: 2000,
          });
          return resp;
      }else{
        this.logout();
      }
    }

  }

  public logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.loggedIn.next(false);
    this.snackBar.open("Your session has expired, please log in again.", "OK", {
      duration: 2000,
    });
    this.router.navigate(['login']);
  }

  getToken(): string{
    return sessionStorage.getItem('token');;
  }

  isJwtValid() : boolean{
    const jwtToken = JSON.parse(atob(this.getToken().split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    return expires.getTime() - Date.now() > 0;
  }

  get isLoggedIn() {
    const token = this.getToken();
    if(token && token.toString().trim().length != 0 && this.isJwtValid()){
      this.loggedIn.next(true);
    }else{
      this.loggedIn.next(false);
      this.logout()
    }
    return this.loggedIn.asObservable();
  }

  get getCurrentUser(){
    if(this.isLoggedIn){
      return this.currentUser.asObservable();
    }
  }


}