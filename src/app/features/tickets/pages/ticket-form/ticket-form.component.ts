import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TicketService } from '../../../../core/services/ticket.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { Priority } from '../../../../core/enums/priority.enum';
import { TicketStatus } from '../../../../core/enums/ticket-status.enum';
import { Role } from '../../../../core/enums/role.enum';
import { PRIORITY_LABELS, STATUS_LABELS } from '../../../../shared/utils/ticket-labels.util';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'edit' = 'create';
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';

  priorityOptions = Object.values(Priority).map((value) => ({ value, label: PRIORITY_LABELS[value] }));
  statusOptions = Object.values(TicketStatus).map((value) => ({ value, label: STATUS_LABELS[value] }));

  // Solo admin puede editar título/descripción de un ticket existente;
  // agent solo puede cambiar estado/prioridad.
  canEditContent = true;

  private ticketId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: [Priority.MEDIUM, [Validators.required]],
      status: [TicketStatus.OPEN, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('id');
    this.mode = this.ticketId ? 'edit' : 'create';

    const role = this.authService.getUserRole();
    this.canEditContent = role === Role.ADMIN;

    if (this.mode === 'create') {
      this.form.get('status')?.disable();
      return;
    }

    // Modo edición: cargar datos actuales del ticket.
    this.isLoading = true;
    this.ticketService.getTicketById(this.ticketId as string).subscribe({
      next: (ticket) => {
        this.form.patchValue({
          title: ticket.title,
          description: ticket.description,
          priority: ticket.priority,
          status: ticket.status
        });

        if (!this.canEditContent) {
          this.form.get('title')?.disable();
          this.form.get('description')?.disable();
        }

        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    if (this.mode === 'create') {
      this.createTicket();
    } else {
      this.updateTicket();
    }
  }

  private createTicket(): void {
    const { title, description, priority } = this.form.getRawValue();

    this.ticketService.createTicket({ title, description, priority }).subscribe({
      next: (ticket) => {
        this.isSubmitting = false;
        this.toastService.show('Ticket creado correctamente.');
        this.router.navigate(['/dashboard/tickets', ticket.id]);
      },
      error: (error: Error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message;
      }
    });
  }

  private updateTicket(): void {
    const raw = this.form.getRawValue();

    const payload = this.canEditContent
      ? raw
      : { priority: raw.priority, status: raw.status };

    this.ticketService.updateTicket(this.ticketId as string, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toastService.show('Ticket actualizado correctamente.');
        this.router.navigate(['/dashboard/tickets', this.ticketId]);
      },
      error: (error: Error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message;
      }
    });
  }
}