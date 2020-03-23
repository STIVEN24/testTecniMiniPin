import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


// --- open-firebase --- //
import { AngularFirestore } from "@angular/fire/firestore";
// --- close-firebase --- //

// --- open-models --- //
import { Post } from '../models/post.model';
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
    if (post.description == "" || post.description.length === 0) return false;
    this.authService.userData.subscribe(
      userAuth => {
        this.authService.getUser(userAuth.uid)
          .then(
            (user: any) => {
              this.angularFirestore.collection('posts').add(
                {
                  user: {
                    uid: userAuth.uid,
                    email: userAuth.email
                  },
                  created_at: post.created_at,
                  description: post.description,
                  likes: 0,
                  comments: [
                    { uid_user: '', message: '' }
                  ]
                }
              ).then(ref => {
                return ref.id;
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

    return this.angularFirestore.collection('posts', ref => ref.orderBy('created_at', 'desc')).snapshotChanges()
      .pipe(
        map(
          posts => {
            return posts.map(a => {
              return a;
            })
          }
        )
      )
    // return this.angularFirestore.collection('posts', ref => ref.orderBy('created_at', 'desc')).valueChanges().pipe(
    //   map((arr: any) => {
    //     return arr
    //   })
    // )
  }
  // close-get-post //

  deletePost(idPost: string) {
    return this.angularFirestore.collection('posts').doc(idPost).delete();
  }

}
