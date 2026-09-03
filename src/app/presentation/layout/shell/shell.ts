import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="sidebar" [class.is-open]="menuAberto()" aria-label="Navegação principal">
      <a class="brand" routerLink="/dashboard" (click)="fecharMenu()">FEF Invest</a>

      <nav>
        <a
          class="nav-link"
          routerLink="/dashboard"
          routerLinkActive="is-active"
          [routerLinkActiveOptions]="{ exact: false }"
          (click)="fecharMenu()"
          >Dashboard</a
        >
        <div class="subnav" aria-label="Áreas do dashboard">
          <a
            class="nav-link subnav-link"
            routerLink="/dashboard"
            routerLinkActive="is-active"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="fecharMenu()"
            >Consolidado</a
          >
          <a
            class="nav-link subnav-link"
            routerLink="/dashboard/aportes"
            routerLinkActive="is-active"
            (click)="fecharMenu()"
            >Aportes</a
          >
        </div>

        <a
          class="nav-link"
          routerLink="/carteiras"
          routerLinkActive="is-active"
          (click)="fecharMenu()"
          >Carteiras</a
        >
        <a
          class="nav-link"
          routerLink="/movimentacoes"
          routerLinkActive="is-active"
          (click)="fecharMenu()"
          >Movimentações</a
        >
        <a class="nav-link" routerLink="/acoes" routerLinkActive="is-active" (click)="fecharMenu()"
          >Ações</a
        >
        <a
          class="nav-link"
          routerLink="/corretoras"
          routerLinkActive="is-active"
          (click)="fecharMenu()"
          >Corretoras</a
        >
        <a
          class="nav-link"
          routerLink="/investidores"
          routerLinkActive="is-active"
          (click)="fecharMenu()"
          >Investidores</a
        >
      </nav>
    </aside>

    <section class="shell-content">
      <header class="topbar">
        <button
          class="menu-button"
          type="button"
          aria-label="Abrir navegação"
          [attr.aria-expanded]="menuAberto()"
          (click)="alternarMenu()"
        >
          ☰
        </button>
        <div class="topbar-actions" aria-label="Contexto do investidor">
          <ng-content select="[seletor-investidor]" />
        </div>
      </header>
      <main class="page-content"><ng-content /></main>
    </section>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100dvh;
      color: var(--text, #111827);
      font-family:
        'Plus Jakarta Sans',
        system-ui,
        -apple-system,
        sans-serif;
    }
    .sidebar {
      background: var(--brand-900, #08281f);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 32px;
      height: 100dvh;
      left: 0;
      padding: 24px 16px;
      position: fixed;
      top: 0;
      width: 240px;
      z-index: 10;
    }
    .brand {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      padding: 8px 12px;
      text-decoration: none;
    }
    nav {
      display: grid;
      gap: 8px;
    }
    .nav-link {
      align-items: center;
      border-radius: 8px;
      box-sizing: border-box;
      color: var(--sidebar-text, #9dbfb4);
      display: flex;
      font-size: 14px;
      font-weight: 500;
      min-height: 40px;
      padding: 0 12px;
      text-decoration: none;
    }
    .nav-link:hover {
      background: rgba(255, 255, 255, 0.06);
      color: #fff;
    }
    .nav-link.is-active {
      background: var(--brand-600, #0f9e7a);
      color: #fff;
    }
    .subnav {
      display: grid;
      gap: 4px;
      margin-top: -4px;
    }
    .subnav-link {
      font-size: 13px;
      margin-left: 16px;
      min-height: 36px;
    }
    .shell-content {
      background: var(--bg, #f1f3f5);
      margin-left: 240px;
      min-height: 100dvh;
    }
    .topbar {
      align-items: center;
      background: var(--surface, #fff);
      border-bottom: 1px solid var(--border, #e5e7eb);
      box-sizing: border-box;
      display: flex;
      height: 64px;
      justify-content: space-between;
      padding: 0 24px;
    }
    .topbar-actions {
      margin-left: auto;
    }
    .menu-button {
      background: transparent;
      border: 0;
      color: var(--text, #111827);
      cursor: pointer;
      display: none;
      font-size: 24px;
      line-height: 1;
      padding: 8px;
    }
    .page-content {
      box-sizing: border-box;
      margin: 0 auto;
      max-width: 1440px;
      padding: 24px;
    }
    @media (max-width: 1023px) {
      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.2s ease;
      }
      .sidebar.is-open {
        transform: translateX(0);
      }
      .shell-content {
        margin-left: 0;
      }
      .menu-button {
        display: inline-flex;
      }
    }
  `,
})
export class ShellComponent {
  protected readonly menuAberto = signal(false);

  protected alternarMenu(): void {
    this.menuAberto.update((aberto) => !aberto);
  }

  protected fecharMenu(): void {
    this.menuAberto.set(false);
  }
}
