import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { Role } from '../../core/enums/role.enum';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  items: SidebarItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    this.items = this.buildItemsByRole(role);
  }

  private buildItemsByRole(role: Role | null): SidebarItem[] {
    switch (role) {
      case Role.ADMIN:
        return [
          { label: 'Dashboard', icon: '📊', route: '/dashboard' },
          { label: 'Tickets', icon: '🎫', route: '/dashboard/tickets' },
          { label: 'Usuarios', icon: '👥', route: '/dashboard/usuarios' },
          { label: 'Perfil', icon: '👤', route: '/dashboard/perfil' }
        ];
      case Role.AGENT:
        return [
          { label: 'Dashboard', icon: '📊', route: '/dashboard' },
          { label: 'Tickets', icon: '🎫', route: '/dashboard/tickets' },
          { label: 'Perfil', icon: '👤', route: '/dashboard/perfil' }
        ];
      case Role.CLIENT:
        return [
          { label: 'Dashboard', icon: '📊', route: '/dashboard' },
          { label: 'Mis Tickets', icon: '🎫', route: '/dashboard/tickets' },
          { label: 'Perfil', icon: '👤', route: '/dashboard/perfil' }
        ];
      default:
        return [];
    }
  }
}