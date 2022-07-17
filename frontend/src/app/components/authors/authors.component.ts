import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthordataService } from 'src/app/services/authordata.service';
import { AuthorModel} from './authors.model'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  title:String = 'Author List';
  authors: AuthorModel[]=[];
  blob: Blob | undefined;

  thumbnail: any;
  authorimage:any;
   
  constructor(private authordataService: AuthordataService,
     private sanitizer: DomSanitizer, public _auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authordataService.getAuthors().subscribe((data)=>{
      this.authors=JSON.parse(JSON.stringify(data));
    })
  }

  onClick(author:any){
    localStorage.setItem("singleauthorId", author._id.toString());
    this.router.navigate(['author']);
    }
    
   
}
