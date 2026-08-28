import { Priority } from '../enums/priority.enum';

export interface CreateTicketRequest {
  title: string;
  description: string;
  priority: Priority;
}