/* DiCampos Studio v3.4 — Analytics & Inteligência de Dados */
(() => {
  'use strict';
  window.dataLayer = window.dataLayer || [];

  const pageContext = window.dataLayer.find(item => item && item.event === 'page_context') || {};
  const clean = value => String(value || '').replace(/\s+/g, ' ').trim().slice(0, 200);
  const path = location.pathname;
  const fired = new Set();

  function push(event, params = {}) {
    const payload = {
      event,
      page_type: pageContext.page_type || 'page',
      page_category: pageContext.page_category || 'Institucional',
      page_title: document.title,
      page_path: path,
      ...params
    };
    window.dataLayer.push(payload);
    document.dispatchEvent(new CustomEvent('dicampos:analytics', { detail: payload }));
  }
  window.dicamposTrack = push;

  const positionOf = element => {
    if (element.closest('header')) return 'header';
    if (element.closest('.hero,.service-hero,.article-hero')) return 'hero';
    if (element.closest('footer')) return 'footer';
    if (element.closest('.mobile-conversion-bar')) return 'mobile_bar';
    if (element.closest('.whatsapp-smart')) return 'floating_widget';
    if (element.closest('article')) return 'article_body';
    return 'content';
  };

  document.addEventListener('click', event => {
    const link = event.target.closest('a,button');
    if (!link) return;
    const href = link.href || '';
    const text = clean(link.textContent || link.getAttribute('aria-label'));
    const common = { link_text: text, link_url: href, element_position: positionOf(link) };

    if (/wa\.me|api\.whatsapp\.com/i.test(href)) push('contact_whatsapp', common);
    else if (/^tel:/i.test(href)) push('contact_phone', common);
    else if (/^mailto:/i.test(href)) push('contact_email', common);

    if (link.matches('[data-conversion-cta], [data-track*="diagnostic"], a[href*="diagnostico"]')) {
      push('diagnostic_request', { ...common, cta_name: clean(link.dataset.track || 'diagnostic') });
    }
    if (link.matches('a[download], [data-track*="download"]')) {
      push('file_download_custom', { ...common, file_name: href.split('/').pop() });
    }
    if (pageContext.page_type === 'article' && link.closest('main')) {
      if (link.matches('[data-conversion-cta], a[href*="diagnostico"], a[href*="wa.me"]')) push('article_cta_click', common);
      if (link.closest('.related-grid,.related-content,.article-related')) push('related_article_click', common);
    }
    if (link.closest('.project-card,[class*="case-"]') || /case-/.test(href)) push('portfolio_view', common);
    if (link.closest('.solution-card,.service-card,.related-grid') || /criacao-de-sites|seo\.html|google-ads\.html|meta-ads\.html|landing-pages\.html/.test(href)) push('service_interest', common);
  }, { capture: true });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => push('form_submit', {
      form_name: clean(form.getAttribute('name') || form.id || form.className || 'form'),
      form_destination: clean(form.getAttribute('action') || 'javascript')
    }));
  });

  if (pageContext.page_type === 'article') {
    push('article_open', { article_title: document.querySelector('h1')?.textContent?.trim() || document.title });
    const milestones = [25, 50, 75, 90];
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (max <= 0) return;
      const percent = Math.round((scrollY / max) * 100);
      milestones.forEach(m => {
        const key = `article_read_${m}`;
        if (percent >= m && !fired.has(key)) {
          fired.add(key);
          push(key, { article_title: document.querySelector('h1')?.textContent?.trim() || document.title, scroll_percent: m });
        }
      });
      if (fired.size === milestones.length) removeEventListener('scroll', onScroll);
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const search = document.querySelector('#article-search');
  let searchTimer;
  search?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      const term = clean(search.value);
      if (term.length >= 2) push('knowledge_search', { search_term: term });
    }, 700);
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    push('knowledge_filter', { filter_name: clean(button.dataset.filter) });
  }));

  const timeMarks = [30, 60, 120];
  timeMarks.forEach(seconds => setTimeout(() => push('engaged_time', { engagement_seconds: seconds }), seconds * 1000));

  if (pageContext.page_type === 'thank_you') push('lead_generated', { lead_source: sessionStorage.getItem('dicamposDiagnosticMessage') ? 'diagnostic_form' : 'unknown' });
})();
