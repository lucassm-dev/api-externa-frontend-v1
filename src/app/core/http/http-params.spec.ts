import { toPageParams } from './http-params';

describe('toPageParams', () => {
  it('serializa a paginação no formato Pageable do Spring', () => {
    const params = toPageParams({ page: 2, size: 25, sort: ['nome,asc', 'id,desc'] });

    expect(params.get('page')).toBe('2');
    expect(params.get('size')).toBe('25');
    expect(params.getAll('sort')).toEqual(['nome,asc', 'id,desc']);
  });

  it('omite filtros de paginação que não foram informados', () => {
    const params = toPageParams();

    expect(params.keys()).toEqual([]);
  });
});
