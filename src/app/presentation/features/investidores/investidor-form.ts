import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiError } from '../../../domain/models/api-error.model';
import { InvestidoresFacade } from '../../../application/investidores.facade';

type CampoCadastro = 'nome' | 'email' | 'cpf';

const CAMPOS_CADASTRO: readonly CampoCadastro[] = ['nome', 'email', 'cpf'];

/** Formulário para criar um investidor e apresentar falhas no respectivo campo. */
@Component({
  selector: 'app-investidor-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <section class="card card--large" aria-labelledby="titulo-cadastro-investidor">
      <h2 id="titulo-cadastro-investidor" class="text-h2">Cadastrar investidor</h2>

      <form [formGroup]="form" (ngSubmit)="enviar()" novalidate>
        <div class="investidor-form__campo">
          <label class="label" for="nome">Nome</label>
          <input
            id="nome"
            class="input"
            type="text"
            formControlName="nome"
            [attr.aria-invalid]="mensagemDoCampo('nome') ? 'true' : null"
            [attr.aria-describedby]="mensagemDoCampo('nome') ? 'erro-nome' : null"
            (input)="limparErroDoServidor('nome')"
          />
          @if (mensagemDoCampo('nome'); as mensagem) {
            <p id="erro-nome" class="investidor-form__erro" role="alert">{{ mensagem }}</p>
          }
        </div>

        <div class="investidor-form__campo">
          <label class="label" for="email">E-mail</label>
          <input
            id="email"
            class="input"
            type="email"
            formControlName="email"
            [attr.aria-invalid]="mensagemDoCampo('email') ? 'true' : null"
            [attr.aria-describedby]="mensagemDoCampo('email') ? 'erro-email' : null"
            (input)="limparErroDoServidor('email')"
          />
          @if (mensagemDoCampo('email'); as mensagem) {
            <p id="erro-email" class="investidor-form__erro" role="alert">{{ mensagem }}</p>
          }
        </div>

        <div class="investidor-form__campo">
          <label class="label" for="cpf">CPF</label>
          <input
            id="cpf"
            class="input"
            type="text"
            inputmode="numeric"
            formControlName="cpf"
            [attr.aria-invalid]="mensagemDoCampo('cpf') ? 'true' : null"
            [attr.aria-describedby]="mensagemDoCampo('cpf') ? 'erro-cpf' : null"
            (input)="limparErroDoServidor('cpf')"
          />
          @if (mensagemDoCampo('cpf'); as mensagem) {
            <p id="erro-cpf" class="investidor-form__erro" role="alert">{{ mensagem }}</p>
          }
        </div>

        <button class="button button--primary" type="submit" [disabled]="facade.carregando()">
          Cadastrar investidor
        </button>
      </form>
    </section>
  `,
  styles: `
    .investidor-form__campo {
      margin-bottom: var(--space-2);
    }

    .investidor-form__erro {
      margin: var(--space-0-5) 0 0;
      color: var(--down);
      font-size: 12px;
      font-weight: 500;
      line-height: 1.4;
    }

    .investidor-form__campo:last-of-type {
      margin-bottom: var(--space-3);
    }
  `,
})
export class InvestidorFormComponent {
  readonly facade = inject(InvestidoresFacade);
  readonly form = new FormGroup({
    nome: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    cpf: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{11}$/)],
    }),
  });

  private readonly errosDoServidor = signal<Partial<Record<CampoCadastro, string>>>({});
  private submetido = false;

  async enviar(): Promise<void> {
    this.submetido = true;
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.errosDoServidor.set({});
    await this.facade.criar(this.form.getRawValue());

    const erro = this.facade.erro();
    if (erro) {
      this.exibirErroDoServidor(erro);
      return;
    }

    this.form.reset();
    this.submetido = false;
  }

  mensagemDoCampo(campo: CampoCadastro): string | undefined {
    const controle = this.form.controls[campo];

    if ((controle.touched || this.submetido) && controle.invalid) {
      if (controle.hasError('required')) {
        return `Informe ${campo === 'nome' ? 'o nome' : campo === 'email' ? 'o e-mail' : 'o CPF'}.`;
      }

      if (controle.hasError('email')) {
        return 'Informe um e-mail válido.';
      }

      return 'Informe um CPF com 11 dígitos numéricos.';
    }

    return this.errosDoServidor()[campo];
  }

  limparErroDoServidor(campo: CampoCadastro): void {
    const erros = this.errosDoServidor();
    if (!(campo in erros)) {
      return;
    }

    const { [campo]: _, ...restante } = erros;
    this.errosDoServidor.set(restante);
  }

  private exibirErroDoServidor(erro: ApiError): void {
    const porCampo: Partial<Record<CampoCadastro, string>> = {};

    for (const { field, message } of erro.fieldErrors) {
      if (CAMPOS_CADASTRO.includes(field as CampoCadastro)) {
        porCampo[field as CampoCadastro] = message;
      }
    }

    if (erro.status === 409) {
      const campo = this.campoEmConflito(erro.message);
      if (campo) {
        porCampo[campo] = erro.message;
      }
    }

    this.errosDoServidor.set(porCampo);
  }

  private campoEmConflito(mensagem: string): CampoCadastro | undefined {
    const normalizada = mensagem
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    if (normalizada.includes('e-mail') || normalizada.includes('email')) {
      return 'email';
    }

    return normalizada.includes('cpf') ? 'cpf' : undefined;
  }
}
