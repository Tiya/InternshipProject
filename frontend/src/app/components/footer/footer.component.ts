import { Component, OnInit } from '@angular/core';
import {PostsModel} from '../../models/posts.model';
import {PostdataService}  from 'src/app/services/postdata.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {CategoryModel} from '../../models/category.model';
import {CategorydataService}  from 'src/app/services/categorydata.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  posts: PostsModel[]=[];
  categories: CategoryModel[]=[];
  constructor(private postdataService: PostdataService, private router:Router,
    public _authservice:AuthService, private categorydataService: CategorydataService) { }

  ngOnInit(): void {
    this.categorydataService.getCategories().subscribe((data)=>{
      this.categories=JSON.parse(JSON.stringify(data));
    })

    this.postdataService.getPosts().subscribe((data)=>{
      this.posts=JSON.parse(JSON.stringify(data));
      console.log(this.posts)
  
  })
  }
  singlePost(post:any)
  {
    console.log("single post clicked in footer:::::")
    localStorage.setItem("singlePostId", post._id.toString());
    this.router.navigate(['post']);
  }
}
