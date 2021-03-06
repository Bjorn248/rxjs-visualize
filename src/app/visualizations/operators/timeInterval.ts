import { Component } from '@angular/core';

import { timer } from 'rxjs';
import { take, timeInterval, pluck } from 'rxjs/operators';

@Component({
  selector: 'rx-time-interval',
  template: `
    <h1>timeInterval</h1>
    <p>Similar to <code>timestamp</code>.</p>
    <p>
      Emits the actual time between Observable emissions. This is provided as an
      object with
      <code prism-highlight="typescript">{{ '{' }} value, interval }</code>
    </p>
    <pre prism-highlight="typescript">{{ code }}</pre>

    <marble [source]="input"></marble> <marble [source]="intervals"></marble>
    <marble [source]="values"></marble>
  `,
})
export class RxTimeIntervalComponent {
  code = preval`module.exports = require('../codefile')(__filename)`;

  input = timer(0, 950).pipe(take(20));
  // not shown
  timeIntervals = this.input.pipe(timeInterval());
  intervals = this.timeIntervals.pipe(pluck('interval'));
  values = this.timeIntervals.pipe(pluck('value'));
}
