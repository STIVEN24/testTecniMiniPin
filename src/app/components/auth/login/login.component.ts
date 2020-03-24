import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

// --- open-others --- //
import { FormControl, Validators } from '@angular/forms';
// --- close-others --- //

// --- open-services --- //
import { AuthService } from 'src/app/shared/services/auth.service';
// --- close-services --- //

// --- open-models --- //
import { Auth } from 'src/app/shared/models/auth.model';
// --- close-models --- //

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authModel: Auth = {
    email: '',
    password: ''
  }

  submitted: boolean;

  constructor(
    private title: Title,
    private authService: AuthService
  ) {
    this.title.setTitle("Iniciar sesión - Mini-Twitter")
  }

  ngOnInit() { }

  // open-eclaring-fields //
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  // close-declaring-fields //

  // open-declaring-fields-validators //
  getErrorsEmail() { return this.email.hasError('required') ? 'Email Required' : this.email.hasError('email') ? 'Email invalid' : ''; }
  getErrorsPassword() { return this.password.hasError('required') ? 'Password Required' : this.password.hasError('minLength') ? 'minLength 6' : ''; }
  // close-declaring-fields-validators //

  // open-login //
  login() {
    this.submitted = true;
    if (this.email.invalid) return;
    if (this.password.invalid) return;

    this.authService.login(this.authModel).then(res => {
      console.log("logging in");
    }).catch(err => window.alert("Email or password incorrect."));
  }
  // close-login //

}
