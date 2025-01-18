import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserQuery } from '../query/user.query';

@Injectable({
  	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private userQuery: UserQuery) {}

  	canActivate(
    	route: ActivatedRouteSnapshot,
    	state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return !!this.userQuery.getUser();
  	} 
}
