// Algunos endpoints de la API devuelven el recurso envuelto en { data: {...} }
// y otros lo devuelven plano — comportamiento inconsistente confirmado
// probando distintos endpoints reales. Este helper normaliza ambos casos
// para que los servicios siempre trabajen con el tipo esperado.
export function unwrapData<T>(response: T | { data: T }): T {
  if (response && typeof response === 'object' && 'data' in (response as Record<string, unknown>)) {
    return (response as { data: T }).data;
  }

  return response as T;
}
