import { Component, OnInit } from '@angular/core';
import { UiService } from './ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-todoapp-ui';

  loading:boolean=false;

  constructor(private ui:UiService){}
  ngOnInit(): void {
    this.ui.isLoading.subscribe(
      isLoading => {
        this.loading = isLoading;
      }
    );
  }

}
