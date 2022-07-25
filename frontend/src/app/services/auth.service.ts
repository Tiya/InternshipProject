import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel } from '../components/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _signupUrl ="http://localhost:3000/api/signup"
  private _loginUrl ="http://localhost:3000/api/login"
  // private _signupUrl ="api/signup"
  // private _loginUrl ="api/login"
  constructor(private http:HttpClient,
    private _router:Router) { 
    }
  

  registeringUser(user:any){
    return this.http.post<any>(this._signupUrl, user)
  }

  loggingUser(user:any){
    console.log("user:::", user);
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  loggedOutUser(){
    window.localStorage.clear()
    this._router.navigate(['/home']);
  }
  getToken(){
    console.log('Hi GetToken');
    return localStorage.getItem('token');
  }
getUserName(){
  var token=localStorage.getItem('token')||"";
  var parse = atob(token.split('.')[1])
 var _roleAccess= JSON.parse(parse);
  localStorage.setItem('loginUserName', _roleAccess.subject.username);
  return localStorage.getItem('loginUserName');
}
checkAuthorAndUserSame(authorName : any){
  var loginUser = this.getUserName();  
  if(loginUser==authorName)
  console.log("author and user same");
  return (authorName==loginUser)? true:false;
}
  SuperAdminAccess(){
    var token=localStorage.getItem('token')||"";
    var parse = atob(token.split('.')[1])
   var _roleAccess= JSON.parse(parse);
  
   if((_roleAccess.subject.role ==="SuperAdmin")||(_roleAccess.subject.email=='admin@domain.com'&&_roleAccess.subject.password =="admin1234")){
     console.log('Hello Super Admin')
     console.log(_roleAccess.subject.role)
     return true
   }
   console.log(_roleAccess.subject.role)
  //  alert('No access')
   return false
  }
  AdminAccess(){
    var token=localStorage.getItem('token')||"";
    var parse = atob(token.split('.')[1])
   var _roleAccess= JSON.parse(parse);
   if(_roleAccess.subject.role ==="Admin"){
     console.log('Hello Admin')
     console.log(_roleAccess.subject.role)
     return true
   }
   console.log(_roleAccess.subject.role)
  //  alert('No access')
   return false
  }

}
