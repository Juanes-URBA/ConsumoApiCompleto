import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TicketsRoutingModule } from './tickets-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { TicketFormComponent } from './pages/ticket-form/ticket-form.component';
import { TicketFiltersComponent } from './components/ticket-filters/ticket-filters.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';

@NgModule({
  declarations: [
    TicketListComponent,
    TicketDetailComponent,
    TicketFormComponent,
    TicketFiltersComponent,
    CommentListComponent,
    CommentItemComponent,
    CommentFormComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, TicketsRoutingModule]
})
export class TicketsModule {}