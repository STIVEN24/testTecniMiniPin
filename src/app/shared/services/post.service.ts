import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


// --- open-firebase --- //
import { AngularFirestore } from "@angular/fire/firestore";
// --- close-firebase --- //

// --- open-models --- //
import { Post } from '../models/post.model';
import { Auth } from '../models/auth.model';
// --- close-models --- //

// --- open-services --- //
import { AuthService } from './auth.service';
// --- close-services --- //

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) { }

  // open-create-post //
  createPost(post: Post) {
    this.authService.userData.subscribe(
      user => {
        this.authService.getUser(user.uid)
          .then(
            (user: any) => {
              this.angularFirestore.collection('posts').add(
                {
                  user: {
                    uid: user.uid,
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname,
                    photoURL: user.photoURL
                  },
                  created_at: post.created_at,
                  description: post.description,
                  likes: 0,
                  comments: [
                    { uid_user: '', message: '' }
                  ]
                }
              ).then(ref => {
                console.log(ref.id);
              })
            }
          )
          .catch(err => console.log(err));
      }
    );
  }
  // close-create-post //

  // open-get-post //
  getPosts() {

    return this.angularFirestore.collection('posts', ref => ref.orderBy('created_at', 'desc')).valueChanges().pipe(
      map((arr: any) => {
        return arr
      })
    )
  }
  // close-get-post //
}
