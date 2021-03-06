import { Component } from '@angular/core';

import { timer } from 'rxjs';
import { takeWhile, take } from 'rxjs/operators';

@Component({
  selector: 'rx-take-while',
  template: `
    <h1>takeWhile</h1>
    <pre prism-highlight="typescript">{{ code }}</pre>

    <marble [source]="input"></marble> <marble [source]="output"></marble>
  `,
})
export class RxTakeWhileComponent {
  code = preval`module.exports = require('../codefile')(__filename)`;

  input = timer(0, 1000).pipe(take(5));
  output = this.input.pipe(takeWhile(val => val !== 3));
}
