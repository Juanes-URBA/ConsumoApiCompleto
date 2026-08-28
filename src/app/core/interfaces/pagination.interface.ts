export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}

// Reemplaza al antiguo PaginatedResponse<T> plano.
// El backend envuelve la paginación dentro de "meta", no al mismo nivel que "data".
export interface TicketListResponse<T> {
  data: T[];
  meta: PaginationMeta;
}