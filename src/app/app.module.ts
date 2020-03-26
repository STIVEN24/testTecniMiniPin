import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// --- open-modules --- //
import { AppRoutingModule } from './modules/app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// open-firebase  //
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
// close-firebase  //

// open-material //
import { MaterialAngularMaterial } from './modules/material.module';
// close-material //

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
import { ProfileComponent, SnackBarComponent } from './components/client/account/profile/profile.component';
import { HomeComponent } from './components/client/pages/home/home.component';
// close-client //

// post-post //
import { NewPostComponent } from './components/client/pages/posts/new-post/new-post.component';
import { PostComponent, ModalUpdatePostComponent } from './components/client/pages/posts/post/post.component';
import { MyPostsComponent } from './components/client/pages/posts/my-posts/my-posts.component';
// close-post //

// --- close-components --- //

// --- open-others --- //
import { environment } from 'src/environments/environment';
import { NotFoundPageComponent } from './components/client/pages/not-found-page/not-found-page.component';
// --- close-others --- //


import { ChangeThemeService } from './shared/services/change-theme.service';

@NgModule({
  declarations: [
    AppComponent,

    // open-auth //
    LoginComponent,
    SignupComponent,
    // close-auth //

    // open-account //
    ProfileComponent,
    // close-account //

    // open-public //
    NavComponent,
    FooterComponent,
    HomeComponent,
    // close-public //

    // open-post //
    PostComponent,
    NewPostComponent,
    MyPostsComponent,
    ModalUpdatePostComponent,
    SnackBarComponent,

    NotFoundPageComponent,
    // close-post //
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialAngularMaterial,

    // open-firebase //
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    // close-firebase //

  ],
  entryComponents: [
    ModalUpdatePostComponent,
    SnackBarComponent
  ],
  providers: [
    ChangeThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
