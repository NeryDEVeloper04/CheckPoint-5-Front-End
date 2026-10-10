/* ==========================================================================
   BROTA — main.js
   JavaScript puro, sem dependências. Três responsabilidades:
   1. Menu mobile (abrir/fechar)
   2. Contadores animados da seção de métricas
   3. Ano atual no rodapé
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. MENU MOBILE
     O botão alterna a visibilidade do painel e atualiza aria-expanded
     para leitores de tela.
     ------------------------------------------------------------------------ */
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuButton && mobileMenu) {
    const setMenu = (open) => {
      menuButton.setAttribute('aria-expanded', String(open));
      mobileMenu.classList.toggle('hidden', !open);
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      setMenu(!isOpen);
    });

    // Fecha ao clicar em qualquer link do menu
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    // Fecha com a tecla Esc e devolve o foco ao botão
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuButton.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. CONTADORES ANIMADOS
     Cada elemento [data-counter] define:
       data-target   → valor final (ex.: 500 ou 12.4)
       data-decimals → casas decimais (opcional, padrão 0)
       data-prefix   → texto antes do número (ex.: "+")
       data-suffix   → texto depois do número (ex.: "%")
     O HTML já traz o valor final escrito: sem JS (ou com movimento reduzido)
     o número aparece direto, sem animação.
     ------------------------------------------------------------------------ */
  const counters = document.querySelectorAll('[data-counter]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const format = (value, decimals) =>
    value.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1600; // ms
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
      el.textContent = prefix + format(target * eased, decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (counters.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target); // anima só uma vez
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     3. ANO NO RODAPÉ
     ------------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
