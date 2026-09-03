import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Aviso textual e visual de que valores foram calculados com uma cotação atrasada. */
@Component({
  selector: 'app-badge-defasagem',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge badge--warning" role="status">
      <span aria-hidden="true">⚠</span>
      {{ mensagem }}
    </span>
  `,
})
export class BadgeDefasagemComponent {
  /** Permite diferenciar o aviso da linha daquele usado em um consolidado. */
  @Input() mensagem = 'Cotação atrasada';
}
