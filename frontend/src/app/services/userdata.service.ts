import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http:HttpClient) { }
  getUser(id:any){
    console.log("in getuser details")
     return this.http.get("http://localhost:3000/api/"+id); 
  }
  getUsers(){
    return this.http.get("http://localhost:3000/api");
  }
  // delete a user
  deleteUser(id:any)
  {
     console.log("id to delete", id);
     return this.http.delete("http://localhost:3000/api/remove/"+id)
   // return this.http.delete("api/authors/remove/"+id)

  }
  //update a user
  editUser(user:any)
  {
    console.log('Author update')
    return this.http.put("http://localhost:3000/api/update",user)
  //  return this.http.put("api/authors/update",author)
    .subscribe(data =>{console.log(data)})
  }
}
