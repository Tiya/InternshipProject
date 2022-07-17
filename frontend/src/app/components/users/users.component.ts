import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserdataService } from 'src/app/services/userdata.service';
import { UserModel} from './users.model'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title:String = 'Author List';
  userslist: UserModel[]=[];
  
  thumbnail: any;
  authorimage:any;
   
  constructor(private userdataService: UserdataService, private sanitizer: DomSanitizer, public _auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.userdataService.getUsers().subscribe((data)=>{
      this.userslist=JSON.parse(JSON.stringify(data));
    })
  }
  onClick(user:any){
    localStorage.setItem("singleauthorId", user._id.toString());
    this.router.navigate(['user']);
    }
}
