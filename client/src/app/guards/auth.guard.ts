import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    console.log('dd', currentUser);
    if (currentUser) {
      return true;
    }
    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    this.router.navigate(['/login']);
    return false;
  }
}
