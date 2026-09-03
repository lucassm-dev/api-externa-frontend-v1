import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nao-encontrado',
  imports: [RouterLink],
  template: `
    <main aria-labelledby="titulo-pagina-nao-encontrada">
      <h1 id="titulo-pagina-nao-encontrada">Página não encontrada</h1>
      <p>O endereço acessado não existe ou foi movido.</p>
      <a routerLink="/dashboard">Voltar ao dashboard</a>
    </main>
  `,
})
export class NaoEncontradoComponent {}
