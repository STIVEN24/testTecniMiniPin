import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NavigationStart, NavigationEnd, Router, Event } from '@angular/router';

// --- open-services --- //
import { ChangeThemeService } from './shared/services/change-theme.service';
// --- close-services --- //


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @HostBinding('class') componentCssClass: any;

  showSpinnerLoading: boolean;

  constructor(
    private router: Router,
    public overlayContainer: OverlayContainer,
    private changeThemeService: ChangeThemeService
  ) {
    this.showSpinnerLoading = true;

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showSpinnerLoading = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        setTimeout(() => { this.showSpinnerLoading = false }, 500);
      }
    });
  }

  ngOnInit() {
    this.changeThemeService.currentTheme.subscribe(d => this.changeTheme(d))
  }

  changeTheme(e) {
    this.overlayContainer.getContainerElement().classList.add(e);
    this.componentCssClass = e
  }

}
