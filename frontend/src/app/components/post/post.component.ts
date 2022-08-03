import { Component, OnInit } from '@angular/core';
import {PostsModel} from '../../models/posts.model';
import {PostdataService}  from 'src/app/services/postdata.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {CategoryModel} from '../../models/category.model';
import {CategorydataService}  from 'src/app/services/categorydata.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private postdataService: PostdataService, private router:Router,
    public _authservice:AuthService,  private categorydataService: CategorydataService) { }
  posts: PostsModel[]=[];
  postItem= {
    postTitle:'',
    postAuthor:'',
    postCategory:'',
    postDescription:'',
    postImagePath:'',
    postDate:''
    }
    categories: CategoryModel[]=[];
  ngOnInit(): void {
    let postId = localStorage.getItem("singlePostId");
    this.postdataService.getPost(postId).subscribe((data)=>{
    this.postItem=JSON.parse(JSON.stringify(data));
    console.log(this.postItem)

  })
  this.postdataService.getPosts().subscribe((data)=>{
    this.posts=JSON.parse(JSON.stringify(data));
    console.log(this.posts)

    const sortedPosts = this.posts.sort((a: any, b: any) => a.postDate - b.postDate)
    console.log("sortedPosts::::",sortedPosts)

})

this.categorydataService.getCategories().subscribe((data)=>{
  this.categories=JSON.parse(JSON.stringify(data));
})
}
singlePost(post:any)
  {
    localStorage.setItem("singlePostId", post._id.toString());
    this.router.navigate(['post']);
  }
}