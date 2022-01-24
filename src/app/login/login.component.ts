import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private authService:AuthService, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  loginForm:FormGroup;
  isSubmitted=false;
  hide=true;
  loggedIn:boolean;

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login(){
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        // console.log(data);
      },
      err => {
        // console.log(err);
        this.snackBar.open("Incorrect username or password.", "OK", {
          duration: 2000,
        });
      }
    );
  }

}