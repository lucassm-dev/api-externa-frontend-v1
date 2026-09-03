import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/** Confirma exclusivamente ações irreversíveis antes de delegá-las à tela consumidora. */
@Component({
  selector: 'app-modal-confirmacao',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (aberto) {
      <div class="modal-confirmacao__fundo">
        <section
          class="card card--large modal-confirmacao"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-confirmacao-titulo"
        >
          <h2 id="modal-confirmacao-titulo" class="text-h2">{{ titulo }}</h2>
          <p class="text-body">{{ mensagem }}</p>
          <div class="modal-confirmacao__acoes">
            <button class="button button--secondary" type="button" (click)="cancelar.emit()">
              {{ textoCancelar }}
            </button>
            <button class="button button--primary button--danger" type="button" (click)="confirmar.emit()">
              {{ textoConfirmar }}
            </button>
          </div>
        </section>
      </div>
    }
  `,
  styles: `
    .modal-confirmacao__fundo {
      position: fixed;
      z-index: 20;
      inset: 0;
      display: grid;
      place-items: center;
      padding: var(--space-2);
      background: rgb(17 24 39 / 40%);
    }

    .modal-confirmacao {
      width: min(100%, 480px);
      display: grid;
      gap: var(--space-2);
    }

    .modal-confirmacao h2,
    .modal-confirmacao p {
      margin: 0;
    }

    .modal-confirmacao__acoes {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-1);
      margin-top: var(--space-1);
    }
  `,
})
export class ModalConfirmacaoComponent {
  @Input() aberto = false;
  @Input({ required: true }) titulo = '';
  @Input({ required: true }) mensagem = '';
  @Input() textoCancelar = 'Cancelar';
  @Input() textoConfirmar = 'Confirmar';
  @Output() readonly cancelar = new EventEmitter<void>();
  @Output() readonly confirmar = new EventEmitter<void>();
}
