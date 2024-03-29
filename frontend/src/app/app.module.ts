import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BooksComponent } from './components/books/books.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UpdatebookComponent } from './components/updatebook/updatebook.component';
import { GenresComponent } from './components/genres/genres.component';
import { AuthorComponent } from './components/author/author.component';
import { BookComponent } from './components/book/book.component';
import { UpdateauthorComponent } from './components/updateauthor/updateauthor.component';
import { AuthGuard } from './auth.guard';
import { HasRoleGuard } from './has-role.guard';
import { UsersComponent } from './components/users/users.component';
import { AddpostComponent } from './components/addpost/addpost.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UpdatepostComponent } from './components/updatepost/updatepost.component';
import { UpdatecategoryComponent } from './components/updatecategory/updatecategory.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import { SingleCategoryPostsComponent } from './components/single-category-posts/single-category-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    AddbookComponent,
    BooksComponent,
    AuthorsComponent,
    UpdatebookComponent,
    GenresComponent,
    AuthorComponent,
    BookComponent,
    UpdateauthorComponent,
    UsersComponent,
    AddpostComponent,
    AddcategoryComponent,
    PostsComponent,
    PostComponent,
    CategoriesComponent,
    UpdatepostComponent,
    UpdatecategoryComponent,
    UpdateuserComponent,
    SingleCategoryPostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,AuthGuard,HasRoleGuard,{
    provide : HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
