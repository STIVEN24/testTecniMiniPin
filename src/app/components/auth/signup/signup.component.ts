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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

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
    private title: Title
  ) {
    this.title.setTitle("Registro - Mini-Twitter")

    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
    
  }

  ngOnInit() { }

  // open-eclaring-fields //
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  lastname = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.minLength(12)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  birth = new FormControl('', [Validators.required]);
  // close-declaring-fields //

  // open-declaring-fields-validators //
  // getErrorsName() { return this.name.hasError('required') ? 'Name Required' : ''; }
  // getErrorsLastname() { return this.lastname.hasError('required') ? 'Lastname Required' : ''; }
  // getErrorsEmail() { return this.email.hasError('required') ? 'Email Required' : this.email.hasError('email') ? 'Email invalid' : ''; }
  // getErrorsPassword() { return this.password.hasError('required') ? 'Password Required' : this.password.hasError('minLength') ? 'minLength 6' : ''; }
  // getErrorsBirth() { return this.birth.hasError('required') ? 'Birth Required' : ''; }
  // close-declaring-fields-validators //

  // open-signup //
  signup() {
    this.authService.signup(this.authModel).then((auth: any) => {
      console.log("Logging in...")
    }).catch(err => console.log(err))

  }
  // close-signup //

}
