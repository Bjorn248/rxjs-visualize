// This one confuses me
import { Component } from '@angular/core';

import { timer, interval } from 'rxjs';
import { take, mapTo, repeatWhen } from 'rxjs/operators';

@Component({
  selector: 'rx-repeat-when',
  template: `
    <h1>repeatWhen</h1>
    <p>
      This mirrors the source Observable <em>and</em> resubscribes to the source
      upon completion.
    </p>
    <pre prism-highlight="typescript">{{ code }}</pre>

    <marble [source]="input" color="yellow"></marble>
    <marble [source]="output"></marble>
  `,
})
export class RxRepeatWhenComponent {
  code = preval`module.exports = require('../codefile')(__filename)`;

  input = timer(0, 3000).pipe(
    take(3),
    mapTo('r'),
  );
  // I'm not quite sure why this ends up emitting 5 additional times.
  output = this.input.pipe(repeatWhen(() => interval(1000).pipe(take(2))));
}
