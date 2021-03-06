import { Component } from '@angular/core';

import { timer, interval } from 'rxjs';
import { take, mapTo, concatMapTo } from 'rxjs/operators';

@Component({
  selector: 'rx-concat-map-to',
  template: `
    <h1>concatMapTo</h1>
    <pre prism-highlight="typescript">{{ code }}</pre>

    <marble [source]="higherOrder"></marble> <marble [source]="inner"></marble>
    <marble [source]="firstOrder"></marble>
  `,
})
export class RxConcatMapToComponent {
  code = preval`module.exports = require('../codefile')(__filename)`;

  higherOrder = timer(0, 1000).pipe(
    take(4),
    mapTo('a'),
  );
  inner = interval(1000).pipe(take(2));
  firstOrder = this.higherOrder.pipe(concatMapTo(this.inner));
}
