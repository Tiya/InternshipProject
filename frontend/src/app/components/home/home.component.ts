import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CategoryModel} from '../../models/category.model';
import {CategorydataService}  from 'src/app/services/categorydata.service';
import {PostsModel} from '../../models/posts.model';
import {PostdataService}  from 'src/app/services/postdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

   registerUserData :any = {};
   posts: PostsModel[]=[];
  
   postImage:any;
   categories: CategoryModel[]=[];
  constructor(private viewportScroller: ViewportScroller,
    private _router: Router, private _auth: AuthService, private postdataService: PostdataService, 
     private categorydataService: CategorydataService) {}

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
      console.log(this.categories);
    })
  }
  registerUser(){
    this._auth.registeringUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token',res.token);
        this._router.navigate(['/dashboard']);
      },
      err => console.log(err) 
    )
  }
  
  singlePost(post:any)
  {
    console.log("clicked:::::::")
    localStorage.setItem("singlePostId", post._id.toString());
    this._router.navigate(['post']);
  } 
}
