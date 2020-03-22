import { Component } from '@angular/core';

// --- open-services --- /
import { AuthService } from './shared/services/auth.service';
// --- close-services --- /

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService
  ) { }

}
