import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TicketListComponent } from './pages/ticket-list/ticket-list.component';

const routes: Routes = [
  { path: '', component: TicketListComponent }
  // Rutas de detalle (:id) y creación (nuevo) se agregan en los Avances 6 y 7.
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}