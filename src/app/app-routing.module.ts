import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Las rutas de cada feature se agregarán aquí con Lazy Loading
// en los siguientes avances (auth, dashboard, tickets, users).
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}