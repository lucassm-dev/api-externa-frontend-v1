import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { toPageParams } from '../../core/http/http-params';
import { CriarInvestidor, Investidor } from '../../domain/models/investidor.model';
import { Page, PageQuery } from '../../domain/models/page.model';
import { InvestidorRepository } from '../../domain/ports/investidor-repository.port';

/** Implementação HTTP da porta de investidores. */
@Injectable({ providedIn: 'root' })
export class InvestidorHttpRepository implements InvestidorRepository {
  private readonly http = inject(HttpClient);

  criar(dados: CriarInvestidor): Observable<Investidor> {
    return this.http.post<Investidor>('/investidores', dados);
  }

  listar(paginacao: PageQuery = {}): Observable<Page<Investidor>> {
    return this.http.get<Page<Investidor>>('/investidores', {
      params: toPageParams(paginacao),
    });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`/investidores/${id}`).pipe(map(() => undefined));
  }
}
