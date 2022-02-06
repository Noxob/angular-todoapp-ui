import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Subject, BehaviorSubject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoading() {
    return this.loading.asObservable();
  }

  spin(spin:boolean){
    this.loading.next(spin);
  }


}
