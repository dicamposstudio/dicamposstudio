const header=document.querySelector('.site-header');const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');const year=document.querySelector('#ano-atual');if(year)year.textContent=new Date().getFullYear();window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>16),{passive:true});function closeMenu(){nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Abrir menu');document.body.classList.remove('menu-open')}toggle?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');toggle.setAttribute('aria-expanded',String(!!open))});document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});const items=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});items.forEach(x=>io.observe(x))}else items.forEach(x=>x.classList.add('is-visible'));

function trackEvent(name,params={}){if(typeof window.dicamposTrack==='function'){window.dicamposTrack(name,params);return}window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...params})}

const simpleForm=document.querySelector('.diagnostic-form');simpleForm?.addEventListener('submit',e=>{e.preventDefault();if(!simpleForm.reportValidity())return;const d=new FormData(simpleForm);const msg=`Olá! Visitei o site da DiCampos Studio e gostaria de solicitar um diagnóstico digital.\n\n*Nome:* ${d.get('nome')}\n*Empresa:* ${d.get('empresa')}\n*WhatsApp:* ${d.get('telefone')}\n*Principal desafio:* ${d.get('desafio')}\n*Contexto:* ${d.get('mensagem')}`;trackEvent('generate_lead',{form_name:'diagnostico_home'});window.open('https://wa.me/5581997782751?text='+encodeURIComponent(msg),'_blank','noopener')});

const qForm=document.querySelector('.qualified-diagnostic-form');if(qForm){const steps=[...qForm.querySelectorAll('.form-step')];const progress=[...document.querySelectorAll('.form-progress span')];let current=0;function showStep(n){steps.forEach((s,i)=>s.classList.toggle('active',i===n));progress.forEach((s,i)=>s.classList.toggle('active',i<=n));current=n;window.scrollTo({top:Math.max(0,qForm.getBoundingClientRect().top+scrollY-110),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}function validateStep(){const fields=[...steps[current].querySelectorAll('input,select,textarea')];for(const field of fields){if(!field.checkValidity()){field.reportValidity();return false}}return true}qForm.querySelectorAll('.next-step').forEach(b=>b.addEventListener('click',()=>{if(validateStep())showStep(Math.min(current+1,steps.length-1))}));qForm.querySelectorAll('.prev-step').forEach(b=>b.addEventListener('click',()=>showStep(Math.max(current-1,0))));qForm.addEventListener('submit',e=>{e.preventDefault();if(!qForm.reportValidity())return;const d=new FormData(qForm);const rows=[['Nome',d.get('nome')],['WhatsApp',d.get('telefone')],['Empresa',d.get('empresa')],['Segmento',d.get('segmento')],['Objetivo',d.get('objetivo')],['Situação do site',d.get('possui_site')],['Prazo',d.get('prazo')],['Principal desafio',d.get('mensagem')]].filter(([,v])=>String(v||'').trim());const msg='Olá! Preenchi o Diagnóstico Digital da DiCampos Studio.\n\n'+rows.map(([k,v])=>`*${k}:* ${v}`).join('\n');trackEvent('generate_lead',{form_name:'diagnostico_qualificado',lead_objective:d.get('objetivo')});sessionStorage.setItem('dicamposDiagnosticMessage',msg);window.open('https://wa.me/5581997782751?text='+encodeURIComponent(msg),'_blank','noopener');setTimeout(()=>location.href=qForm.dataset.thankyou||'obrigado.html',450)});}

// Máscara visual simples para WhatsApp
const phone=document.querySelector('input[name="telefone"]');phone?.addEventListener('input',()=>{let v=phone.value.replace(/\D/g,'').slice(0,11);if(v.length>10)v=v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');else if(v.length>6)v=v.replace(/(\d{2})(\d{4})(\d+)/,'($1) $2-$3');else if(v.length>2)v=v.replace(/(\d{2})(\d+)/,'($1) $2');phone.value=v});


// Sprint 6 — navegação acessível e redução de movimento
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(toggle&&nav){toggle.addEventListener('keydown',e=>{if(e.key==='ArrowDown'&&nav.classList.contains('open')){e.preventDefault();nav.querySelector('a')?.focus()}});document.addEventListener('click',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!toggle.contains(e.target))closeMenu()});}
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{const id=link.getAttribute('href').slice(1);const target=id&&document.getElementById(id);if(target&&!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');if(target&&!reduceMotion)setTimeout(()=>target.focus({preventScroll:true}),350)}));
window.addEventListener('pageshow',()=>{document.documentElement.classList.add('page-ready');document.body.classList.remove('menu-open');nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Abrir menu')});

// Sprint 7 — acabamento final, navegação contextual e indicadores de leitura
(() => {
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.main-nav a[href]').forEach(link => {
    const url = new URL(link.getAttribute('href'), location.href);
    const linkPath = url.pathname.replace(/\/$/, '') || '/';
    if (!link.hash && linkPath === path) link.setAttribute('aria-current', 'page');
    else if (link.hash && linkPath === path && document.querySelector(link.hash)) link.addEventListener('click', () => link.setAttribute('aria-current', 'location'));
  });

  if (toggle) {
    const updateMenuLabel = () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('menu-open', expanded);
    };
    toggle.addEventListener('click', () => requestAnimationFrame(updateMenuLabel));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') requestAnimationFrame(updateMenuLabel); });
  }

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  const topButton = document.createElement('a');
  topButton.className = 'back-to-top';
  topButton.href = '#topo';
  topButton.setAttribute('aria-label', 'Voltar ao topo');
  topButton.textContent = '↑';
  document.body.appendChild(topButton);

  let ticking = false;
  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, (scrollY / max) * 100) : 0}%`;
    topButton.classList.toggle('visible', scrollY > 700);
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateScrollUI); ticking = true; }
  }, { passive: true });
  updateScrollUI();

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('invalid', e => {
      e.target.setAttribute('aria-invalid', 'true');
    }, true);
    form.addEventListener('input', e => e.target.removeAttribute('aria-invalid'));
  });
})();


// v3.2.1 — WhatsApp inteligente: contexto, expansão e pulse discreto
(() => {
  const widget = document.querySelector('.whatsapp-smart');
  if (!widget) return;

  const label = widget.querySelector('.whatsapp-smart-copy strong');
  const path = location.pathname.toLowerCase();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const contexts = [
    { test: /portfolio|case-/, label: 'Quero um projeto como este', message: 'Olá! Vi um projeto no portfólio da DiCampos Studio e gostaria de conversar sobre uma solução semelhante para minha empresa.' },
    { test: /seo/, label: 'Quero aparecer no Google', message: 'Olá! Gostaria de entender como a DiCampos Studio pode melhorar a presença da minha empresa no Google.' },
    { test: /google-ads/, label: 'Quero gerar mais clientes', message: 'Olá! Gostaria de conversar sobre Google Ads e geração de oportunidades para minha empresa.' },
    { test: /meta-ads/, label: 'Quero anunciar nas redes', message: 'Olá! Gostaria de conversar sobre Meta Ads para minha empresa.' },
    { test: /landing-page/, label: 'Quero aumentar conversões', message: 'Olá! Gostaria de criar ou melhorar uma landing page para gerar mais conversões.' },
    { test: /criacao-de-sites|sites-para-/, label: 'Quero um site profissional', message: 'Olá! Gostaria de conversar sobre a criação de um site profissional para minha empresa.' },
    { test: /blog|quanto-|guia|vale-a-pena/, label: 'Fiquei com uma dúvida', message: 'Olá! Li um conteúdo da DiCampos Studio e gostaria de tirar uma dúvida.' },
    { test: /diagnostico|obrigado/, label: 'Continuar pelo WhatsApp', message: 'Olá! Gostaria de continuar meu diagnóstico digital pelo WhatsApp.' }
  ];
  const fallback = { label: 'Solicite um diagnóstico gratuito', message: 'Olá! Gostaria de solicitar um diagnóstico digital para minha empresa.' };
  const current = contexts.find(item => item.test.test(path)) || fallback;

  const setMessage = (text) => { if (label && label.textContent !== text) label.textContent = text; };
  const setHref = (message) => { widget.href = 'https://wa.me/5581997782751?text=' + encodeURIComponent(message); };
  setMessage(current.label);
  setHref(current.message);

  const expand = () => widget.classList.add('is-expanded');
  const collapse = () => widget.classList.remove('is-expanded');
  const pulse = () => {
    if (reduced) return;
    widget.classList.remove('do-pulse');
    void widget.offsetWidth;
    widget.classList.add('do-pulse');
    setTimeout(() => widget.classList.remove('do-pulse'), 1600);
  };

  if (!reduced) {
    setTimeout(pulse, 5200);
    setInterval(pulse, 30000);
  }

  widget.addEventListener('mouseenter', expand);
  widget.addEventListener('focus', expand);
  widget.addEventListener('mouseleave', collapse);
  widget.addEventListener('blur', collapse);

  let journeyChanged = false;
  const updateJourney = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? scrollY / max : 0;
    if (progress >= .65 && !journeyChanged) {
      journeyChanged = true;
      setMessage('Vamos conversar sobre seu projeto?');
      setHref('Olá! Conheci melhor o trabalho da DiCampos Studio e gostaria de conversar sobre meu projeto.');
      pulse();
    }
  };
  addEventListener('scroll', updateJourney, { passive: true });
  updateJourney();
})();

// v3.2.1 — Entrega 2: microinterações leves e acessíveis
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interactive = document.querySelectorAll('.card,.project-card,.article-list article,.method-flow article,.case-steps article');

  if (!reduced && window.matchMedia('(hover:hover)').matches) {
    interactive.forEach(card => {
      card.dataset.microReady = 'true';
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      }, { passive: true });
    });
  }

  document.querySelectorAll('.btn,.nav-cta').forEach(control => {
    control.addEventListener('pointerdown', event => {
      if (reduced) return;
      const rect = control.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'micro-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      control.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    });
  });

  document.querySelectorAll('.solution-card>span,.feature-card>span,.method-flow article>span,.signal-list article>span').forEach(icon => icon.classList.add('icon-breathe'));
})();


// v3.2.1 — Entrega 3: sequência premium da primeira dobra
(() => {
  const hero = document.querySelector('.hero-premium');
  if (!hero) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const start = () => hero.classList.add('hero-is-ready');
  if (reduced) start();
  else requestAnimationFrame(() => requestAnimationFrame(start));
})();

// v3.2.1 — Entrega 4: performance percebida, jornada e mensuração de conversão
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = !!connection?.saveData;
  if (saveData || /(^|-)2g$/.test(connection?.effectiveType || '')) document.documentElement.classList.add('data-saver');

  let engaged = false;
  const markEngaged = source => {
    if (engaged) return;
    engaged = true;
    document.documentElement.classList.add('conversion-engaged');
    trackEvent('user_engaged_intent', { engagement_source: source, page_path: location.pathname });
    setTimeout(() => document.documentElement.classList.remove('conversion-engaged'), reduced ? 0 : 4200);
  };
  const engagementTimer = setTimeout(() => markEngaged('time_20s'), 20000);
  const checkDepth = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (max > 0 && scrollY / max >= .5) {
      clearTimeout(engagementTimer); markEngaged('scroll_50'); removeEventListener('scroll', checkDepth);
    }
  };
  addEventListener('scroll', checkDepth, { passive: true }); checkDepth();

  if ('IntersectionObserver' in window) {
    const observed = new Set();
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting || observed.has(entry.target)) return;
      observed.add(entry.target);
      trackEvent('section_view', { section_id: entry.target.id || entry.target.dataset.section || 'unnamed', page_path: location.pathname });
      sectionObserver.unobserve(entry.target);
    }), { threshold: .35 });
    document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
  }

  document.querySelectorAll('[data-conversion-cta]').forEach((cta, index) => cta.addEventListener('click', () => trackEvent('conversion_cta_click', {
    cta_text: cta.textContent.trim(), cta_position: index + 1, page_path: location.pathname
  })));
})();

// v3.3 — pesquisa e filtros da Central de Conhecimento
(() => {
  const grid = document.querySelector('#knowledge-grid');
  if (!grid) return;
  const input = document.querySelector('#article-search');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...grid.querySelectorAll('.blog-card')];
  const results = document.querySelector('#knowledge-results');
  const empty = document.querySelector('#knowledge-empty');
  let filter = 'all';
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const apply = () => {
    const term = normalize(input?.value || '');
    let visible = 0;
    cards.forEach(card => {
      const category = normalize(card.dataset.category || '');
      const text = normalize(card.dataset.search || card.textContent);
      const show = (filter === 'all' || category === normalize(filter)) && (!term || text.includes(term));
      card.hidden = !show; if (show) visible++;
    });
    if (results) results.textContent = `${visible} ${visible === 1 ? 'conteúdo encontrado' : 'conteúdos encontrados'}`;
    if (empty) empty.hidden = visible !== 0;
  };
  input?.addEventListener('input', apply);
  buttons.forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter || 'all';
    buttons.forEach(item => item.classList.toggle('active', item === button));
    apply();
  }));
  apply();
})();
