import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// --- open-modules --- //
import { AppRoutingModule } from './modules/app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// open-firebase  //
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
// close-firebase  //

// --- close-modules --- //


// --- open-components --- //
import { AppComponent } from './app.component';

// open-auth //
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
// close-auth //

// open-public //
import { NavComponent } from './components/public/nav/nav.component';
import { FooterComponent } from './components/public/footer/footer.component';
// close-public //

// open-client //
import { NewPinComponent } from './components/client/pages/pins/new-pin/new-pin.component';
import { UpdatePinComponent } from './components/client/pages/pins/update-pin/update-pin.component';
import { ProfileComponent } from './components/client/account/profile/profile.component';
import { HomeComponent } from './components/client/pages/home/home.component';
// close-client //

// --- close-components --- //

// --- open-others --- //
import { environment } from 'src/environments/environment';
// --- close-others --- //

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    NewPinComponent,
    UpdatePinComponent,
    SignupComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // open-firebase //
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    // close-firebase //

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
