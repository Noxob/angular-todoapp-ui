import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from '../constants';

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
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    let valid = null;
    if(pass !== confirmPass){
      valid = { notSame: true };
    }
    group.get('password').setErrors(valid);
    group.get('confirmPassword').setErrors(valid);
    return valid;
  }

  signup(){
    this.isSubmitted = true;
    if(this.signupForm.invalid){
      this.snackBar.open("Please check the form fields and try submitting the form again.", "OK", {
        duration: 4000,
      });
      return;
    }
    this.http.post(`${Constants.API_ENDPOINT}/user/register`, this.signupForm.value).subscribe(
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
