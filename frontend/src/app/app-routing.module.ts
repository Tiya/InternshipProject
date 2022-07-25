import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddpostComponent } from './components/addpost/addpost.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UpdatebookComponent } from './components/updatebook/updatebook.component';
import { HasRoleGuard } from './has-role.guard';
import { GenresComponent } from './components/genres/genres.component';
import { UpdateauthorComponent } from './components/updateauthor/updateauthor.component';
import { UsersComponent } from './components/users/users.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import {PostsComponent} from './components/posts/posts.component';
import{PostComponent} from './components/post/post.component';
import{CategoriesComponent} from './components/categories/categories.component';
import { UpdatepostComponent } from './components/updatepost/updatepost.component';

const routes: Routes = [{path:'',redirectTo: 'home', pathMatch: 'full' },
{path:'home',component:HomeComponent},
{path:'login',component:LoginComponent},
// {
//   path:'updatepost',
//   component:UpdatepostComponent, 
//   canActivate:[AuthGuard, HasRoleGuard],
//   data:{
//     roles: ['SuperAdmin', 'Admin']
//   }
// },
{
  path:'updateauthor',
  component:UpdateauthorComponent, 
  canActivate:[AuthGuard, HasRoleGuard],
  
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
  path:'post',component: PostComponent, 
  canActivate:[AuthGuard]
},
{
  path:'posts',component:PostsComponent
,canActivate:[AuthGuard]
},
{
  path:'updatepost',component: UpdatepostComponent, 
  canActivate:[AuthGuard]
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
{path:'categories',component:CategoriesComponent
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
