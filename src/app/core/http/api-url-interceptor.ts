import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { API_BASE_URL } from '../config/api.config';

/**
 * Prefixa com a base da API toda URL relativa que não seja de asset local,
 * para que os repositórios declarem apenas o caminho do recurso (`/corretoras`).
 */
export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = inject(API_BASE_URL);
  const isAbsolute = /^https?:\/\//i.test(req.url);
  const isLocalAsset = req.url.startsWith('assets/') || req.url.startsWith('/assets/');
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');

  if (
    isAbsolute ||
    isLocalAsset ||
    req.url === normalizedBaseUrl ||
    req.url.startsWith(`${normalizedBaseUrl}/`)
  ) {
    return next(req);
  }

  const path = req.url.startsWith('/') ? req.url : `/${req.url}`;
  return next(req.clone({ url: `${normalizedBaseUrl}${path}` }));
};
