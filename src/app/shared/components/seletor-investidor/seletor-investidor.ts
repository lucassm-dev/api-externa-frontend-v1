import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InvestidorContextoStore } from '../../../application/investidor-contexto.store';

@Component({
  selector: 'app-seletor-investidor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="label" for="investidor-contexto">Investidor em contexto</label>
    <select
      id="investidor-contexto"
      class="select"
      [value]="contextoStore.contexto()?.id ?? ''"
      (change)="selecionar($event)"
    >
      <option value="" disabled>Selecione um investidor</option>
      @for (investidor of contextoStore.investidores(); track investidor.id) {
        <option [value]="investidor.id">{{ investidor.nome }}</option>
      }
    </select>
  `,
})
export class SeletorInvestidorComponent {
  protected readonly contextoStore = inject(InvestidorContextoStore);

  protected selecionar(evento: Event): void {
    const id = Number((evento.target as HTMLSelectElement).value);
    const investidor = this.contextoStore.investidores().find((item) => item.id === id);

    if (investidor) {
      this.contextoStore.selecionar(investidor);
    }
  }
}
