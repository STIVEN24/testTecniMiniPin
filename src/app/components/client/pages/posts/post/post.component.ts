import { Component, OnInit } from '@angular/core';

// --- open-services --- //
import { PostService } from 'src/app/shared/services/post.service';
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

  posts: Post[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {    
    this.postService.getPosts().subscribe(
      (res : any) => {
        this.posts = res;
      },
      err => console.log(err)
    );
  }

}
