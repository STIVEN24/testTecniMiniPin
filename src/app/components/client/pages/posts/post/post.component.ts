import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { uniq, flatten } from 'lodash'
import { Router } from '@angular/router'

// --- open-services --- //
import { PostService } from 'src/app/shared/services/post.service';
import { AuthService } from 'src/app/shared/services/auth.service';
// --- close-services --- //

// --- open-models --- //
import { Post } from 'src/app/shared/models/post.model';
import { Auth } from 'src/app/shared/models/auth.model';
// --- close-models --- //

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  all$: Observable<{ posts: Post[], users: Auth[] }>

  joined: Observable<any>;

  private isAuth: boolean

  spinnerToggleLoadingPosts: boolean;
  authUserUid: string;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {
    this.spinnerToggleLoadingPosts = false
  }

  ngOnInit() {
    this.getCurrentAuth();
    this.initPosts();

    this.authService.userData.subscribe(
      user => {
        this.authUserUid = user.uid
      }
    )
  }

  getCurrentAuth() {
    this.authService.isAuth().subscribe(
      (auth: any) => {
        if (auth) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    )
  }

  initPosts() {
    this.spinnerToggleLoadingPosts = true
    this.postService.getPosts().subscribe(
      res => {
        this.joined = res;
        this.spinnerToggleLoadingPosts = false
      },
      err => console.log(err)
    )

    

    // this.angularFirestore.collection<Post>('posts', ref => ref.orderBy('created_at', 'desc')).snapshotChanges()
    //   .pipe(
    //     switchMap(
    //       (posts: any) => {
    //         const userIds = uniq(posts.map(post => post.payload.doc.data().user.uid))
    //         return combineLatest(
    //           of(posts),
    //           combineLatest(
    //             userIds.map(
    //               userId => this.angularFirestore.collection<Auth>('users', ref => ref.where('uid', '==', userId)).valueChanges()
    //                 .pipe(
    //                   map(users => users[0]
    //                   )
    //                 )
    //             )
    //           )
    //         )
    //       }),
    //     map(([posts, users]) => {
    //       return posts.map(post => {
    //         return {
    //           ...post,
    //           user: users.find((a: any) => a.uid === post.payload.doc.data().user.uid)
    //         }
    //       })
    //     })
    //   )

    // first method
    // this.all$ = combineLatest(
    //   this.angularFirestore.collection<Post>('posts').valueChanges(),
    //   this.angularFirestore.collection<Auth>('users').valueChanges()
    // ).pipe(
    //   map(
    //     ([posts, users]) => {
    //       return { users, posts }
    //     }
    //   )
    // )
    // first method

    // second method

    // second method



    // this.postService.getPosts().subscribe(
    //   (res: any) => {

    //     console.log(res);

    //     this.posts = res




    // res.forEach(post => {

    //   this.authService.getUser(post.payload.doc.data().user.uid)
    //     .then(
    //       (user: any) => {
    //         this.posts.push({
    //           id_post: post.payload.doc.id,
    //           comments: post.payload.doc.data().comments,
    //           description: post.payload.doc.data().description,
    //           created_at: post.payload.doc.data().created_at,
    //           likes: post.payload.doc.data().likes,
    //           user: user
    //         })
    //       }
    //     )
    //     .catch(err => console.log(err));
    // });

    //   },
    //   err => console.log(err)
    // );




    // }

    // get orderByDescPosts() {
    // return this.posts.sort((a, b) => {
    // console.log(a);
    // var d = new Date(null);
    // d.setTime(b.created_at.seconds * 1000);
    // console.log(d);
    // var d = new Date(null);
    // d.setTime(a.created_at.seconds * 1000);
    // console.log(d.toLocaleString());
    // console.log(a.created_at.seconds * 1000);
    //   return <any>new Date(b.created_at.seconds) - <any>new Date(a.created_at.seconds);
    // });
  }


  // --- open-delete-post --- //
  deletePost(id_post: string) {
    this.spinnerToggleLoadingPosts = true
    this.postService.deletePost(id_post).then(
      res => {
        this.spinnerToggleLoadingPosts = false
      },
      err => console.log(err)
    );
  }
  // --- close-delete-post --- //

  // --- open-got-to-login --- //
  gotToLogin() {
    this.router.navigate(['/auth/login']);
  }
  // --- close-got-to-login --- //


}
