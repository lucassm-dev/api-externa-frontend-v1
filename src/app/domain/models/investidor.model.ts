/** Dados públicos de um investidor retornados pela API. */
export interface Investidor {
  id: number;
  nome: string;
  email: string;
}

/** Dados necessários para cadastrar um investidor. */
export interface CriarInvestidor {
  nome: string;
  email: string;
  cpf: string;
}
