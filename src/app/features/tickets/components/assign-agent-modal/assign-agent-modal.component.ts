import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UserService } from '../../../../core/services/user.service';
import { TicketService } from '../../../../core/services/ticket.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { User } from '../../../../core/interfaces/user.interface';
import { Role } from '../../../../core/enums/role.enum';

@Component({
  selector: 'app-assign-agent-modal',
  templateUrl: './assign-agent-modal.component.html',
  styleUrls: ['./assign-agent-modal.component.scss']
})
export class AssignAgentModalComponent implements OnInit {
  private _ticketId!: string;

  get ticketId(): string {
    return this._ticketId;
  }

  @Input({ required: true })
  set ticketId(value: string) {
    this._ticketId = value;
  }

  @Output() closeModal = new EventEmitter<void>();
  @Output() assigned = new EventEmitter<string>();

  agents: User[] = [];
  selectedAgentId: string | null = null;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.userService.getUsers(Role.AGENT).subscribe({
      next: (agents) => {
        this.agents = agents;
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  onConfirm(): void {
    if (!this.selectedAgentId) {
      return;
    }

    this.isSubmitting = true;

    this.ticketService.assignTicket(this.ticketId, { agentId: this.selectedAgentId }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toastService.show('Ticket asignado correctamente.');
        this.assigned.emit(this.selectedAgentId as string);
      },
      error: (error: Error) => {
        this.isSubmitting = false;
        this.toastService.show(error.message, 'error');
      }
    });
  }
}
