import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Page } from '../../../domain/models/page.model';
import { InvestidorContextoStore } from '../../../application/investidor-contexto.store';
import { InvestidoresFacade } from '../../../application/investidores.facade';
import { InvestidoresPageComponent } from './investidores-page';

const investidores = [
  { id: 1, nome: 'Ana Silva', email: 'ana@example.com' },
  { id: 2, nome: 'Bruno Lima', email: 'bruno@example.com' },
];

const pagina = (content: typeof investidores, number = 0, totalPages = 1): Page<(typeof investidores)[number]> => ({
  content,
  totalElements: content.length,
  totalPages,
  number,
  size: 10,
  first: number === 0,
  last: number === totalPages - 1,
  numberOfElements: content.length,
  empty: content.length === 0,
});

describe('investidores-page', () => {
  const carregando = signal(false);
  const dados = signal<Page<(typeof investidores)[number]> | null>(null);
  const carregar = vi.fn();

  beforeEach(() => {
    carregando.set(false);
    dados.set(null);
    carregar.mockClear();

    TestBed.configureTestingModule({
      imports: [InvestidoresPageComponent],
      providers: [
        {
          provide: InvestidoresFacade,
          useValue: { carregando, dados, carregar },
        },
      ],
    });
  });

  it('AC-020: Lista paginada mostra os investidores ativos @spec:AC-020', () => {
    dados.set(pagina(investidores, 0, 2));
    const fixture = TestBed.createComponent(InvestidoresPageComponent);
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    expect(carregar).toHaveBeenCalledWith();
    expect(elemento.textContent).toContain('Ana Silva');
    expect(elemento.textContent).toContain('ana@example.com');
    expect(elemento.textContent).toContain('Bruno Lima');
    expect(elemento.textContent).toContain('bruno@example.com');

    const proximaPagina = Array.from(elemento.querySelectorAll('button')).find(
      (botao) => botao.textContent?.trim() === 'Próxima',
    ) as HTMLButtonElement;
    proximaPagina.click();

    expect(carregar).toHaveBeenCalledWith({ page: 1 });
  });

  it('AC-021: Lista vazia orienta o cadastro @spec:AC-021', () => {
    dados.set(pagina([]));
    const fixture = TestBed.createComponent(InvestidoresPageComponent);
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    expect(elemento.textContent).toContain('Nenhum investidor cadastrado');
    expect(elemento.textContent).toContain('Cadastre o primeiro investidor');
    expect(Array.from(elemento.querySelectorAll('button')).map((botao) => botao.textContent?.trim())).toContain(
      'Cadastrar investidor',
    );
  });

  it('AC-022: Escolher um investidor da lista define o contexto @spec:AC-022', () => {
    dados.set(pagina(investidores));
    const contextoStore = TestBed.inject(InvestidorContextoStore);
    const fixture = TestBed.createComponent(InvestidoresPageComponent);
    fixture.detectChanges();

    const botao = Array.from(fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>).find(
      (item) => item.textContent?.trim() === 'Trabalhar com este investidor',
    ) as HTMLButtonElement;
    botao.click();

    expect(contextoStore.contexto()).toEqual(investidores[0]);
  });
});
