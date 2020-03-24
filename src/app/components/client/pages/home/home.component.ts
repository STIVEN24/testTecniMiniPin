import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isAuth: boolean;

  constructor(
    private authService: AuthService,
    private title: Title
  ) {
    this.title.setTitle("Inicio - Mini-Twitter")
  }

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

}
