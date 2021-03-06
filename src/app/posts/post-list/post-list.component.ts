import { OnDestroy, OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { PostService } from '../post-service/post.service';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts=[
  //   {title:"first post",content:"this is 1st post"},
  //   {title:"second post",content:"this is 2nd post"},
  //   {title:"third post",content:"this is 3rd post"}
  // ]

  //@Input() posts:Post[]=[];

  isLoading:boolean=false;
  posts: Post[] = [];
  postSub: Subscription | undefined;

  constructor(public postService: PostService) {}

  ngOnInit() {
    this.isLoading=true;
     this.postService.getPosts();
    this.postSub = this.postService
      .getPostUpdateListener()
      .subscribe((post: Post[]) => {
        this.isLoading=false;
        this.posts = post;
      });
  }

  onDelete(postId:string){
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSub?.unsubscribe();
  }
}
