// PENDIENTE: validar el nombre exacto del campo contra el Swagger real.
// Se asume "agentId" por consistencia con Ticket.assignedTo.
export interface AssignTicketRequest {
  agentId: string;
}