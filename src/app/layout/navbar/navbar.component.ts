import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  isLoggingOut = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  onProfileClick(): void {
    this.router.navigate(['/dashboard/perfil']);
  }

  onLogoutClick(): void {
    this.isLoggingOut = true;

    this.authService.logout().subscribe({
      next: () => {
        this.isLoggingOut = false;
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        // Aunque falle la petición, AuthService ya limpió la sesión local.
        this.isLoggingOut = false;
        this.router.navigate(['/auth/login']);
      }
    });
  }
}