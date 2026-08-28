import { TicketStatus } from '../../core/enums/ticket-status.enum';
import { Priority } from '../../core/enums/priority.enum';

// El backend maneja los valores en minúscula/snake_case (ej. "in_progress").
// Estos mapas son solo para mostrarlos legibles en la UI; el valor que
// viaja hacia/desde la API sigue siendo exactamente el del enum.
export const STATUS_LABELS: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'Open',
  [TicketStatus.IN_PROGRESS]: 'In Progress',
  [TicketStatus.RESOLVED]: 'Resolved',
  [TicketStatus.CLOSED]: 'Closed'
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  [Priority.LOW]: 'Low',
  [Priority.MEDIUM]: 'Medium',
  [Priority.HIGH]: 'High',
  [Priority.URGENT]: 'Urgent'
};