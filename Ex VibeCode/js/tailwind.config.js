/* ==========================================================================
   BROTA — tailwind.config.js
   Configuração do Tailwind via CDN. Este arquivo precisa ser carregado
   DEPOIS do script do Tailwind e ANTES do conteúdo renderizar (ver index.html).

   Se você migrar para o Tailwind CLI/Vite, copie o objeto `theme.extend`
   para o seu tailwind.config.js e remova a CDN.
   ========================================================================== */

tailwind.config = {
  theme: {
    extend: {
      /* ----- Paleta ----- */
      colors: {
        moss: {
          DEFAULT: '#1B3B2B', // cor principal (verde musgo escuro)
          700: '#24503B',     // variação mais clara para hovers
        },
        mint: {
          DEFAULT: '#4E9F3D', // destaques, gráficos e ícones
          dark: '#357A27',    // versão para texto pequeno sobre fundo claro (contraste AA)
          light: '#A8D89B',   // versão para texto grande sobre fundo escuro
        },
        paper: '#F7F9F6',     // fundo off-white
        ink: '#2C3E50',       // texto em cinza chumbo
      },

      /* ----- Tipografia ----- */
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      /* ----- Sombras ----- */
      boxShadow: {
        // Sombra esverdeada e suave, em vez do cinza genérico
        card: '0 1px 2px rgb(27 59 43 / 0.06), 0 12px 32px -8px rgb(27 59 43 / 0.14)',
        float: '0 8px 24px -6px rgb(27 59 43 / 0.25)',
      },
    },
  },
};
