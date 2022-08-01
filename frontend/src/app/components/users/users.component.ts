import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserdataService } from 'src/app/services/userdata.service';
import { UserModel} from '../../models/users.model'
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
   
  constructor(private userdataService: UserdataService, public _auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.userdataService.getUsers().subscribe((data)=>{
      this.userslist=JSON.parse(JSON.stringify(data));
    })
  }
  editUser(user: any){
    console.log("in edit user button clicked", user._id.toString());
    localStorage.setItem("editUserId", user._id.toString());
    this.router.navigate(['/updateuser']);
  }
  deleteUser(user: any){
    if(confirm("Are you sure to delete "+ user.username+" ?")) {
      console.log(user._id);
      this.userdataService.deleteUser(user._id)
        .subscribe((data) => {
          this.userslist = this.userslist.filter(p => p !== user);
        });
        alert(user.username+" is deleted successfully");
        this.router.navigate(['users']);
      }
  }
}
