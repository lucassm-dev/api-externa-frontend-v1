import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { InvestidorContextoStore } from '../../application/investidor-contexto.store';

/**
 * Impede que áreas cujos dados pertencem a um investidor sejam carregadas sem contexto.
 * `canMatch` é usado para que a rota protegida nem chegue a carregar antes do redirecionamento.
 */
export const investidorContextoGuard: CanMatchFn = () => {
  const contextoStore = inject(InvestidorContextoStore);
  const router = inject(Router);

  return contextoStore.investidorId() !== null ? true : router.createUrlTree(['/investidores']);
};
