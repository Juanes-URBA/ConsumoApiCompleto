export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TicketListResponse<T> {
  data: T[];
  meta: PaginationMeta;
}