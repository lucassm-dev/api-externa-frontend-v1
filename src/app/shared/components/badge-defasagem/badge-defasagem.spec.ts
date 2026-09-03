import { TestBed } from '@angular/core/testing';
import { BadgeDefasagemComponent } from './badge-defasagem';

describe('badge-defasagem', () => {
  it('AC-044: Cotação além do limiar do mercado é sinalizada @spec:AC-044', () => {
    const fixture = TestBed.createComponent(BadgeDefasagemComponent);
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('[role="status"]') as HTMLElement;
    expect(badge.classList).toContain('badge--warning');
    expect(badge.textContent).toContain('Cotação atrasada');
  });

  it('AC-105: Consolidado com cotação defasada é sinalizado @spec:AC-105', () => {
    const fixture = TestBed.createComponent(BadgeDefasagemComponent);
    fixture.componentRef.setInput('mensagem', 'Consolidado com cotação atrasada');
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('[role="status"]') as HTMLElement;
    expect(badge.textContent).toContain('Consolidado com cotação atrasada');
    expect(badge.textContent).toContain('⚠');
  });
});
