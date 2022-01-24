import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../entity/todo';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-savetodo',
  templateUrl: './savetodo.component.html',
  styleUrls: ['./savetodo.component.scss']
})
export class SavetodoComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder,private router: Router, private snackBar: MatSnackBar) { }
  url:string="http://localhost:8080";
  todo:Todo;
  todoForm:FormGroup;

  ngOnInit(): void {
    this.todoForm  =  this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      due: ['']
    });
  }

  save(){
    this.todo = this.todoForm.value;
    this.http.post<Todo>(`${this.url}/todo/save`, this.todo).subscribe(
      success => {
        this.snackBar.open("Succesfully added new task!", "OK", {
          duration: 2000,
        });
        this.router.navigate[""];
      },
      error => {
        this.snackBar.open(error, "OK", {
          duration: 2000,
        });
      }
    );
  }

}
