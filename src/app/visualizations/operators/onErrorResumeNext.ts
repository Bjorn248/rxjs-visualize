import { Component } from '@angular/core';

import { timer } from 'rxjs';
import { onErrorResumeNext, map, take } from 'rxjs/operators';

import { mapNumberToChar } from 'src/app/mapNumberToChar';

@Component({
  selector: 'rx-on-error-resume-next',
  template: `
    <h1>onErrorResumeNext (Operator)</h1>
    <p>
      There is also an Observable creator
      <a routerLink="/onErrorResumeNextObc"><code>onErrorResumeNext</code></a
      >.
    </p>
    <p>
      This is a bit of a mixture between <code>concat</code> and
      <code>catchError</code>. You can provide a list of Observables to switch
      to if the source Observable completes <em>or</em> errors.
    </p>
    <pre prism-highlight="typescript">{{ code }}</pre>

    <marble [source]="inputs[0]"></marble>
    <marble [source]="inputs[1]"></marble>
    <marble [source]="inputs[2]"></marble> <marble [source]="output"></marble>
  `,
})
export class RxOnErrorResumeNextComponent {
  code = preval`module.exports = require('../codefile')(__filename)`;

  inputs = [
    timer(0, 1000).pipe(
      take(3),
      map(val => {
        if (val === 2) {
          throw new Error();
        }
        return val;
      }),
    ),

    timer(0, 1000).pipe(
      take(3),
      mapNumberToChar(),
      map(val => {
        if (val === 'b') {
          throw new Error();
        }
        return val;
      }),
    ),

    timer(0, 1000).pipe(
      take(3),
      mapNumberToChar(),
      map(val => val.toUpperCase()),
    ),
  ];
  output = (this.inputs[0] as any).pipe(
    onErrorResumeNext(this.inputs[1], this.inputs[2]),
  );
}
