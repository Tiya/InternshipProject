import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserdataService } from 'src/app/services/userdata.service';
import { UserModel} from '../../models/users.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  userId: any
  userItem= {
    username:'',
    email:'',
    password:'',
    role:''
  }
  roles=["Admin", "Author"]
  constructor(private userdataService: UserdataService, public _auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("editUserId");
    console.log("editUserId", this.userId)
     this.userdataService.getUser(this.userId).subscribe((data)=>{
     this.userItem=JSON.parse(JSON.stringify(data));
     console.log(this.userItem)
   })
  }
  editUser()
  {    
    // this.userItem.id= this.categoryId;
    
   console.log(this.userItem.role)
    console.log(this.userItem.username)
    this.userdataService.editUser(this.userItem);
    //console.log(formData); 
    alert(this.userItem.username+" is updated successfully");
    this.router.navigate(['/users']);
  }
}
