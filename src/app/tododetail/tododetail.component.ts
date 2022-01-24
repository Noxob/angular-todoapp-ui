import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../entity/todo';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-tododetail',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '40px',
        opacity: 1,
        //display: "block"
      })),
      state('closed', style({
        height: '25px',
        opacity: 0,
        //display: "none"
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './tododetail.component.html',
  styleUrls: ['./tododetail.component.scss']
})
export class TododetailComponent implements OnInit {

  @Input()
  todo: Todo;
  showButtons:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.showButtons=!this.showButtons;
  }

}
