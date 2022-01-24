import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Todo } from './entity/todo';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class TodoService {

    constructor(private http: HttpClient) { }
    url:string = "http://localhost:8080";
  
    private todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

    get getObservableTodos(){
          return this.todos.asObservable();
    }

    public getTodos(){
      this.http.get<Todo[]>(`${this.url}/todo/get/all`).subscribe(
        success=>{
          this.todos.next(success);
        },
        error=>{
          console.log(error);
        }
      )
    }
  }