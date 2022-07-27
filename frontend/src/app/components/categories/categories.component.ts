import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {CategorydataService}  from 'src/app/services/categorydata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  title:String="Update Category";
  CategoryDetails= new CategoryModel(0,"");
  categories: CategoryModel[]=[];
  constructor(private categorydataService: CategorydataService, private router: Router) { }

  ngOnInit(): void {
    this.categorydataService.getCategories().subscribe((data)=>{
      this.categories=JSON.parse(JSON.stringify(data));
    console.log(this.categories);
    })
  }
editCategory(category: any){
    console.log("in edit post button clicked", category._id.toString());
    localStorage.setItem("editCategoryId", category._id.toString());
    this.router.navigate(['/updatecategory']);
}

deleteCategory(category: any){
  if(confirm("Are you sure to delete "+category.categoryName+" ?")) {
    console.log(category._id);
    this.categorydataService.deleteCategory(category._id)
      .subscribe((data) => {
        this.categories = this.categories.filter(p => p !== category);
      });
      alert(category.categoryName+" is deleted successfully");
      this.router.navigate(['categories']);
    }
}
}
