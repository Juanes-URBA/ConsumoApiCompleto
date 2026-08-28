import { TicketStatus } from '../enums/ticket-status.enum';
import { Priority } from '../enums/priority.enum';

export interface TicketFilters {
  status: TicketStatus | null;
  priority: Priority | null;
  page: number;
  limit: number;
}