import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { PriorityBadgeComponent } from './components/priority-badge/priority-badge.component';
import { RoleBadgeComponent } from './components/role-badge/role-badge.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ToastComponent } from './components/toast/toast.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    StatusBadgeComponent,
    PriorityBadgeComponent,
    RoleBadgeComponent,
    PaginatorComponent,
    ToastComponent,
    ModalComponent
  ],
  imports: [CommonModule],
  exports: [
    SpinnerComponent,
    StatusBadgeComponent,
    PriorityBadgeComponent,
    RoleBadgeComponent,
    PaginatorComponent,
    ToastComponent,
    ModalComponent
  ]
})
export class SharedModule {}