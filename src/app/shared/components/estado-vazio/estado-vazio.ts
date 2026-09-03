import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/** Estado orientado à ação para uma consulta que terminou sem resultados. */
@Component({
  selector: 'app-estado-vazio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="estado-vazio" aria-labelledby="estado-vazio-titulo">
      <span class="estado-vazio__icone" aria-hidden="true">○</span>
      <h2 id="estado-vazio-titulo" class="text-h2">{{ titulo }}</h2>
      <p class="text-body">{{ descricao }}</p>
      @if (textoAcao) {
        <button class="button button--primary" type="button" (click)="acionar()">
          {{ textoAcao }}
        </button>
      }
    </section>
  `,
  styles: `
    .estado-vazio {
      display: grid;
      justify-items: center;
      gap: var(--space-1);
      padding: var(--space-6) var(--space-2);
      text-align: center;
    }

    .estado-vazio__icone {
      color: var(--text-disabled);
      font-size: 40px;
      line-height: 1;
    }

    .estado-vazio p {
      max-width: 480px;
      margin: 0 0 var(--space-1);
      color: var(--text-muted);
    }
  `,
})
export class EstadoVazioComponent {
  @Input({ required: true }) titulo = '';
  @Input({ required: true }) descricao = '';
  @Input() textoAcao?: string;
  @Output() readonly acao = new EventEmitter<void>();

  protected acionar(): void {
    this.acao.emit();
  }
}
