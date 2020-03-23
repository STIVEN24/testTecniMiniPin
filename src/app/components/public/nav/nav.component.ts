import { Component, OnInit } from '@angular/core';

// --- open-services --- //
import { AuthService } from 'src/app/shared/services/auth.service';
// --- close-services --- //

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isAuth: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getCurrentAuth();
  }

  getCurrentAuth() {
    this.authService.isAuth().subscribe(
      auth => {
        if (auth) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    )
  }

  logout() {
    this.authService.logout();
    this.getCurrentAuth();
  }

}
