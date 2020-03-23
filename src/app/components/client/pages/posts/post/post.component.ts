import { Component, OnInit } from '@angular/core';

// --- open-services --- //
import { PostService } from 'src/app/shared/services/post.service';
import { AuthService } from 'src/app/shared/services/auth.service';
// --- close-services --- //

// --- open-models --- //
import { Post } from 'src/app/shared/models/post.model';
// --- close-models --- //

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts = [];
  spinnerToggleLoadingPosts: boolean;
  authUserUid: string;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initPosts();

    this.authService.userData.subscribe(
      user => {
        this.authUserUid = user.uid
      }
    )


  }

  initPosts() {

    this.postService.getPosts().subscribe(
      (res: any) => {

        this.posts = [];


        res.forEach(post => {

          this.authService.getUser(post.payload.doc.data().user.uid)
            .then(
              (user: any) => {
                this.posts.push({
                  id_post: post.payload.doc.id,
                  comments: post.payload.doc.data().comments,
                  description: post.payload.doc.data().description,
                  created_at: post.payload.doc.data().created_at,
                  likes: post.payload.doc.data().likes,
                  user: user
                })
              }
            )
            .catch(err => console.log(err));
        });

      },
      err => console.log(err)
    );
  }

  get orderByDescPosts() {
    return this.posts.sort((a, b) => {
      // console.log(a);
      // var d = new Date(null);
      // d.setTime(b.created_at.seconds * 1000);
      // console.log(d);
      // var d = new Date(null);
      // d.setTime(a.created_at.seconds * 1000);
      // console.log(d.toLocaleString());
      // console.log(a.created_at.seconds * 1000);
      return <any>new Date(b.created_at.seconds) - <any>new Date(a.created_at.seconds);
    });
  }


  // --- open-delete-post --- //
  deletePost(id_post: string) {
    this.spinnerToggleLoadingPosts = true
    this.postService.deletePost(id_post).then(
      res => {
        this.posts = [];
        this.initPosts();
        console.log("Deleted")
        setTimeout(() => {
          this.spinnerToggleLoadingPosts = false
        }, 2000);
      },
      err => console.log(err)
    );
  }
  // --- close-delete-post --- //


}
