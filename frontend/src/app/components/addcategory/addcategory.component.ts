import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {CategorydataService}  from 'src/app/services/categorydata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  title:String="Add Category";
  CategoryDetails= new CategoryModel(0,"");
  constructor(private categorydataService: CategorydataService, private router: Router) { }

  ngOnInit(): void {
  }
  AddCategory()
  {
    const formData = new FormData();
    
    formData.append('categoryName', this.CategoryDetails.categoryName)
    this.categorydataService.newCategory(formData);
    console.log("add category ts");
    alert(this.CategoryDetails.categoryName+" is added successfully");
    this.router.navigate(['/posts']);
  }
}
