import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TicketStatus } from '../../../../core/enums/ticket-status.enum';
import { Priority } from '../../../../core/enums/priority.enum';
import { STATUS_LABELS, PRIORITY_LABELS } from '../../../../shared/utils/ticket-labels.util';

export interface TicketFilterValue {
  status: TicketStatus | null;
  priority: Priority | null;
}

interface FilterOption<T> {
  value: T;
  label: string;
}

@Component({
  selector: 'app-ticket-filters',
  templateUrl: './ticket-filters.component.html',
  styleUrls: ['./ticket-filters.component.scss']
})
export class TicketFiltersComponent {
  @Output() filtersChange = new EventEmitter<TicketFilterValue>();

  filtersForm: FormGroup;

  statusOptions: FilterOption<TicketStatus>[] = Object.values(TicketStatus).map((value) => ({
    value,
    label: STATUS_LABELS[value]
  }));

  priorityOptions: FilterOption<Priority>[] = Object.values(Priority).map((value) => ({
    value,
    label: PRIORITY_LABELS[value]
  }));

  constructor(private fb: FormBuilder) {
    this.filtersForm = this.fb.group({
      status: [null],
      priority: [null]
    });

    this.filtersForm.valueChanges.subscribe((value: TicketFilterValue) => {
      this.filtersChange.emit(value);
    });
  }
}