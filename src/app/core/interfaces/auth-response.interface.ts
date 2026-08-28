import { User } from './user.interface';

// Usada tanto para login como para register.
// PENDIENTE: confirmar contra el Swagger real que register
// responde exactamente con esta misma forma.
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}