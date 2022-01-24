import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../entity/todo';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from '../todo.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-savetodo',
  templateUrl: './savetodo.component.html',
  styleUrls: ['./savetodo.component.scss']
})
export class SavetodoComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder,private router: Router, private snackBar: MatSnackBar, private todoService:TodoService, private dialogRef: MatDialogRef<SavetodoComponent>) { }
  url:string="http://localhost:8080";
  @Input()
  todo:Todo={"id": "", "title":"", "description":"", "due":null, "created":null, "updated":null, "user":"", "complete": false};

  @Input()
  status:string="EDIT";

  todoForm:FormGroup;

  ngOnInit(): void {
    this.todoForm  =  this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      due: ['']
    });
  }

  save(){
    switch(this.status){
      case "EDIT":

        if(this.todoForm.invalid){
          this.snackBar.open("You need to fill required fields!", "OK", {
            duration: 2000,
          });
          return;
        }

        this.todo.title = this.todoForm.value.title;
        this.todo.description = this.todoForm.value.description;
        this.todo.due = this.todoForm.value.due;
        
        this.http.post<Todo>(`${this.url}/todo/save`, this.todo).subscribe(
          success => {
            this.snackBar.open("Succesfully added new task!", "OK", {
              duration: 2000,
            });
            this.closeDialog();
          },
          error => {
            console.log(error)
            this.snackBar.open(error.error.error, "OK", {
              duration: 2000,
            });
          }
        );
        break;
        case "REMOVE":
        this.http.get(`${this.url}/todo/remove/${this.todo.id}`).subscribe(
          success=>{
            this.snackBar.open("Succesfully removed the task!", "OK", {
              duration: 2000,
            });
            this.closeDialog();
          },
          error=>{
            this.snackBar.open(error.error.error, "OK", {
              duration: 2000,
            });
          }
        )
        break;
        case "COMPLETE":
          this.todo.complete=true;
          this.http.post<Todo>(`${this.url}/todo/save`, this.todo).subscribe(
            success=>{
              this.snackBar.open("You have completed the task!", "OK", {
                duration: 2000,
              });
              this.closeDialog();
            },
            error=>{
              this.snackBar.open(error.error.error, "OK", {
                duration: 2000,
              });
            }
          );
        break;
        
      }
      this.todoService.getTodos();
    }

    closeDialog(){
      this.todoService.getTodos();
      this.dialogRef.close();
    }

}
