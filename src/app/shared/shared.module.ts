import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { PriorityBadgeComponent } from './components/priority-badge/priority-badge.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    StatusBadgeComponent,
    PriorityBadgeComponent,
    PaginatorComponent
  ],
  imports: [CommonModule],
  exports: [SpinnerComponent, StatusBadgeComponent, PriorityBadgeComponent, PaginatorComponent]
})
export class SharedModule {}