import { Component, Input } from '@angular/core';

import { Priority } from '../../../core/enums/priority.enum';
import { PRIORITY_LABELS } from '../../utils/ticket-labels.util';

@Component({
  selector: 'app-priority-badge',
  templateUrl: './priority-badge.component.html',
  styleUrls: ['./priority-badge.component.scss']
})
export class PriorityBadgeComponent {
  @Input({ required: true }) priority!: Priority;

  get label(): string {
    return PRIORITY_LABELS[this.priority];
  }

  get cssClass(): string {
    const map: Record<Priority, string> = {
      [Priority.LOW]: 'badge--low',
      [Priority.MEDIUM]: 'badge--medium',
      [Priority.HIGH]: 'badge--high',
      [Priority.URGENT]: 'badge--urgent'
    };

    return map[this.priority];
  }
}