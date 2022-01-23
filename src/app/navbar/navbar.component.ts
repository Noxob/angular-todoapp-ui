import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(private authService:AuthService, private router: Router) { }
  
  loggedIn:boolean;
  user:string;

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(isLoggedIn => this.loggedIn = isLoggedIn);
    this.authService.getCurrentUser.subscribe(currentUser => this.user = currentUser.username);
    console.log(this.user);
    if(this.loggedIn){
      console.log("already logged int redirecting to /")
      this.router.navigate(['']);
    }else{
      this.router.navigate(['login']);
    }
  }

  logout(){
    this.authService.logout();
  }

}
