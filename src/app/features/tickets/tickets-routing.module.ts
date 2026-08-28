import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { TicketFormComponent } from './pages/ticket-form/ticket-form.component';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../core/enums/role.enum';

const routes: Routes = [
  { path: '', component: TicketListComponent },
  {
    path: 'nuevo',
    component: TicketFormComponent,
    canActivate: [RoleGuard],
    data: { roles: [Role.ADMIN, Role.CLIENT] }
  },
  {
    path: ':id/editar',
    component: TicketFormComponent,
    canActivate: [RoleGuard],
    data: { roles: [Role.ADMIN, Role.AGENT] }
  },
  { path: ':id', component: TicketDetailComponent }
  // 'nuevo' y ':id/editar' van ANTES de ':id' para que Angular no
  // confunda esos segmentos con un ID de ticket.
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}