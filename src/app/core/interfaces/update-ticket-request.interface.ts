import { Priority } from '../enums/priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

// Todos los campos opcionales: PATCH permite actualizar solo lo que cambie.
export interface UpdateTicketRequest {
  title?: string;
  description?: string;
  priority?: Priority;
  status?: TicketStatus;
}