/* DiCampos Studio — eventos sem respostas pessoais e sem conversão por visita ao agradecimento. */
(() => {
  'use strict';
  if (window.dicamposTrack) return;
  window.dataLayer = window.dataLayer || [];
  const context = window.dataLayer.find(item => item?.event === 'page_context') || {};
  const clean = value => String(value || '').replace(/\s+/g, ' ').trim().slice(0, 150);
  const allowed = new Set(['contact_whatsapp','contact_phone','contact_email','diagnostic_request','diagnostic_prepared',
    'diagnostic_start','file_download_custom','article_open','article_read_25','article_read_50','article_read_75','article_read_90',
    'article_cta_click','related_article_click','portfolio_view','service_interest','knowledge_search','knowledge_filter',
    'engaged_time','section_view','user_engaged_intent','conversion_cta_click','panorama_form_loaded','panorama_form_page_view',
    'panorama_form_submitted']);
  const paramKeys = new Set(['link_text','link_url','element_position','cta_name','file_name','article_title','scroll_percent',
    'search_term','filter_name','engagement_seconds','form_name','lead_objective','section_id','engagement_source','cta_text','cta_position','form_page']);
  function safeUrl(value) {
    try {
      const url = new URL(value, location.href);
      if (!/^https?:$/.test(url.protocol)) return url.protocol;
      return url.origin + url.pathname; // Exclui respostas do WhatsApp, buscas e parâmetros de URL.
    } catch (_) { return ''; }
  }
  function push(event, params = {}) {
    if (!allowed.has(event)) return;
    const payload = {...Object.fromEntries([...paramKeys].map(key => [key,undefined])),event,page_type:context.page_type || 'page',page_category:context.page_category || 'Institucional',
      page_title:document.title,page_path:location.pathname};
    for (const [key,value] of Object.entries(params)) {
      if (!paramKeys.has(key)) continue;
      payload[key] = key === 'link_url' ? safeUrl(value) : typeof value === 'number' ? value : clean(value);
    }
    window.dataLayer.push(payload);
  }
  window.dicamposTrack = push;
  const positionOf = element => element.closest('header') ? 'header' : element.closest('.mobile-conversion-bar') ? 'mobile_bar' :
    element.closest('.whatsapp-smart') ? 'floating_widget' : element.closest('footer') ? 'footer' :
    element.closest('.hero,.service-hero,.article-hero') ? 'hero' : element.closest('article') ? 'article_body' : 'content';
  document.addEventListener('click', event => {
    const link = event.target.closest('a,button');
    if (!link) return;
    const href = link.href || '';
    const common = {link_text:clean(link.textContent || link.getAttribute('aria-label')),link_url:href,element_position:positionOf(link)};
    let url; try { url = new URL(href, location.href); } catch (_) {}
    if (url && ['wa.me','api.whatsapp.com','web.whatsapp.com'].includes(url.hostname)) push('contact_whatsapp',common);
    else if (/^tel:/i.test(href)) push('contact_phone',{element_position:common.element_position});
    else if (/^mailto:/i.test(href)) push('contact_email',{element_position:common.element_position});
    if (link.matches('[data-conversion-cta],[data-track*="diagnostic"],a[href*="diagnostico"]'))
      push('diagnostic_request',{...common,cta_name:clean(link.dataset.track || 'diagnostic')});
    if (link.matches('a[download],[data-download],[data-track*="download"]'))
      push('file_download_custom',{...common,file_name:url?.pathname.split('/').pop() || ''});
    if (context.page_type === 'article' && link.closest('main')) {
      if (link.matches('[data-conversion-cta],a[href*="diagnostico"],a[href*="wa.me"]')) push('article_cta_click',common);
      if (link.closest('.related-grid,.related-content,.article-related')) push('related_article_click',common);
    }
    if (/case-/.test(url?.pathname || '')) push('portfolio_view',common);
    if (/\/(criacao-de-sites|seo|google-ads|meta-ads|landing-pages)(-recife)?\.html$/.test(url?.pathname || '')) push('service_interest',common);
  },{capture:true});
  const form = document.querySelector('.qualified-diagnostic-form');
  form?.addEventListener('input',() => push('diagnostic_start',{form_name:'diagnostico'}),{once:true});
  if (context.page_type === 'article') {
    const articleTitle = document.querySelector('h1')?.textContent || document.title;
    push('article_open',{article_title:articleTitle});
    const fired = new Set();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (max <= 0) return;
      const percent = Math.round(scrollY / max * 100);
      [25,50,75,90].forEach(m => {if(percent >= m && !fired.has(m)){fired.add(m);push('article_read_'+m,{article_title:articleTitle,scroll_percent:m});}});
      if(fired.size===4) removeEventListener('scroll',onScroll);
    };
    addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }
  let searchTimer;
  document.querySelector('#article-search')?.addEventListener('input', event => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      const term = clean(event.target.value).slice(0,80);
      if (term.length >= 2 && !/@|\d{5}|https?:/i.test(term)) push('knowledge_search',{search_term:term});
    },700);
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click',() => push('knowledge_filter',{filter_name:button.dataset.filter})));
  // Conta somente permanência em aba visível, em vez de tempo decorrido em segundo plano.
  let elapsed = 0;
  const timer = setInterval(() => {
    if(document.hidden) return;
    elapsed++;
    if([30,60,120].includes(elapsed)) push('engaged_time',{engagement_seconds:elapsed});
    if(elapsed>=120) clearInterval(timer);
  },1000);
  addEventListener('pagehide',()=>clearInterval(timer),{once:true});
})();
