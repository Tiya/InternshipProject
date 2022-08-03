import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {CategoryModel} from '../../models/category.model';
import {CategorydataService}  from 'src/app/services/categorydata.service';
import {PostsModel} from '../../models/posts.model';
import {PostdataService}  from 'src/app/services/postdata.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
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
  constructor(private viewportScroller: ViewportScroller, private route:ActivatedRoute,
    private postdataService: PostdataService, private router:Router,
    public _authservice:AuthService, private categorydataService: CategorydataService) { }

  public onClick(elementId: string): void { 
    this.viewportScroller.scrollToAnchor(elementId);
  }

  ngOnInit(): void {
    this.postdataService.getPosts().subscribe((data)=>{
      this.posts=JSON.parse(JSON.stringify(data)); 
      console.log(this.posts);    
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
