import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  signupForm:FormGroup;
  isSubmitted=false;
  hide=true;


  ngOnInit() {
    this.signupForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }


  signup(){
    // console.log(this.signupForm.value);
    this.isSubmitted = true;
    // if(this.signupForm.invalid){
    //   return;
    // }
    this.http.post(`http://localhost:8080/user/register`, this.signupForm.value).subscribe(
      success=>{
        console.log(success);
        this.snackBar.open("You have successfully signed up, now you can log in.", "OK", {
          duration: 4000,
        });
        this.router.navigate(['login']);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
