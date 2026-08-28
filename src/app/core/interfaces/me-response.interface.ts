import { User } from './user.interface';

// GET /api/auth/me devuelve el usuario envuelto en { user: {...} },
// no el objeto plano — confirmado con la respuesta real del backend.
export interface MeResponse {
  user: User;
}
