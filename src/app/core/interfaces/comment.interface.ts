import { Role } from '../enums/role.enum';

// El autor viene embebido como objeto (puede ser null si el usuario fue eliminado).
// PENDIENTE: no tengo la forma exacta de sus campos internos, asumo id/name/role
// por ser los mínimos necesarios para la UI. Ajustar si el backend expone más o menos.
export interface CommentAuthor {
  id: string;
  name: string;
  role: Role;
}

export interface Comment {
  id: string;
  ticketId: string;
  authorId: string;
  body: string;
  createdAt: string;
  author: CommentAuthor | null;
}