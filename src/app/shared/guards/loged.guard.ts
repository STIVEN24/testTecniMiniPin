import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

// --- open-firebase --- //
import { AngularFireAuth } from "@angular/fire/auth";
// --- close-firebase --- //

@Injectable({
  providedIn: 'root'
})
export class LogedGuard implements CanActivate {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  canActivate() {

    return this.angularFireAuth.authState.pipe(
      map(
        auth => {
          if (isNullOrUndefined(auth)) {
            return true
          } else {
            this.router.navigate(['/']);
            return false;
          }
        }
      )
    )
  }

}
