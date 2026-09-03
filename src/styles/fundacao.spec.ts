import { readFileSync } from 'node:fs';

const baseStyles = readFileSync('src/styles/_base.scss', 'utf8');
const typographyStyles = readFileSync('src/styles/_tipografia.scss', 'utf8');
const controlStyles = readFileSync('src/styles/_controles.scss', 'utf8');
const tableStyles = readFileSync('src/styles/_tabela.scss', 'utf8');
const cardStyles = readFileSync('src/styles/_card.scss', 'utf8');

describe('fundação visual', () => {
  it('AC-013: Colunas numéricas alinham na vertical @spec:AC-013', () => {
    expect(typographyStyles).toMatch(
      /\.num\s*\{[^}]*text-align:\s*right;[^}]*font-variant-numeric:\s*tabular-nums;[^}]*letter-spacing:\s*-0\.01em;/s,
    );
    expect(tableStyles).toMatch(
      /\.data-table\s+\.data-table__numeric\s*\{[^}]*text-align:\s*right;[^}]*font-variant-numeric:\s*tabular-nums;[^}]*letter-spacing:\s*-0\.01em;/s,
    );
  });

  it('AC-014: Variação nunca é comunicada só por cor @spec:AC-014', () => {
    expect(cardStyles).toMatch(
      /\.variation--up\s*\{[^}]*color:\s*var\(--up\);[\s\S]*?&::before\s*\{\s*content:\s*'↑';/,
    );
    expect(cardStyles).toMatch(
      /\.variation--down\s*\{[^}]*color:\s*var\(--down\);[\s\S]*?&::before\s*\{\s*content:\s*'↓';/,
    );
  });

  it('AC-015: Todo controle mostra o foco de teclado @spec:AC-015', () => {
    expect(baseStyles).toMatch(
      /button,[\s\S]*?:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--brand-600\);[^}]*box-shadow:\s*0 0 0 3px rgb\(15 158 122 \/ 15%\);/,
    );
    expect(controlStyles).toMatch(
      /\.button\s*\{[\s\S]*?&:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--brand-600\);[^}]*box-shadow:\s*0 0 0 3px rgb\(15 158 122 \/ 15%\);/,
    );
  });
});
