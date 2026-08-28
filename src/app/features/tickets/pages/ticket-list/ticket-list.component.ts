import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TicketService } from '../../../../core/services/ticket.service';
import { Ticket } from '../../../../core/interfaces/ticket.interface';
import { TicketFilters } from '../../../../core/interfaces/ticket-filters.interface';
import { TicketFilterValue } from '../../components/ticket-filters/ticket-filters.component';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  total = 0;
  isLoading = false;
  errorMessage = '';

  filters: TicketFilters = {
    status: null,
    priority: null,
    page: 1,
    limit: 10
  };

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  onFiltersChange(value: TicketFilterValue): void {
    this.filters = { ...this.filters, ...value, page: 1 };
    this.loadTickets();
  }

  onPageChange(page: number): void {
    this.filters = { ...this.filters, page };
    this.loadTickets();
  }

  onViewTicket(ticketId: string): void {
    this.router.navigate(['/dashboard/tickets', ticketId]);
  }

  private loadTickets(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.ticketService.getTickets(this.filters).subscribe({
      next: (response) => {
        this.tickets = response.data;
        this.total = response.meta.total;
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }
}