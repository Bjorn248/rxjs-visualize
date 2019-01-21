import { Component } from '@angular/core';

@Component({
  selector: 'rx-visualizations-app',
  template: `
    <nav class="main-nav" [class.nav-open]="navOpen">
      <div class="nav-title">
        <svg
          class="nav-menu-button"
          (click)="navOpen = !navOpen"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>

        <h1 class="menu-title">RxJS Operators</h1>
      </div>
      <rx-nav></rx-nav>
    </nav>
    <div class="content" [ngClass]="navOpen ? 'nav-open' : null">
      <header class="header">
        <a routerLink="/"><img src="assets/rxjs-logo.png"/></a>
        <h1 class="page-title">RxJS Visualize</h1>
      </header>
      <aside class="small-screen-warning">
        <strong>Warning:</strong> This app is intended to be viewed on a
        relatively wide screen and is not responsive for smaller screens. It
        should still work on smaller screens, but you may have to scroll the
        marble diagrams or otherwise manipulate your screen size to see the full
        visualizations.
      </aside>
      <main><router-outlet></router-outlet></main>
    </div>
  `,
})
export class RxVisualizationsAppComponent {
  navOpen = true;
}
