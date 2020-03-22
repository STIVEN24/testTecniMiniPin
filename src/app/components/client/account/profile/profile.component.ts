import { Component, OnInit } from '@angular/core';

// --- open-others --- //
import { FormControl, Validators } from '@angular/forms';
// --- close-others --- //

// --- open-services --- //
import { AuthService } from 'src/app/shared/services/auth.service';
// --- close-services --- //

// --- open-models --- //
import { Auth } from 'src/app/shared/models/auth.model';
import { File } from 'src/app/shared/models/file.model';
// --- close-models --- //

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  authModel: Auth = {
    name: '',
    lastname: '',
    email: '',
    // password: '',
    description: '',
    birth: '',
    photoURL: ''
  }

  public image: File;
  public currentImage = 'https://firebasestorage.googleapis.com/v0/b/minipin.appspot.com/o/media%2Fimg%2Fauth%2Fupload-img-profile.png?alt=media&token=6c40989e-73c4-44e0-911d-8f89a044e384';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.authService.userData.subscribe(user => {
      this.initFormForUpdate(user);
      this.authModel.uid = user.uid
    });

  }

  // open-eclaring-fields //
  name = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  birth = new FormControl({ value: '', disabled: true }, [Validators.required]);
  // close-declaring-fields //

  // open-declaring-fields-validators //
  getErrorsName() { return this.name.hasError('required') ? 'Name Required' : ''; }
  getErrorsLastname() { return this.lastname.hasError('required') ? 'Lastname Required' : ''; }
  getErrorsEmail() { return this.email.hasError('required') ? 'Email Required' : this.email.hasError('email') ? 'Email invalid' : ''; }
  // getErrorsPassword() { return this.password.hasError('required') ? 'Password Required' : this.password.hasError('minLength') ? 'minLength 6' : ''; }
  getErrorsBirth() { return this.birth.hasError('required') ? 'Birth Required' : ''; }
  // close-declaring-fields-validators //

  // open-update-profile //
  update() {
    this.authService.preUpdateProfile(this.authModel, this.image);
  }
  // close-update-profile //

  // --- open-init-load-form-profile ---
  private initFormForUpdate(user) {
    if (user.photoURL) {
      this.currentImage = user.photoURL
    }
    this.authModel.email = user.email;
    this.authService.getUser(user.uid).then(
      (res: any) => {
        this.authModel.name = res.name;
        this.authModel.lastname = res.lastname;
        this.authModel.birth = res.birth;
        this.authModel.photoURL = res.photoURL;
      })
      .catch(err => console.log(err));
  }
  // --- close-init-load-form-profile ---

  // --- open-upload-img --- //
  handleImage(img: File): void {
    this.image = img;
  }
  // --- close-upload-img --- //

}
