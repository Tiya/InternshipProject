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
  categoryItem= {
    categoryName:'',
  }
  constructor(private categorydataService: CategorydataService, private router: Router) { }

  ngOnInit(): void {
  }
  AddCategory()
  {
    
    
    this.categoryItem.categoryName=this.CategoryDetails.categoryName;
    this.categorydataService.newCategory(this.categoryItem);
    console.log("add category ts", this.categoryItem);
    
    alert(this.CategoryDetails.categoryName+" is added successfully");
    this.router.navigate(['/categories']);
  }
}
