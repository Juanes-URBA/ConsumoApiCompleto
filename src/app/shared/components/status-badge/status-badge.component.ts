import { Component, Input } from '@angular/core';

import { TicketStatus } from '../../../core/enums/ticket-status.enum';
import { STATUS_LABELS } from '../../utils/ticket-labels.util';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: TicketStatus;

  get label(): string {
    return STATUS_LABELS[this.status];
  }

  get cssClass(): string {
    const map: Record<TicketStatus, string> = {
      [TicketStatus.OPEN]: 'badge--open',
      [TicketStatus.IN_PROGRESS]: 'badge--in-progress',
      [TicketStatus.RESOLVED]: 'badge--resolved',
      [TicketStatus.CLOSED]: 'badge--closed'
    };

    return map[this.status];
  }
}