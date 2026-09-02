import { HttpParams } from '@angular/common/http';
import { PageQuery } from '../../domain/models/page.model';

/** Monta os query params de paginação no formato esperado pelo `Pageable` do Spring. */
export function toPageParams(query: PageQuery = {}): HttpParams {
  let params = new HttpParams();

  if (query.page !== undefined) {
    params = params.set('page', query.page);
  }
  if (query.size !== undefined) {
    params = params.set('size', query.size);
  }
  for (const sort of [query.sort ?? []].flat()) {
    params = params.append('sort', sort);
  }

  return params;
}
