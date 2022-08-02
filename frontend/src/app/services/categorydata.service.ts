import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CategorydataService {

  constructor(private http:HttpClient) { }
  getCategory(id:any){
    console.log("in getpost details")
     return this.http.get("http://localhost:3000/category/"+id); 
  }
  getCategories(){
    console.log("in getCategories::::::")
    return this.http.get("http://localhost:3000/category/");  
  }
  newCategory(category:any){
    console.log("in newCategories::::::", category)
    return this.http.post("http://localhost:3000/category/insertCategory",category)
   .subscribe(data =>{console.log(data)})
 }
 deleteCategory(id:any){
  console.log("id to delete", id);
  return this.http.delete("http://localhost:3000/category/remove/"+id)
 }
 editCategory(category:any){
  console.log('categoryName update')
  return this.http.put("http://localhost:3000/category/update",category)
  .subscribe(data =>{console.log(data)})
 }
}
