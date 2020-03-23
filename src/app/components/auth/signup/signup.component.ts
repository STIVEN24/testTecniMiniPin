import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authModel: Auth = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    description: '',
    birth: '',
    photoURL: ''
  }

  submitted: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  // open-eclaring-fields //
  name = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  birth = new FormControl('', [Validators.required]);
  // close-declaring-fields //

  // open-declaring-fields-validators //
  getErrorsName() { return this.name.hasError('required') ? 'Name Required' : ''; }
  getErrorsLastname() { return this.lastname.hasError('required') ? 'Lastname Required' : ''; }
  getErrorsEmail() { return this.email.hasError('required') ? 'Email Required' : this.email.hasError('email') ? 'Email invalid' : ''; }
  getErrorsPassword() { return this.password.hasError('required') ? 'Password Required' : this.password.hasError('minLength') ? 'minLength 6' : ''; }
  getErrorsBirth() { return this.birth.hasError('required') ? 'Birth Required' : ''; }
  // close-declaring-fields-validators //

  // open-signup //
  signup() {
    this.submitted = true;
    if (this.name.invalid) return;
    if (this.lastname.invalid) return;
    if (this.email.invalid) return;
    if (this.password.invalid) return;
    if (this.birth.invalid) return;

    this.authService.signup(this.authModel).then((auth: any) => {
      console.log("Logging in...")
    }).catch(err => console.log(err))

  }
  // close-signup //

}
