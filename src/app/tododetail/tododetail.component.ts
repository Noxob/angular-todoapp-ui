import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../entity/todo';

@Component({
  selector: 'app-tododetail',
  templateUrl: './tododetail.component.html',
  styleUrls: ['./tododetail.component.scss']
})
export class TododetailComponent implements OnInit {

  @Input()
  todo: Todo;

  constructor() { }

  ngOnInit(): void {
  }

}
