import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PostdataService {

  constructor(private http:HttpClient) { }
  getPost(id:any){
    console.log("in getpost details")
     return this.http.get("http://localhost:3000/posts/"+id); 
  }
  getPostByCategory(postCategory:any){
    console.log("in getPostByCategory")
     return this.http.get("http://localhost:3000/posts/postCategory/"+postCategory); 
  }
  
   getPosts(){
     return this.http.get("http://localhost:3000/posts");  
   }
    newPost(formData: FormData){
     return this.http.post("http://localhost:3000/posts/insert",formData)
    .subscribe(data =>{console.log(data)})
  }

  // delete a post
  deletePost(id:any)
  {
  console.log("id to delete", id);
    return this.http.delete("http://localhost:3000/posts/remove/"+id)
  }
  //update a post
  editPost(formData:FormData)
  {
    console.log('post update')
    return this.http.put("http://localhost:3000/posts/update",formData)
    .subscribe(data =>{console.log(data)})
  }
}
