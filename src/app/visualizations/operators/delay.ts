import { Component } from '@angular/core';

import { timer } from 'rxjs';
import { delay, take } from 'rxjs/operators';

@Component({
  selector: 'rx-delay',
  template: `
    <h1>delay</h1>
    <p>This delays <em>once</em>, the first emission of the Observable.</p>
    <pre prism-highlight="typescript">{{ code }}</pre>

    <marble [source]="input"></marble> <marble [source]="delayed"></marble>
  `,
})
export class RxDelayComponent {
  code = preval`module.exports = require('../codefile')(__filename)`;

  input = timer(0, 1000).pipe(take(20));
  delayed = this.input.pipe(delay(1000));
}
