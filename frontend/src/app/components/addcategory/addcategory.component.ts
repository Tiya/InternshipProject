import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {PostdataService}  from 'src/app/services/postdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  title:String="Add Category";
  CategoryDetails= new CategoryModel(0,"");
  constructor(private postdataService: PostdataService, private router: Router) { }

  ngOnInit(): void {
  }
  AddCategory()
  {
    const formData = new FormData();
    
    formData.append('categoryName', this.CategoryDetails.categoryName)
    this.postdataService.newCategory(formData);
    console.log("add category ts");
    alert(this.CategoryDetails.categoryName+" is added successfully");
    this.router.navigate(['/posts']);
  }
}
