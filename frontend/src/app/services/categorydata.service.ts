import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CategorydataService {

  constructor(private http:HttpClient) { }
  newCategory(formData: FormData){
    return this.http.post("http://localhost:3000/category/insertCategory",formData)
   .subscribe(data =>{console.log(data)})
 }
}
