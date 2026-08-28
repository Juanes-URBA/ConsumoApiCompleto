import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../../core/services/user.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { User } from '../../../../core/interfaces/user.interface';
import { Role } from '../../../../core/enums/role.enum';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  errorMessage = '';
  roleOptions = Object.values(Role);
  updatingUserId: string | null = null;

  // Estado del ConfirmDialog
  pendingChange: { user: User; newRole: Role } | null = null;

  constructor(private userService: UserService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  onRoleSelect(user: User, newRole: Role): void {
    if (newRole === user.role) {
      return;
    }

    // En vez de aplicar el cambio de inmediato, se pide confirmación visual
    // (reemplaza al confirm() nativo del navegador).
    this.pendingChange = { user, newRole };
  }

  onConfirmRoleChange(): void {
    if (!this.pendingChange) {
      return;
    }

    const { user, newRole } = this.pendingChange;
    this.updatingUserId = user.id;
    this.pendingChange = null;

    this.userService.updateUserRole(user.id, { role: newRole }).subscribe({
      next: (updatedUser) => {
        user.role = updatedUser.role;
        this.updatingUserId = null;
        this.toastService.show(`Rol de ${user.name} actualizado a ${newRole}.`);
      },
      error: (error: Error) => {
        this.updatingUserId = null;
        this.toastService.show(error.message, 'error');
      }
    });
  }

  onCancelRoleChange(): void {
    this.pendingChange = null;
  }

  private loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }
}