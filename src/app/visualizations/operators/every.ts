import { Component } from '@angular/core';

import { timer, pipe } from 'rxjs';
import { every, mapTo, map, take } from 'rxjs/operators';

@Component({
  selector: 'rx-every',
  template: `
    <h1>every</h1>
    <p>
      This checks that every element in an Observable matches some predicate. If
      <code>every</code> fails, it will emit <code>false</code> immediately and
      complete. Otherwise you have to wait until the source completes to see if
      it passed.
    </p>
    <pre prism-highlight="typescript">{{ code }}</pre>

    <marble [source]="passEvery"></marble>
    <marble [source]="failEvery"></marble> <marble [source]="passed"></marble>
    <marble [source]="failed"></marble>
  `,
})
export class RxEveryComponent {
  code = preval`module.exports = require('../codefile')(__filename)`;

  passEvery = timer(0, 1000).pipe(
    take(5),
    mapTo('a'),
  );
  failEvery = timer(0, 1000).pipe(
    take(5),
    map(val => (val % 2 ? 'b' : 'a')),
  );
  // not shown; this reuses the logic for the every check and display
  predicate = pipe(
    every(val => 'a' === val),
    map(val => (val ? 1 : 0)),
  );
  passed = this.passEvery.pipe(this.predicate);
  failed = this.failEvery.pipe(this.predicate);
}
