import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    PublicLayoutComponent,
    DashboardLayoutComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [PublicLayoutComponent, DashboardLayoutComponent]
})
export class LayoutModule {}