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
  public photoURL: string;
  public name: string;

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
      (auth: any) => {
        if (auth) {
          this.isAuth = true;
          this.getUser(auth.uid);
        } else {
          this.isAuth = false;
        }
      }
    )
  }

  getUser(userId: string) {

    this.authService.getUser(userId)
      .then((res: any) => {
        this.photoURL = res.photoURL;
        this.name= res.name;
      })
      .catch(err => console.log(err))

  }

  description = new FormControl('', [Validators.required]);
  getErrorsDescription() { return this.description.hasError('required') ? 'Description Required' : '' }

  // open-create-post //
  createPost() {

    if (this.postModel.description.length === 0 || this.postModel.description === '') return

    this.postService.createPost(this.postModel)
      .then(res => {
        this.postModel.description = "";
      })
      .catch(err => console.log(err))

    setTimeout(() => {

    }, 2000);

  }
  // close-create-post //

  gotToLogin() {
    this.router.navigate(['/auth/login']);
  }

}
