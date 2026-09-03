import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CriarInvestidor, Investidor } from '../models/investidor.model';
import { Page, PageQuery } from '../models/page.model';

/** Porta de acesso aos investidores, independente do transporte usado. */
export interface InvestidorRepository {
  criar(dados: CriarInvestidor): Observable<Investidor>;
  listar(paginacao?: PageQuery): Observable<Page<Investidor>>;
  excluir(id: number): Observable<void>;
}

export const INVESTIDOR_REPOSITORY = new InjectionToken<InvestidorRepository>(
  'INVESTIDOR_REPOSITORY',
);
