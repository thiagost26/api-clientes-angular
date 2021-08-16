import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(this.loginService.usuarioEstaAutenticado()) {
      return true;
    }

    this.router.navigate(['/login']);


    return false;
  }



}
