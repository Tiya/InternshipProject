import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PostsModel} from '../../models/posts.model';
import {PostdataService}  from 'src/app/services/postdata.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  title:String = 'Blog List';

  posts: PostsModel[]=[];
  myPDF: Uint8Array | undefined;
  blob: Blob | undefined;
  thumbnail: any;
  postImage:any;

  constructor(private postdataService: PostdataService, private router:Router,public _authservice:AuthService) { }

  ngOnInit(): void {
    this.postdataService.getPosts().subscribe((data)=>{
      this.posts=JSON.parse(JSON.stringify(data)); 
      console.log(this.posts);    
    })
  }
  singlePost(post:any)
  {
    localStorage.setItem("singlePostId", post._id.toString());
    this.router.navigate(['post']);
  }
  editPost(post: any){

  }
  deletePost(post: any){
    if(confirm("Are you sure to delete "+post.postTitle+" ?")) {
      console.log(post._id);
      this.postdataService.deletePost(post._id)
        .subscribe((data) => {
          this.posts = this.posts.filter(p => p !== post);
        });
        alert(post.postTitle+" is deleted successfully");
        this.router.navigate(['posts']);
      }
  }
}
