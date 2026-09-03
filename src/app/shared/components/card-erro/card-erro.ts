import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiError } from '../../../domain/models/api-error.model';

/** Explica uma falha recuperável e oferece ao consumidor a repetição da consulta. */
@Component({
  selector: 'app-card-erro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="card card--error" role="alert" aria-labelledby="card-erro-titulo">
      <h2 id="card-erro-titulo" class="text-h2 card-erro__titulo">
        {{ titulo }}
      </h2>
      <p class="text-body">{{ mensagemExibida }}</p>
      @if (mostrarTentativa) {
        <button class="button button--secondary" type="button" (click)="tentarNovamente.emit()">
          Tentar de novo
        </button>
      }
    </section>
  `,
  styles: `
    .card-erro {
      display: grid;
      gap: var(--space-2);
    }

    .card-erro__titulo {
      margin: 0;
      color: var(--down);
    }

    .card-erro p {
      margin: 0;
      color: var(--text);
    }
  `,
})
export class CardErroComponent {
  @Input() titulo = 'Não foi possível carregar os dados';
  @Input() erro?: ApiError;
  @Input() mensagem = 'Não foi possível concluir esta consulta. Tente de novo.';
  @Input() mostrarTentativa = true;
  @Output() readonly tentarNovamente = new EventEmitter<void>();

  get mensagemExibida(): string {
    return this.erro?.message ?? this.mensagem;
  }
}
