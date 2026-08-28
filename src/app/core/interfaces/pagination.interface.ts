// PENDIENTE: validar la forma exacta de la respuesta paginada contra el Swagger real.
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}