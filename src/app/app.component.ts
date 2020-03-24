import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd, Router, Event } from '@angular/router';

// --- open-services --- /
import { AuthService } from './shared/services/auth.service';
// --- close-services --- /

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showSpinnerLoading: boolean;

  constructor(
    private router: Router
  ) {
    this.showSpinnerLoading = true;

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showSpinnerLoading = true;
      }
      if (routerEvent instanceof NavigationEnd) {
          this.showSpinnerLoading = false;
      }
    });
  }

}
