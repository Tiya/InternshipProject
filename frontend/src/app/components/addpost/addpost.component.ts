import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PostsModel} from '../../models/posts.model';
import {PostdataService}  from 'src/app/services/postdata.service';
import {AuthService}  from 'src/app/services/auth.service';
import {CategoryModel} from '../../models/category.model';
import {CategorydataService}  from 'src/app/services/categorydata.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  title:String="Add Post";
  PostDetails= new PostsModel(0,"","","","","","");
  image: any
  author: any
  today: any = new Date();
  categories: CategoryModel[]=[];
  constructor(private postdataService: PostdataService, private router: Router, 
    private authservice: AuthService, private categorydataService: CategorydataService) { }

  ngOnInit(): void {
    this.categorydataService.getCategories().subscribe((data)=>{
      this.categories=JSON.parse(JSON.stringify(data));
 
    })
    
  }
  AddPost()
  {
    const formData = new FormData();
    
    formData.append('image', this.image)
    formData.append('postTitle', this.PostDetails.postTitle)
    formData.append('postCategory', this.PostDetails.postCategory)
    formData.append('postDescription', this.PostDetails.postDescription)
    formData.append('postDate',this.today)
    this.author = this.authservice.getUserName();
    formData.append('postAuthor', this.author)
    this.postdataService.newPost(formData);
    console.log("called");
    alert(this.PostDetails.postTitle+" is added successfully");
    this.router.navigate(['/posts']);
  }
  onImageSelect(event: any){
    const image=event.target.files[0];
    this.image=image;
  }
}
