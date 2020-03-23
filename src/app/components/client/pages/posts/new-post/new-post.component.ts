import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

// --- open-firebase --- //
// --- close-firebase --- //

// --- open-models --- //
import { Post } from "../../../../../shared/models/post.model";
// --- close-models --- //

// --- open-services --- //
import { PostService } from 'src/app/shared/services/post.service';
import { AuthService } from 'src/app/shared/services/auth.service';
// --- open-services --- //

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public isAuth: boolean;

  submitted: boolean;

  postModel: Post = {
    description: '',
    user: {
      uid: '',
      name: '',
      email: '',
      photoURL: ''
    },
    likes: 0,
    comments: [
      { uid_user: '', message: '' }
    ],
    created_at: new Date()
  }

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCurrentAuth();
  }

  getCurrentAuth() {
    this.authService.isAuth().subscribe(
      auth => {
        if (auth) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    )
  }

  description = new FormControl('', [Validators.required]);
  getErrorsDescription() { return this.description.hasError('required') ? 'Description Required' : '' }

  // open-create-post //
  createPost() {

    if (this.postModel.description.length === 0 || this.postModel.description === '') return

    this.postService.createPost(this.postModel)

    setTimeout(() => {
      this.postModel.description = "";
    }, 2000);

  }
  // close-create-post //

  gotToLogin() {
    this.router.navigate(['/auth/signup']);
  }

}
