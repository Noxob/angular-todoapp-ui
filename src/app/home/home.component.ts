import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../entity/todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  url:string = "http://localhost:8080";
  todos:Todo[];
  waiting:Todo[];
  done:Todo[];

  ngOnInit(): void {
    this.http.get<Todo[]>(`${this.url}/todo/get/all`).subscribe(
      success=>{
        this.todos = success;
        this.todos.forEach(t => t.complete?this.done.push(t) : this.waiting.push(t));
        console.log("waiting: " + this.waiting);
        console.log("done:" + this.done);
      },
      error=>{
        console.log(error);
      }
    )
  }

}
