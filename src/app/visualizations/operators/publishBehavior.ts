import { Component } from '@angular/core';

import { timer, ConnectableObservable } from 'rxjs';
import { tap, take, publishBehavior } from 'rxjs/operators';

@Component({
  selector: 'rx-publish-behavior',
  template: `
    <h1>publishBehavior</h1>
    <p>
      This is similar to <code>publish</code> except it emits an initial value
      upon subscription. You can treat the returned ConnectableObservable like a
      <code>BehaviorSubject</code>.
    </p>
    <pre prism-highlight="typescript">{{ code }}</pre>

    <marble [source]="input"></marble> <marble [source]="output"></marble>
  `,
})
export class RxPublishBehaviorComponent {
  code = preval`module.exports = require('../codefile')(__filename)`;

  input = timer(0, 1000).pipe(
    take(20),
    tap(val => {
      if (5 === val) {
        this.output.connect();
      }
    }),
  );
  output = this.input.pipe(publishBehavior(-1)) as ConnectableObservable<
    number
  >;
}
