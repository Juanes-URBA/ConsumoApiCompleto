import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../core/services/auth.service';
import { Role } from '../../../../core/enums/role.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role: Role | null = null;
  roleEnum = Role;

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
  }

  constructor(private authService: AuthService) {}
}