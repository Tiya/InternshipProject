import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddpostComponent } from './components/addpost/addpost.component';
import { AuthorComponent } from './components/author/author.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BookComponent } from './components/book/book.component';
import { BooksComponent } from './components/books/books.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UpdatebookComponent } from './components/updatebook/updatebook.component';
import { HasRoleGuard } from './has-role.guard';
import { GenresComponent } from './components/genres/genres.component';
import { UpdateauthorComponent } from './components/updateauthor/updateauthor.component';
import { UsersComponent } from './components/users/users.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';

const routes: Routes = [{path:'',redirectTo: 'home', pathMatch: 'full' },
{path:'home',component:HomeComponent},
{path:'login',component:LoginComponent},
{
  path:'update',
  component:UpdatebookComponent, 
  canActivate:[AuthGuard, HasRoleGuard],
  data:{
    roles: ['SuperAdmin', 'Admin']
  }
},
{
  path:'updateauthor',
  component:UpdateauthorComponent, 
  canActivate:[AuthGuard, HasRoleGuard],
  data:{
    roles: ['SuperAdmin', 'Admin']
  }
},
{
  path:'login',
  component:HomeComponent
},
{
  path:'users',
  component:UsersComponent, 
  canActivate:[AuthGuard, HasRoleGuard],
  data:{
    roles: ['SuperAdmin']
  }
},
{
  path:'book',component:BookComponent, 
  canActivate:[AuthGuard]
},
{
  path:'books',component:BooksComponent
,canActivate:[AuthGuard]
},
{
  path:'addpost',
  component:AddpostComponent,
  canActivate:[AuthGuard] 
},
{
  path:'addcategory',
  component:AddcategoryComponent,
  canActivate:[AuthGuard], 
},
{path:'dashboard',component:DashboardComponent
,canActivate:[AuthGuard]
},
{path:'genres',component:GenresComponent
,canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
