import { Component, OnInit } from '@angular/core';
import { PostdataService } from 'src/app/services/postdata.service';
import { Router } from '@angular/router';
import {CategoryModel} from '../../models/category.model';
import {CategorydataService}  from 'src/app/services/categorydata.service';
import {AuthService}  from 'src/app/services/auth.service';

@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css']
})
export class UpdatepostComponent implements OnInit {
  postItem= {
    postTitle:'',
    postAuthor:'',
    postCategory:'',
    postDescription:'',
    postImagePath:'',
    postDate:''
    }
    image: any
    author: any
    today: any = new Date();
    categories: CategoryModel[]=[];
    postId: any
  constructor(private postdataService: PostdataService, private router:Router, 
     private categorydataService: CategorydataService,   private authservice: AuthService) { }

  ngOnInit(): void {
    this.postId = localStorage.getItem("editPostId");
    console.log("postId in update component:::::", this.postId);
    this.postdataService.getPost(this.postId).subscribe((data)=>{
    this.postItem=JSON.parse(JSON.stringify(data));
    console.log("postId in update component:::::", this.postItem.postTitle);
    this.categorydataService.getCategories().subscribe((data)=>{
      this.categories=JSON.parse(JSON.stringify(data));
 
    })
  })
  }
  editPost()
  {    
    const formData = new FormData();
    formData.append('_id', this.postId)
    formData.append('image', this.image)
    formData.append('postTitle', this.postItem.postTitle)
    formData.append('postCategory', this.postItem.postCategory)
    formData.append('postDescription', this.postItem.postDescription)
    this.postItem.postDate=this.today;
    formData.append('postDate', this.postItem.postDate)
    this.author = this.authservice.getUserName();
    this.postItem.postAuthor=this.author;
    formData.append('postAuthor', this.postItem.postAuthor)

    
   console.log(this.postItem); 
   // this.postItem.postDate=this.today;
  //  this.author = this.authservice.getUserName();
  //  this.postItem.postAuthor=this.author;

  //  this.postdataService.editPost(this.postItem); 
  console.log(formData); 
  this.postdataService.editPost(formData);
  
    alert(this.postItem.postTitle+" is updated successfully");
    this.router.navigate(['/posts']);
  }

  onImageSelect(event: any){
    const image=event.target.files[0];
    this.image=image;
  }
}
