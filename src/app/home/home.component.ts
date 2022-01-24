import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../entity/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private authService:AuthService, private router: Router) { }

  url:string = "http://localhost:8080";
  todos:Todo[];
  waiting:Todo[]=[];
  done:Todo[]=[];
  loggedIn:boolean;

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(isLoggedIn => this.loggedIn = isLoggedIn);
    if(this.loggedIn){
      console.log("already logged int redirecting to /")
      this.router.navigate(['']);
    }else{
      this.router.navigate(['login']);
    }

    this.http.get<Todo[]>(`${this.url}/todo/get/all`).subscribe(
      success=>{
        this.todos = success;
        success.forEach(t => t.complete?this.done.push(t) : this.waiting.push(t));
      },
      error=>{
        console.log(error);
      }
    )
  }

}
