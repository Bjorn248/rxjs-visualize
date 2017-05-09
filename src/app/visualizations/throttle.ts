import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttle';

@Component({
  selector: 'rx-throttle',
  template: `
    <marble [source$]="input$"></marble>
    <h2>Throttle</h2>
    <marble [source$]="output$"></marble>
  `
})
export class RxThrottleComponent {
  input$ = Observable.interval(500).map(val => String.fromCharCode(val + 97)).take(10);
  output$ = this.input$.throttle(() => Observable.interval(1500));
}