import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { uniq, flatten } from 'lodash'

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

  private uid: string;
  private email: string;

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {

    this.authService.userData.subscribe(
      userAuth => {
        if (userAuth) {
          this.uid = userAuth.uid;
          this.email = userAuth.email;
        }
      }
    );
    
  }

  // open-create-post //
  createPost(post: Post) {

    return this.angularFirestore.collection<Post>('posts').add(
      {
        user: {
          uid: this.uid,
          email: this.email
        },
        created_at: post.created_at,
        description: post.description,
        likes: 0,
        comments: [
          { uid_user: '', message: '' }
        ]
      }
    ).then(res => {return res})
    .catch(err => console.log(err))

  }
  // close-create-post //


  // open-get-posts //
  getPosts() {
    return this.angularFirestore.collection<Post>('posts', ref => ref.orderBy('created_at', 'desc')).snapshotChanges()
      .pipe(
        switchMap(
          (posts: any) => {
            const userIds = uniq(posts.map(post => post.payload.doc.data().user.uid))
            return combineLatest(
              of(posts),
              combineLatest(
                userIds.map(
                  userId => this.angularFirestore.collection<Auth>('users', ref => ref.where('uid', '==', userId)).valueChanges()
                    .pipe(
                      map(users => users[0]
                      )
                    )
                )
              )
            )
          }),
        map(([posts, users]) => {
          return posts.map(post => {
            return {
              ...post,
              user: users.find((a: any) => a.uid === post.payload.doc.data().user.uid)
            }
          })
        })
      )
  }
  // close-get-posts //

  // open-delete-post //
  deletePost(idPost: string) {
    return this.angularFirestore.collection('posts').doc(idPost).delete();
  }
  // close-delete-post //

}
