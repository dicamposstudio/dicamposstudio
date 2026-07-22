const header=document.querySelector('.site-header');const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');const year=document.querySelector('#ano-atual');if(year)year.textContent=new Date().getFullYear();window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>16),{passive:true});function closeMenu(){nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}toggle?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');toggle.setAttribute('aria-expanded',String(!!open))});document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});const items=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});items.forEach(x=>io.observe(x))}else items.forEach(x=>x.classList.add('is-visible'));

function trackEvent(name,params={}){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...params});if(typeof window.gtag==='function')window.gtag('event',name,params)}
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;const explicit=a.dataset.track;const href=a.href||'';let event=explicit;if(!event&&href.includes('wa.me'))event='whatsapp_click';if(!event&&href.startsWith('tel:'))event='phone_click';if(event)trackEvent(event,{link_text:a.textContent.trim(),link_url:href,page_path:location.pathname})});

const simpleForm=document.querySelector('.diagnostic-form');simpleForm?.addEventListener('submit',e=>{e.preventDefault();if(!simpleForm.reportValidity())return;const d=new FormData(simpleForm);const msg=`Olá! Visitei o site da DiCampos Studio e gostaria de solicitar um diagnóstico digital.\n\n*Nome:* ${d.get('nome')}\n*Empresa:* ${d.get('empresa')}\n*WhatsApp:* ${d.get('telefone')}\n*Principal desafio:* ${d.get('desafio')}\n*Contexto:* ${d.get('mensagem')}`;trackEvent('generate_lead',{form_name:'diagnostico_home'});window.open('https://wa.me/5581997782751?text='+encodeURIComponent(msg),'_blank','noopener')});

const qForm=document.querySelector('.qualified-diagnostic-form');if(qForm){const steps=[...qForm.querySelectorAll('.form-step')];const progress=[...document.querySelectorAll('.form-progress span')];let current=0;function showStep(n){steps.forEach((s,i)=>s.classList.toggle('active',i===n));progress.forEach((s,i)=>s.classList.toggle('active',i<=n));current=n;window.scrollTo({top:Math.max(0,qForm.getBoundingClientRect().top+scrollY-110),behavior:'smooth'})}function validateStep(){const fields=[...steps[current].querySelectorAll('input,select,textarea')];for(const field of fields){if(!field.checkValidity()){field.reportValidity();return false}}return true}qForm.querySelectorAll('.next-step').forEach(b=>b.addEventListener('click',()=>{if(validateStep())showStep(Math.min(current+1,steps.length-1))}));qForm.querySelectorAll('.prev-step').forEach(b=>b.addEventListener('click',()=>showStep(Math.max(current-1,0))));qForm.addEventListener('submit',e=>{e.preventDefault();if(!qForm.reportValidity())return;const d=new FormData(qForm);const rows=[['Nome',d.get('nome')],['Empresa',d.get('empresa')],['WhatsApp',d.get('telefone')],['Segmento',d.get('segmento')],['Objetivo',d.get('objetivo')],['Situação do site',d.get('possui_site')],['Site/perfil',d.get('url')||'Não informado'],['Anúncios',d.get('anuncios')],['Investimento previsto',d.get('orcamento')],['Prazo',d.get('prazo')],['Principal desafio',d.get('mensagem')]];const msg='Olá! Preenchi o Diagnóstico Digital da DiCampos Studio.\n\n'+rows.map(([k,v])=>`*${k}:* ${v}`).join('\n');trackEvent('generate_lead',{form_name:'diagnostico_qualificado',lead_objective:d.get('objetivo'),budget_range:d.get('orcamento')});sessionStorage.setItem('dicamposDiagnosticMessage',msg);window.open('https://wa.me/5581997782751?text='+encodeURIComponent(msg),'_blank','noopener');setTimeout(()=>location.href=qForm.dataset.thankyou||'obrigado.html',450)});}

// Máscara visual simples para WhatsApp
const phone=document.querySelector('input[name="telefone"]');phone?.addEventListener('input',()=>{let v=phone.value.replace(/\D/g,'').slice(0,11);if(v.length>10)v=v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');else if(v.length>6)v=v.replace(/(\d{2})(\d{4})(\d+)/,'($1) $2-$3');else if(v.length>2)v=v.replace(/(\d{2})(\d+)/,'($1) $2');phone.value=v});


// Sprint 6 — navegação acessível e redução de movimento
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(toggle&&nav){toggle.addEventListener('keydown',e=>{if(e.key==='ArrowDown'&&nav.classList.contains('open')){e.preventDefault();nav.querySelector('a')?.focus()}});document.addEventListener('click',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!toggle.contains(e.target))closeMenu()});}
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{const id=link.getAttribute('href').slice(1);const target=id&&document.getElementById(id);if(target&&!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');if(target&&!reduceMotion)setTimeout(()=>target.focus({preventScroll:true}),350)}));
window.addEventListener('pageshow',()=>document.documentElement.classList.add('page-ready'),{once:true});

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
