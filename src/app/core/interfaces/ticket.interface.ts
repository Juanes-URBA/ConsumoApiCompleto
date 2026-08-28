import { TicketStatus } from '../enums/ticket-status.enum';
import { Priority } from '../enums/priority.enum';

// PENDIENTE: validar nombres exactos de propiedades contra el Swagger real.
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  assignedTo: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}