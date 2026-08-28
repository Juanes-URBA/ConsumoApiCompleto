import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { Role } from '../../../../core/enums/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.redirectByRole();
      },
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    });
  }

  private redirectByRole(): void {
    const role = this.authService.getUserRole();

    switch (role) {
      case Role.ADMIN:
      case Role.AGENT:
      case Role.CLIENT:
        // La ruta real de cada dashboard se conecta en el Avance 4 (layout + dashboard).
        this.router.navigate(['/dashboard']);
        break;
      default:
        this.router.navigate(['/auth/login']);
    }
  }
}