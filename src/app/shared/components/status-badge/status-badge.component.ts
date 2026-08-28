import { Component, Input } from '@angular/core';

import { TicketStatus } from '../../../core/enums/ticket-status.enum';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: TicketStatus;

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