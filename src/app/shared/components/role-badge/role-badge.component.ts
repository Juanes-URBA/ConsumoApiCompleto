import { Component, Input } from '@angular/core';

import { Role } from '../../../core/enums/role.enum';

@Component({
  selector: 'app-role-badge',
  templateUrl: './role-badge.component.html',
  styleUrls: ['./role-badge.component.scss']
})
export class RoleBadgeComponent {
  @Input({ required: true }) role!: Role;

  get cssClass(): string {
    const map: Record<Role, string> = {
      [Role.ADMIN]: 'badge--admin',
      [Role.AGENT]: 'badge--agent',
      [Role.CLIENT]: 'badge--client'
    };

    return map[this.role];
  }
}