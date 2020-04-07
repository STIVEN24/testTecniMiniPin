import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

// --- open-others --- //
import { FormControl, Validators } from '@angular/forms';
// --- close-others --- //

// --- open-services --- //
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChangeThemeService } from 'src/app/shared/services/change-theme.service';
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

  public spinnerLoadingPhotoURLProfile: boolean;
  public changeThemeSlideToggleBoolean: boolean;
  public changeTextThemeSlideToggle: string = 'Dark';


  uid: string;

  authModel: Auth = {
    name: '',
    lastname: '',
    email: '',
    description: '',
    birth: '',
    photoURL: ''
  }

  public image: File;
  public currentImage = 'https://firebasestorage.googleapis.com/v0/b/minipin.appspot.com/o/media%2Fimg%2Fauth%2Fupload-img-profile.png?alt=media&token=6c40989e-73c4-44e0-911d-8f89a044e384';



  constructor(
    private authService: AuthService,
    private title: Title,
    private matSnackBar: MatSnackBar,
    private changeThemeService: ChangeThemeService
  ) {
    this.title.setTitle("Registro - Mini-Twitter")

    this.spinnerLoadingPhotoURLProfile = true
    
  }

  ngOnInit() {
    
    this.authService.userData.subscribe(user => {
      this.uid = user.uid

      this.authService.getUser(this.uid).subscribe(
        (res: any) => {
          this.authModel.name = res.name;
          this.authModel.lastname = res.lastname;
          this.authModel.email = res.email;
          this.authModel.description = res.description;
          this.authModel.photoURL = res.photoURL;
          this.authModel.birth = res.birth
          setTimeout(() => { this.spinnerLoadingPhotoURLProfile = false; }, 1000);
        },
        err => console.log(err)
      )

    });

  }

  // open-eclaring-fields //
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]);
  description = new FormControl('');
  birth = new FormControl('');
  // close-declaring-fields //

  // --- open-update-profile --- //
  updateProfile() {

    this.authService.updateProfile(this.uid, this.authModel)
    .then(res => this.showSnackBar('Tu perfil ha sido actualizado'))
    .catch(err => console.log(err))
  }
  // --- close-update-profile --- //

  // --- open-upload-img --- //
  handleImage(photoURL: File): void {
    this.spinnerLoadingPhotoURLProfile = true
    if (photoURL) {
      if (this.validateSizeImg(photoURL.size) && this.validateTypeImg(photoURL)) {
        this.authService.uodatePhotoURLProfile(this.uid, photoURL)
          .subscribe(
            res => setTimeout(() => { this.spinnerLoadingPhotoURLProfile = false; this.showSnackBar('Foto Actualizada') }, 2000),
            err => console.log(err)
          )
        this.image = photoURL;
      } else {
        this.showSnackBar('Imágen incorrecta')
      }
    }
  }
  // --- close-upload-img --- //

  // --- open-function-validate-img ---//
  // validate-size-img //
  private validateSizeImg(size: any) {
    const sizeAllow2MB = 2097152; // equivale a 2 MB

    if (size < sizeAllow2MB) {
      size = true
    } else {
      size = false
    }
    return !size ? false : true
  }
  // validate-type-img //
  private validateTypeImg(img: any) {
    const typeAllow = "(.*?)\.(jpg|png|jpeg)$";
    let valToLower = img.name.toLowerCase();
    let regex = new RegExp(typeAllow);
    let regexTest = regex.test(valToLower);
    return !regexTest ? false : true;
  }
  // --- close-function-validate-img ---//


  
  // --- open-UI --- //

  // open-snack-bar //
  showSnackBar(message: string) {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: message
    })

  }
  // close-snack-bar //

  // open-change-theme-slide-toggle //
  changeThemeSlideToggle() {
    if (this.changeThemeSlideToggleBoolean) {
      this.changeThemeSlideToggleBoolean = false
      this.changeTextThemeSlideToggle = 'Dark';
      this.changeThemeService.changeTheme('light-theme')
    } else {
      this.changeThemeSlideToggleBoolean = true
      this.changeTextThemeSlideToggle = 'Light';
      this.changeThemeService.changeTheme('dark-theme')
    }
  }
  // close-change-theme-slide-toggle //

  // --- close-UI --- //


}

@Component({
  template: `
  <span> {{ data }} </span>
  `,
  styles: [
    `span { color: #fff }`
  ]
})
export class SnackBarComponent {

  constructor(
    private matSnackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

}