import { TestBed } from '@angular/core/testing';
import { InvestidoresFacade } from '../../../application/investidores.facade';
import { InvestidorExcluirComponent } from './investidor-excluir';

describe('investidor-excluir', () => {
  const investidor = { id: 1, nome: 'Ana Silva', email: 'ana@example.com' };
  const excluir = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);

  beforeEach(() => {
    excluir.mockClear();

    TestBed.configureTestingModule({
      imports: [InvestidorExcluirComponent],
      providers: [{ provide: InvestidoresFacade, useValue: { excluir } }],
    });
  });

  it('AC-023: Excluir pede confirmação e some da lista @spec:AC-023', async () => {
    const fixture = TestBed.createComponent(InvestidorExcluirComponent);
    fixture.componentRef.setInput('investidor', investidor);
    fixture.detectChanges();

    const botoes = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    botoes[0].click();
    fixture.detectChanges();

    expect(excluir).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain('Deseja excluir Ana Silva?');

    const confirmar = Array.from(
      fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>,
    ).find(
      (botao) => botao.textContent?.trim() === 'Excluir',
    ) as HTMLButtonElement;
    confirmar.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(excluir).toHaveBeenCalledWith(investidor.id);
    expect(fixture.nativeElement.textContent).not.toContain('Deseja excluir Ana Silva?');
  });
});
