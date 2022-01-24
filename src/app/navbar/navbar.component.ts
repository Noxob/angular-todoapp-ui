import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SavetodoComponent } from '../savetodo/savetodo.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(private authService:AuthService, private router: Router, public dialog: MatDialog) { }
  
  user:string;
  loggedIn:boolean;

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(isLoggedIn => this.loggedIn = isLoggedIn);
    this.authService.getCurrentUser.subscribe(currentUser => this.user = currentUser.username);
    console.log(this.user);
    
  }

  logout(){
    this.authService.logout();
  }

  openSaveTodo(){
    const dialogRef = this.dialog.open(SavetodoComponent);
  }

}
