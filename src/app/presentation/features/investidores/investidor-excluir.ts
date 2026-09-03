import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { InvestidoresFacade } from '../../../application/investidores.facade';
import { Investidor } from '../../../domain/models/investidor.model';
import { ModalConfirmacaoComponent } from '../../../shared/components/modal-confirmacao/modal-confirmacao';

/** Solicita confirmação antes de excluir logicamente um investidor da listagem. */
@Component({
  selector: 'app-investidor-excluir',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModalConfirmacaoComponent],
  template: `
    <button class="button button--danger" type="button" (click)="abrirConfirmacao()">
      Excluir investidor
    </button>

    <app-modal-confirmacao
      [aberto]="confirmacaoAberta()"
      titulo="Excluir investidor"
      [mensagem]="'Deseja excluir ' + investidor.nome + '?'"
      textoConfirmar="Excluir"
      (cancelar)="fecharConfirmacao()"
      (confirmar)="confirmarExclusao()"
    />
  `,
})
export class InvestidorExcluirComponent {
  @Input({ required: true }) investidor!: Investidor;

  private readonly facade = inject(InvestidoresFacade);
  protected readonly confirmacaoAberta = signal(false);

  protected abrirConfirmacao(): void {
    this.confirmacaoAberta.set(true);
  }

  protected fecharConfirmacao(): void {
    this.confirmacaoAberta.set(false);
  }

  protected async confirmarExclusao(): Promise<void> {
    await this.facade.excluir(this.investidor.id);
    this.fecharConfirmacao();
  }
}
