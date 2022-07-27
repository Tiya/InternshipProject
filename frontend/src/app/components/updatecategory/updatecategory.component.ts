import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {CategorydataService}  from 'src/app/services/categorydata.service';
import {AuthService}  from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css']
})
export class UpdatecategoryComponent implements OnInit {
  categories: CategoryModel[]=[];
  categoryId: any
  categoryItem= {
    id:'',
    categoryName:'',
  }
  constructor( private router:Router, 
    private categorydataService: CategorydataService,   private authservice: AuthService) { }

  ngOnInit(): void {
    this.categoryId = localStorage.getItem("editCategoryId");
   console.log("editCategoryId", this.categoryId)
    this.categorydataService.getCategory(this.categoryId).subscribe((data)=>{
    this.categoryItem=JSON.parse(JSON.stringify(data));
    console.log(this.categoryItem)
  })
  }
  editCategory()
  {    
    this.categoryItem.id= this.categoryId;
    
    console.log(this.categoryItem.id)
    console.log(this.categoryItem.categoryName)
    this.categorydataService.editCategory(this.categoryItem);
    //console.log(formData); 
    alert(this.categoryItem.categoryName+" is updated successfully");
    this.router.navigate(['/categories']);
  }
}
