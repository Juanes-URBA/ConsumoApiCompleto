import { Role } from '../enums/role.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}