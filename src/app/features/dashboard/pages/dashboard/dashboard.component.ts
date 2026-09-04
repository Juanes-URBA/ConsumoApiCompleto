import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../core/services/auth.service';
import { TicketService } from '../../../../core/services/ticket.service';
import { UserService } from '../../../../core/services/user.service';
import { Role } from '../../../../core/enums/role.enum';
import { TicketStatus } from '../../../../core/enums/ticket-status.enum';

interface DashboardStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  unassigned: number;
  assignedToMe: number;
  totalUsers: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role: Role | null = null;
  roleEnum = Role;
  isLoadingStats = false;

  stats: DashboardStats = {
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    unassigned: 0,
    assignedToMe: 0,
    totalUsers: 0
  };

  constructor(
    private authService: AuthService,
    private ticketService: TicketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    this.loadStats();
  }

  private loadStats(): void {
    this.isLoadingStats = true;

    // No existe un endpoint de estadísticas agregadas en la API, así que
    // se calculan aquí a partir de la lista real de tickets. GET /tickets
    // ya viene filtrado por rol desde el backend, así que el conteo sale
    // correcto automáticamente para cada rol sin lógica adicional.
    // limit=100 cubre el tamaño real de datos de esta API educativa;
    // si el volumen de tickets creciera mucho, esto habría que paginarlo.
    this.ticketService
      .getTickets({ status: null, priority: null, page: 1, limit: 50 })
      .subscribe({
        next: (response) => {
          const tickets = response.data;
          const currentUserId = this.authService.getCurrentUser()?.id;

          this.stats.total = response.meta.total;
          this.stats.open = tickets.filter((t) => t.status === TicketStatus.OPEN).length;
          this.stats.inProgress = tickets.filter((t) => t.status === TicketStatus.IN_PROGRESS).length;
          this.stats.resolved = tickets.filter((t) => t.status === TicketStatus.RESOLVED).length;
          this.stats.closed = tickets.filter((t) => t.status === TicketStatus.CLOSED).length;
          this.stats.unassigned = tickets.filter((t) => !t.assignedTo).length;
          this.stats.assignedToMe = tickets.filter((t) => t.assignedTo === currentUserId).length;

          this.isLoadingStats = false;

          if (this.role === Role.ADMIN) {
            this.loadUserCount();
          }
        },
        error: () => {
          this.isLoadingStats = false;
        }
      });
  }

  private loadUserCount(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.stats.totalUsers = users.length;
      },
      error: () => {
        // Si falla, se deja en 0 sin bloquear el resto del Dashboard.
      }
    });
  }
}
