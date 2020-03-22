import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// --- open-components --- //

// open-auth //
import { HomeComponent } from '../components/client/pages/home/home.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { SignupComponent } from '../components/auth/signup/signup.component';
import { ProfileComponent } from '../components/client/account/profile/profile.component';
// close-auth //

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
  { path: 'account/profile', component: ProfileComponent, canActivate: [AuthGuard] }
  // close-account //

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
