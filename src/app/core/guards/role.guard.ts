import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const allowedRoles = route.data['roles'] as Role[] | undefined;
    const userRole = this.authService.getUserRole();

    if (!allowedRoles || !userRole) {
      return this.router.createUrlTree(['/auth/login']);
    }

    if (allowedRoles.includes(userRole)) {
      return true;
    }

    return this.router.createUrlTree(['/dashboard']);
  }
}