import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get("http://localhost:3000/api");
  }
  // delete a author
  deleteUsers(id:any)
  {
console.log("id to delete", id);
    // return this.http.delete("http://localhost:3000/authors/remove/"+id)
    return this.http.delete("api/authors/remove/"+id)

  }
  //update a author
  editUsers(author:any)
  {
    console.log('Author update')
    // return this.http.put("http://localhost:3000/authors/update",author)
    return this.http.put("api/authors/update",author)
    .subscribe(data =>{console.log(data)})
  }
}
