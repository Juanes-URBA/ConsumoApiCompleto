import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TicketsRoutingModule } from './tickets-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketFiltersComponent } from './components/ticket-filters/ticket-filters.component';

@NgModule({
  declarations: [TicketListComponent, TicketFiltersComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, TicketsRoutingModule]
})
export class TicketsModule {}