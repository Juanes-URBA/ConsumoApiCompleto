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
export class TicketsRoutingModule {}import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';

const routes: Routes = [
  { path: '', component: TicketListComponent },
  { path: ':id', component: TicketDetailComponent }
  // Ruta de creación (nuevo) se agrega en el Avance 7.
  // IMPORTANTE: ':id' debe ir después de rutas estáticas como 'nuevo'
  // cuando esa ruta se agregue, para que Angular no confunda 'nuevo' con un ID.
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}