import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private authService:AuthService,private _route:Router){
  }
  canActivate(route: ActivatedRouteSnapshot){
    if(this.authService.SuperAdminAccess())
    return this.isAuthorized(route);
    else
    {
      this._route.navigate(['/dashboard'])
      return false 
    }
  }
  private isAuthorized(route: ActivatedRouteSnapshot): boolean{
    const Userroles= ['Admin', 'SuperAdmin', 'Author'];
    const roles = route.data.roles;
    const roleMatches = Userroles.findIndex(role=> roles.indexOf(role) !== -1);
    return (roleMatches <= 0)? false: true;
  }
}
