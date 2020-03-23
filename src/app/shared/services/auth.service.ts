import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

// --- open-firebase --- //
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
// --- close-firebase --- //

import { Auth } from '../models/auth.model';
import { File } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // declare variables
  public userData: Observable<firebase.User>;
  private filePath: string

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private angularFirStorage: AngularFireStorage,
    private router: Router
  ) {
    this.userData = angularFireAuth.authState
  }

  getUser(uid: string) {
    return this.angularFirestore.doc(`users/${uid}`).ref
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("document no encontrado");
          return false;
        } else {
          return doc.data();
        }
      })
      .catch(err => console.log(err))
  }

  // --- open-signup --- //
  signup(data: any) {
    // open-create-user //
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
          const uid = res.user.uid;
          this.angularFirestore.collection('users').doc(res.user.uid).set({
            uid: uid,
            name: this.capitalize(data.name),
            lastname: this.capitalize(data.lastname),
            birth: data.birth,
            description: data.description,
            photoURL: data.photoURL
          })
          this.router.navigate(['/account/profile']);
          resolve(res)
        })
        .catch(err => reject(err))
    })
    // close-create-user //
  }
  // --- close-signup --- //

  // --- open-login --- //
  login(data: any) {

    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(data.email, data.password).then(user => {
        this.router.navigate(['/account/profile']);
        resolve(user);
      }).catch(err => reject(err));
    });
  }
  // --- close-login --- //

  // --- open-logged --- //
  isAuth() {
    return this.userData.pipe(map(auth => auth))
  }
  // --- close-logged --- //

  // --- close-logout --- //
  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/auth/login']);
  }
  // --- close-logout --- //

  // --- open-update-profile --- //
  updateProfile(user: Auth) {
    return new Promise((resolve, reject) => {
      this.angularFirestore.doc(`users/${user.uid}`).ref
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("document no encontrado");
            return false;
          } else {
            console.log("User updated");
            this.angularFirestore.collection('users').doc(user.uid).update(user);
            this.angularFireAuth.auth.currentUser.updateProfile(
              {
                photoURL: user.photoURL
              }
            )
          }
          resolve(doc)
        })
        .catch(err => reject(err))
    })
  }
  // --- close-update-profile --- //

  // --- open-pre-update-profile --- //
  preUpdateProfile(user: Auth, img?: File) {
    if (img) {
      console.log("Con img");
      this.uploadImgProfile(user, img)
    } else {
      console.log("sin img");
      this.updateProfile(user)
    }
  }
  // --- close-pre-update-profile --- //

  // --- open-upload-image-profile --- //
  private uploadImgProfile(user: Auth, img: File) {
    this.filePath = `media/img/avatars/${img.name}`;
    const fileRef = this.angularFirStorage.ref(this.filePath);
    const task = this.angularFirStorage.upload(this.filePath, img);
    task.snapshotChanges()
      .pipe(
        finalize(
          () => {
            fileRef.getDownloadURL().subscribe(urlImg => {
              user.photoURL = urlImg;
              this.updateProfile(user)
            })
          }
        )
      ).subscribe();
  }
  // --- close-upload-image-profile --- //


  // open-function-toUpperCase //
  capitalize(string) {
    if (!string) return string;
    return string[0].toUpperCase() + string.substr(1).toLowerCase();
  }
  // close-function-toUpperCase //

}
