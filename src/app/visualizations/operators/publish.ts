import { Component } from '@angular/core';

import { ConnectableObservable, interval } from 'rxjs';
import { tap, take, publish } from 'rxjs/operators';

@Component({
  selector: 'rx-publish',
  template: `
    <h1>publish</h1>
    <p>
      The <code>publish</code> use
      <a routerLink="/multicast"><code>multicast</code></a> with various
      Subjects. This uses
      <code prism-highlight="typescript">new Subject()</code>
    </p>
    <pre prism-highlight="typescript">{{ code }}</pre>

    <marble [source]="input"></marble> <marble [source]="output"></marble>
  `,
})
export class RxPublishComponent {
  code = preval`module.exports = require('../codefile')(__filename)`;

  input = interval(1000).pipe(
    take(20),
    tap(val => {
      if (5 === val) {
        this.output.connect();
      }
    }),
  );
  output = this.input.pipe(publish()) as ConnectableObservable<number>;
}
