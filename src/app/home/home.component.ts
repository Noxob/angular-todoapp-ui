import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../entity/todo';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private authService:AuthService, private router: Router, private todoService:TodoService) { }

  todos:Todo[];
  waiting:Todo[]=[];
  done:Todo[]=[];
  loggedIn:boolean;
  updated:boolean=true;

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(isLoggedIn => this.loggedIn = isLoggedIn);
    this.todoService.getObservableTodos.subscribe(todosUpdated=> {
      this.todos = todosUpdated
      this.done = [];
      this.waiting = [];
      todosUpdated.forEach(t => t.complete?this.done.push(t) : this.waiting.push(t));
    });
    this.todoService.getTodos();
    if(this.loggedIn){
      console.log("already logged int redirecting to /")
      this.router.navigate(['']);
    }else{
      this.router.navigate(['login']);
    }

  }


}
