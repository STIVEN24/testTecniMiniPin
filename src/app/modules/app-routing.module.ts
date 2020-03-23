import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// --- open-components --- //

// open-auth //
import { HomeComponent } from '../components/client/pages/home/home.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { SignupComponent } from '../components/auth/signup/signup.component';
import { ProfileComponent } from '../components/client/account/profile/profile.component';
// close-auth //

// open-posts //
import { NewPostComponent } from '../components/client/pages/posts/new-post/new-post.component';
// close-posts //

// open-not-found-page //
import { NotFoundPageComponent } from '../components/client/pages/not-found-page/not-found-page.component';
// close-not-found-page //

// --- close-components --- //

// --- open-guards --- //
import { AuthGuard } from '../shared/guards/auth.guard';
import { LogedGuard } from '../shared/guards/loged.guard';
// --- close-guards --- //

const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },

  // open-auth //
  { path: 'auth/login', component: LoginComponent, canActivate: [LogedGuard] },
  { path: 'auth/signup', component: SignupComponent, canActivate: [LogedGuard] },
  // close-auth //

  // open-account //
  { path: 'account/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // close-account //
  
  // open-posts //
  // close-post //
  
  // open-redirect //
  { path: '**', component: NotFoundPageComponent }
  // close-redirect //


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
