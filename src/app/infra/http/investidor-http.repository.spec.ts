import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { CriarInvestidor, Investidor } from '../../domain/models/investidor.model';
import { Page } from '../../domain/models/page.model';
import { InvestidorHttpRepository } from './investidor-http.repository';

describe('InvestidorHttpRepository', () => {
  let repository: InvestidorHttpRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    repository = TestBed.inject(InvestidorHttpRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('cria o investidor com dados válidos @spec:AC-016', async () => {
    const dados: CriarInvestidor = {
      nome: 'Ana Silva',
      email: 'ana@example.com',
      cpf: '12345678901',
    };
    const criado: Investidor = { id: 1, nome: dados.nome, email: dados.email };
    const resultado = firstValueFrom(repository.criar(dados));

    const requisicao = http.expectOne('/investidores');
    expect(requisicao.request.method).toBe('POST');
    expect(requisicao.request.body).toEqual(dados);
    requisicao.flush(criado, { status: 201, statusText: 'Created' });

    await expect(resultado).resolves.toEqual(criado);
  });

  it('lista investidores ativos com paginação @spec:AC-020', async () => {
    const pagina: Page<Investidor> = {
      content: [{ id: 1, nome: 'Ana Silva', email: 'ana@example.com' }],
      totalElements: 1,
      totalPages: 1,
      number: 0,
      size: 20,
      first: true,
      last: true,
      numberOfElements: 1,
      empty: false,
    };
    const resultado = firstValueFrom(repository.listar({ page: 0, size: 20, sort: 'nome,asc' }));

    const requisicao = http.expectOne(
      (request) =>
        request.url === '/investidores' &&
        request.params.get('page') === '0' &&
        request.params.get('size') === '20' &&
        request.params.get('sort') === 'nome,asc',
    );
    expect(requisicao.request.method).toBe('GET');
    requisicao.flush(pagina);

    await expect(resultado).resolves.toEqual(pagina);
  });

  it('exclui o investidor confirmado da lista @spec:AC-023', async () => {
    const resultado = firstValueFrom(repository.excluir(42));

    const requisicao = http.expectOne('/investidores/42');
    expect(requisicao.request.method).toBe('DELETE');
    requisicao.flush(null, { status: 204, statusText: 'No Content' });

    await expect(resultado).resolves.toBeUndefined();
  });
});
