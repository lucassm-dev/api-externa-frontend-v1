import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ApiError } from '../../../domain/models/api-error.model';
import { InvestidoresFacade } from '../../../application/investidores.facade';
import { InvestidorFormComponent } from './investidor-form';

describe('investidor-form', () => {
  const carregando = signal(false);
  const erro = signal<ApiError | null>(null);
  const criar = vi.fn<InvestidoresFacade['criar']>();

  beforeEach(() => {
    carregando.set(false);
    erro.set(null);
    criar.mockReset();
    criar.mockResolvedValue(undefined);

    TestBed.configureTestingModule({
      imports: [InvestidorFormComponent],
      providers: [
        {
          provide: InvestidoresFacade,
          useValue: { carregando, erro, criar },
        },
      ],
    });
  });

  it('AC-016: Dados válidos criam o investidor @spec:AC-016', async () => {
    const fixture = TestBed.createComponent(InvestidorFormComponent);
    fixture.componentInstance.form.setValue({
      nome: 'Carla Souza',
      email: 'carla@example.com',
      cpf: '12345678901',
    });

    await fixture.componentInstance.enviar();

    expect(criar).toHaveBeenCalledWith({
      nome: 'Carla Souza',
      email: 'carla@example.com',
      cpf: '12345678901',
    });
    expect(fixture.componentInstance.form.getRawValue()).toEqual({ nome: '', email: '', cpf: '' });
  });

  it('AC-017: Campos inválidos são apontados um a um @spec:AC-017', async () => {
    const fixture = TestBed.createComponent(InvestidorFormComponent);
    fixture.detectChanges();

    await fixture.componentInstance.enviar();
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    expect(elemento.querySelector('#erro-nome')?.textContent).toContain('Informe o nome.');
    expect(elemento.querySelector('#erro-email')?.textContent).toContain('Informe o e-mail.');
    expect(elemento.querySelector('#erro-cpf')?.textContent).toContain('Informe o CPF.');
    expect(criar).not.toHaveBeenCalled();

    fixture.componentInstance.form.setValue({ nome: 'Carla', email: 'email-inválido', cpf: '123' });
    await fixture.componentInstance.enviar();
    fixture.detectChanges();

    expect(elemento.querySelector('#erro-email')?.textContent).toContain('Informe um e-mail válido.');
    expect(elemento.querySelector('#erro-cpf')?.textContent).toContain(
      'Informe um CPF com 11 dígitos numéricos.',
    );
    expect(criar).not.toHaveBeenCalled();
  });

  it('AC-018: E-mail já cadastrado é recusado no campo de e-mail @spec:AC-018', async () => {
    erro.set(new ApiError(409, 'E-mail já está em uso.'));
    const fixture = TestBed.createComponent(InvestidorFormComponent);
    fixture.componentInstance.form.setValue({
      nome: 'Carla Souza',
      email: 'carla@example.com',
      cpf: '12345678901',
    });

    await fixture.componentInstance.enviar();
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    expect(criar).toHaveBeenCalledTimes(1);
    expect(elemento.querySelector('#erro-email')?.textContent).toContain('E-mail já está em uso.');
    expect(elemento.querySelector('#erro-cpf')).toBeNull();
  });

  it('AC-019: CPF já cadastrado é recusado no campo de CPF @spec:AC-019', async () => {
    erro.set(new ApiError(409, 'CPF já está em uso.'));
    const fixture = TestBed.createComponent(InvestidorFormComponent);
    fixture.componentInstance.form.setValue({
      nome: 'Carla Souza',
      email: 'carla@example.com',
      cpf: '12345678901',
    });

    await fixture.componentInstance.enviar();
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    expect(criar).toHaveBeenCalledTimes(1);
    expect(elemento.querySelector('#erro-cpf')?.textContent).toContain('CPF já está em uso.');
    expect(elemento.querySelector('#erro-email')).toBeNull();
  });
});
