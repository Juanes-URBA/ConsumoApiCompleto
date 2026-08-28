import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TicketStatus } from '../../../../core/enums/ticket-status.enum';
import { Priority } from '../../../../core/enums/priority.enum';

export interface TicketFilterValue {
  status: TicketStatus | null;
  priority: Priority | null;
}

@Component({
  selector: 'app-ticket-filters',
  templateUrl: './ticket-filters.component.html',
  styleUrls: ['./ticket-filters.component.scss']
})
export class TicketFiltersComponent {
  @Output() filtersChange = new EventEmitter<TicketFilterValue>();

  filtersForm: FormGroup;
  statusOptions = Object.values(TicketStatus);
  priorityOptions = Object.values(Priority);

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