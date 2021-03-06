import { Component } from '@angular/core';

import { timer } from 'rxjs';
import { mergeScan, skip, take, map } from 'rxjs/operators';

@Component({
  selector: 'rx-merge-scan',
  template: `
    <h1>mergeScan</h1>
    <pre prism-highlight="typescript">{{ code }}</pre>

    <marble [source]="higherOrder"></marble>
    <marble
      *ngFor="let source of lowerOrders"
      [initTime]="initTime"
      [source]="source"
    ></marble>
    <marble [source]="firstOrder"></marble>
  `,
})
export class RxMergeScanComponent {
  code = preval`module.exports = require('../codefile')(__filename)`;

  // I don't fully understand this one yet; will revisit after `scan`
  initTime = new Date().getTime();
  lowerOrders = [];
  higherOrder = timer(0, 1000).pipe(
    take(3),
    skip(1),
  );
  firstOrder = this.higherOrder.pipe(
    mergeScan((acc, val) => {
      const lowerOrder = timer(0, 1000 * val).pipe(
        take(3),
        map(innerVal => acc + innerVal),
      );
      this.lowerOrders.push(lowerOrder);
      return lowerOrder;
    }, 1),
  );
}
