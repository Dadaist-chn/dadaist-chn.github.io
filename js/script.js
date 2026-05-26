/* =========================================================
   Language toggle  +  small UX niceties
   ========================================================= */
(function () {
  'use strict';

  const LS_KEY = 'yx-lang';
  const root   = document.documentElement;

  function getInitialLang() {
    const saved = localStorage.getItem(LS_KEY);
    if (saved === 'en' || saved === 'zh') return saved;
    const nav = (navigator.language || 'en').toLowerCase();
    return nav.startsWith('zh') ? 'zh' : 'en';
  }

  /** Apply the chosen language to every element marked with data-en / data-zh. */
  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

    // Text content
    document.querySelectorAll('[data-en][data-zh]').forEach(el => {
      const txt = el.getAttribute(lang === 'zh' ? 'data-zh' : 'data-en');
      if (txt != null) el.textContent = txt;
    });

    // Per-language href (e.g. the CV download button)
    document.querySelectorAll('[data-en-href][data-zh-href]').forEach(el => {
      const href = el.getAttribute(lang === 'zh' ? 'data-zh-href' : 'data-en-href');
      if (href) el.setAttribute('href', href);
    });

    // Page title
    document.title = lang === 'zh'
      ? '徐寅达 · Yinda Xu — 阿尔托大学博士研究生'
      : 'Yinda Xu · 徐寅达 — Doctoral Researcher, Aalto University';

    localStorage.setItem(LS_KEY, lang);
  }

  // Wire up the toggle
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-lang') === 'zh' ? 'en' : 'zh';
      applyLang(next);
    });
  }

  // Initial application
  applyLang(getInitialLang());

  /* -------- Phone tile: copy numbers on click (no real link) -------- */
  const phoneTile = document.getElementById('phone-tile');
  if (phoneTile) {
    phoneTile.addEventListener('click', (e) => {
      e.preventDefault();
      const numbers = '+358 50 471 2336 / +86 133 3660 2310';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(numbers).then(() => {
          flashTile(phoneTile,
            root.getAttribute('data-lang') === 'zh' ? '已复制' : 'Copied');
        });
      }
    });
  }

  function flashTile(tile, msg) {
    const val = tile.querySelector('.tile-val');
    if (!val) return;
    const original = val.textContent;
    val.textContent = msg;
    setTimeout(() => { val.textContent = original; }, 1200);
  }

  /* -------- Scroll-reveal: fade sections in as they enter view -------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.section, .hero').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      io.observe(el);
    });
  }
})();
