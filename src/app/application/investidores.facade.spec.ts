import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';
import { InvestidorContextoStore } from './investidor-contexto.store';
import { InvestidoresFacade } from './investidores.facade';
import { CriarInvestidor, Investidor } from '../domain/models/investidor.model';
import {
  INVESTIDOR_REPOSITORY,
  InvestidorRepository,
} from '../domain/ports/investidor-repository.port';
import { Page, PageQuery } from '../domain/models/page.model';

const investidores: Investidor[] = [
  { id: 1, nome: 'Ana Silva', email: 'ana@example.com' },
  { id: 2, nome: 'Bruno Lima', email: 'bruno@example.com' },
];

function pagina(content: Investidor[], numero = 0): Page<Investidor> {
  return {
    content,
    totalElements: content.length,
    totalPages: content.length === 0 ? 0 : 1,
    number: numero,
    size: 20,
    first: numero === 0,
    last: true,
    numberOfElements: content.length,
    empty: content.length === 0,
  };
}

describe('InvestidoresFacade', () => {
  let facade: InvestidoresFacade;
  let repositorio: {
    criar: ReturnType<typeof vi.fn>;
    listar: ReturnType<typeof vi.fn>;
    excluir: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    repositorio = {
      criar: vi.fn(),
      listar: vi.fn(),
      excluir: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        InvestidoresFacade,
        { provide: INVESTIDOR_REPOSITORY, useValue: repositorio as InvestidorRepository },
      ],
    });
    facade = TestBed.inject(InvestidoresFacade);
  });

  afterEach(() => TestBed.resetTestingModule());

  it('AC-016: Dados válidos criam o investidor @spec:AC-016', async () => {
    const cadastro: CriarInvestidor = {
      nome: 'Carla Souza',
      email: 'carla@example.com',
      cpf: '12345678901',
    };
    const investidorCriado = { id: 3, nome: cadastro.nome, email: cadastro.email };
    repositorio.criar.mockReturnValue(of(investidorCriado));
    repositorio.listar.mockReturnValue(of(pagina([investidorCriado])));

    await facade.criar(cadastro);

    expect(repositorio.criar).toHaveBeenCalledWith(cadastro);
    expect(repositorio.listar).toHaveBeenCalledWith({ page: 0 });
    expect(facade.investidores()).toEqual([investidorCriado]);
  });

  it('AC-020: Lista paginada mostra os investidores ativos @spec:AC-020', async () => {
    repositorio.listar.mockReturnValue(of(pagina(investidores, 1)));
    const consulta: PageQuery = { page: 1, size: 20, sort: 'nome,asc' };

    await facade.carregar(consulta);

    expect(repositorio.listar).toHaveBeenCalledWith(consulta);
    expect(facade.dados()?.number).toBe(1);
    expect(facade.investidores()).toEqual(investidores);
    expect(TestBed.inject(InvestidorContextoStore).investidores()).toEqual(investidores);
  });

  it('AC-021: Lista vazia orienta o cadastro @spec:AC-021', async () => {
    repositorio.listar.mockReturnValue(of(pagina([])));

    await facade.carregar();

    expect(facade.vazio()).toBe(true);
    expect(facade.investidores()).toEqual([]);
  });

  it('AC-023: Excluir pede confirmação e some da lista @spec:AC-023', async () => {
    repositorio.excluir.mockReturnValue(of(void 0));
    repositorio.listar.mockReturnValue(of(pagina([investidores[1]])));

    await facade.excluir(investidores[0].id);

    expect(repositorio.excluir).toHaveBeenCalledWith(investidores[0].id);
    expect(facade.investidores()).toEqual([investidores[1]]);
  });
});
