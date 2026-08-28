import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { Role } from './core/enums/role.enum';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule)
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./features/tickets/tickets.module').then((m) => m.TicketsModule)
      },
      {
        path: 'usuarios',
        canActivate: [RoleGuard],
        data: { roles: [Role.ADMIN] },
        loadChildren: () =>
          import('./features/users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('./features/profile/profile.module').then((m) => m.ProfileModule)
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}