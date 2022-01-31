import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { Todo } from './entity/todo';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';

@Injectable({
    providedIn: 'root'
  })
  export class TodoService {
    
    arr : Todo[] = [];
    private todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(this.arr);
    
    constructor(private http: HttpClient) { }
  

    get getObservableTodos(){
          return this.todos.asObservable();
    }

    public getTodos(){
      this.http.get<Todo[]>(`${Constants.API_ENDPOINT}/todo/get/all`).subscribe(
        success=>{
          if(success!==null){
            this.todos.next(success);
          }else{
            this.todos.next([]);
          }
        },
        error=>{
        }
      )
    }
  }