/* Prévia de interface: interações locais, sem coleta de dados ou formulário real. */
(() => {
  'use strict';
  const root = document.getElementById('dc-preview');
  if (!root) return;
  const $ = selector => root.querySelector(selector);
  const $$ = selector => [...root.querySelectorAll(selector)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = !!navigator.connection?.saveData;
  const stage = $('.dc-stage');
  if (!reduced.matches && !saveData && window.innerWidth > 700) {
    requestAnimationFrame(() => stage?.classList.add('dc-play'));
  }
  reduced.addEventListener?.('change', () => stage?.classList.remove('dc-play'));
  const changeScene = element => {
    if (!element || reduced.matches || saveData) return;
    element.classList.remove('dc-scene-change');
    requestAnimationFrame(() => element.classList.add('dc-scene-change'));
  };
  $('#dc-year').textContent = String(new Date().getFullYear());

  const menuButton = $('.dc-menu-toggle');
  const menu = $('#dc-mobile-menu');
  const setMenu = open => {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  menuButton.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) { setMenu(false); menuButton.focus(); }
  });
  document.addEventListener('click', event => {
    if (!menu.hidden && !menu.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });
  const smallScreen = window.matchMedia('(max-width: 900px)');
  smallScreen.addEventListener?.('change', event => { if (!event.matches) setMenu(false); });

  const projects = {
    linha: {
      name:'Linha Verde Spas e Piscinas', category:'PISCINAS & LAZER', image:'assets/layout/linha-verde-site.webp',
      alt:'Página inicial do site Linha Verde Spas e Piscinas', visit:'https://dicamposstudio.github.io/linha-verde-spas-piscinas/',
      case:'pages/case-linha-verde-spas-piscinas.html',
      description:'Transformar interesse em uma conversa bem orientada sobre a área de lazer.',
      goal:'Apresentar as soluções e facilitar pedidos de orçamento.',
      build:'Produtos organizados, contexto regional e contato direto com a equipe.',
      measure:'Ações de contato e origem das visitas para orientar a evolução.'
    },
    uillian: {
      name:'Uillian Novaes Tattoo', category:'TATUAGEM AUTORAL', image:'assets/layout/uillian-site.webp',
      alt:'Página inicial do site Uillian Novaes Tattoo', visit:'https://dicamposstudio.github.io/uillian-tattoo/',
      case:'pages/case-uillian-novaes-tattoo.html',
      description:'Uma experiência que apresenta a identidade do artista antes do primeiro contato.',
      goal:'Valorizar o trabalho autoral e facilitar conversas sobre novos projetos.',
      build:'Portfólio em destaque, processo explicado e caminho direto para agendamento.',
      measure:'Interesse nos projetos e ações de contato, com contexto sobre a origem das visitas.'
    },
    marina: {
      name:'Marina Domingos — Saúde Predial', category:'VISTORIAS & LAUDOS', image:'assets/portfolio/marina-domingos-site.webp',
      alt:'Site publicado de Marina Domingos: serviços de vistoria e laudos técnicos', visit:'https://marinadomingos.com.br/',
      case:'pages/case-marina-domingos.html',
      description:'Uma presença profissional que explica o serviço e orienta o primeiro contato.',
      goal:'Ajudar a pessoa a entender qual vistoria atende à sua necessidade.',
      build:'Páginas de serviços, casos reais, conteúdos e formulário que prepara uma mensagem para o WhatsApp.',
      measure:'Origem das visitas e solicitações, conciliadas com o atendimento para avaliar a qualidade dos contatos.'
    },
    corretor: {
      name:'Corretor de Imóveis', category:'MERCADO IMOBILIÁRIO', image:'assets/portfolio/corretor-demo-site.webp', demo:true,
      alt:'Demonstração de site para corretor de imóveis, com catálogo e filtros', visit:'https://dicamposstudio.github.io/corretor-imoveis/',
      case:'pages/case-corretor-imoveis-premium.html',
      description:'Um modelo para explorar a apresentação de imóveis e o caminho até o atendimento.',
      goal:'Organizar a oferta de imóveis e facilitar pedidos de informações.',
      build:'Demonstração com catálogo, opções de filtro e caminhos para compradores e proprietários.',
      measure:'Em uma implantação real: imóveis consultados e contatos qualificados. O modelo não apresenta resultados comerciais.'
    },
    dutop: {
      name:'Dutop Industrial', category:'CATÁLOGO DE EQUIPAMENTOS', image:'assets/portfolio/dutop-demo-site.webp', demo:true,
      alt:'Demonstração do catálogo Dutop Industrial, com equipamentos de cozinha', visit:'https://dicamposstudio.github.io/dutop-demo/',
      case:'pages/case-dutop-industrial.html',
      description:'Uma demonstração de catálogo que aproxima a escolha do produto da conversa comercial.',
      goal:'Apresentar equipamentos e organizar uma solicitação de orçamento.',
      build:'Categorias, produtos e formulário que prepara uma mensagem para o WhatsApp, com dados de exemplo.',
      measure:'Em uma implantação real: interesse nos produtos e orçamentos recebidos. Integrações dependem do escopo.'
    }
  };
  const projectButtons = $$('[data-project]');
  projectButtons.forEach(button => button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project || button.getAttribute('aria-pressed') === 'true') return;
    projectButtons.forEach(item => item.setAttribute('aria-pressed',String(item === button)));
    for (const key of ['name','category','description','goal','build','measure']) $('#dc-project-'+key).textContent = project[key];
    const shot = $('#dc-project-shot'); shot.src = project.image; shot.alt = project.alt;
    $('#dc-project-visit').href = project.visit;
    $('#dc-project-case').href = project.case;
    $('#dc-project-status').textContent = project.demo ? 'PROJETO DEMONSTRATIVO' : 'PROJETO PUBLICADO';
    $('#dc-project-status').dataset.kind = project.demo ? 'demo' : 'published';
    $('#dc-project-visit-label').textContent = project.demo ? 'Explorar demonstração' : 'Visitar site publicado';
    changeScene($('#dc-project-detail'));
  }));

  const goals = {
    orcamentos: {
      number:'01', title:'Mais contexto. Uma conversa melhor.',
      description:'Ajude a pessoa a entender seu serviço e chegar ao atendimento sabendo o que pode pedir.',
      list:['Oferta e área de atendimento claras','Provas reais próximas à decisão','Formulário enxuto ou WhatsApp com contexto'],
      metric:'Solicitações recebidas, contatos qualificados e propostas geradas.',
      nav:'Serviços · Projetos · Contato',tag:'SERVIÇO COM OBJETIVO CLARO',
      demoTitle:'O projeto que você imagina começa com uma boa conversa.',
      demoDescription:'Uma oferta compreensível, exemplos do trabalho e um próximo passo fácil de encontrar.',
      proof:['Escopo claro','Projetos reais'],action:'Solicitar orçamento',caption:'Oferta → confiança → pedido de orçamento',
      responseTitle:'Um contato com contexto.',responseBody:'No projeto real, este passo pode abrir um formulário com serviço, necessidade e prazo, ou uma conversa no WhatsApp.'
    },
    autoridade: {
      number:'02', title:'Sua experiência precisa ser percebida.',
      description:'Mostre quem está por trás da entrega, como trabalha e quais evidências ajudam o cliente a escolher.',
      list:['Portfólio com contexto e decisões','Método e responsabilidades explicados','Apresentação profissional e provas autorizadas'],
      metric:'Visitas aos cases, contatos com intenção de contratar e qualidade das oportunidades.',
      nav:'Sobre · Cases · Método',tag:'EXPERIÊNCIA QUE PODE SER CONHECIDA',
      demoTitle:'Um trabalho que você pode conhecer antes de escolher.',
      demoDescription:'Projetos apresentados com contexto, decisões e evidências. Uma forma de avaliar a experiência por trás da entrega.',
      proof:['Cases documentados','Processo transparente'],action:'Explorar um projeto',caption:'Identidade → evidência → confiança',
      responseTitle:'Uma prova que pode ser explorada.',responseBody:'No projeto real, a pessoa conhece o desafio, as decisões e as evidências de cada case. Depoimentos e resultados só entram com contexto e autorização.'
    },
    vendas: {
      number:'03', title:'Menos dúvidas no caminho da compra.',
      description:'Dê ao visitante as informações necessárias para comparar opções e avançar para a compra ou o atendimento.',
      list:['Produtos e condições bem apresentados','Detalhes que respondem às dúvidas da compra','Checkout ou pedido assistido, conforme o negócio'],
      metric:'Pedidos, compras confirmadas e receita, conciliados com a operação e seus custos.',
      nav:'Produtos · Como comprar · Ajuda',tag:'INFORMAÇÃO QUE APOIA A ESCOLHA',
      demoTitle:'Encontre a opção que faz sentido para você.',
      demoDescription:'Compare características, entenda as condições e veja como receber orientação para concluir sua compra.',
      proof:['Detalhes do produto','Condições claras'],action:'Ver como comprar',caption:'Produto → decisão → compra ou atendimento',
      responseTitle:'Um próximo passo adequado à operação.',responseBody:'No projeto real, este caminho leva ao checkout ou ao pedido assistido. Disponibilidade, frete e condições precisam refletir o que a empresa consegue entregar.'
    }
  };
  let currentGoal = 'orcamentos';
  const action = $('#dc-demo-action');
  const response = $('#dc-demo-response');
  action.setAttribute('aria-controls','dc-demo-response');
  action.setAttribute('aria-expanded','false');
  const hideResponse = () => { response.hidden = true; action.setAttribute('aria-expanded','false'); };
  const goalButtons = $$('[data-goal]');
  goalButtons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.goal;
    const goal = goals[key];
    if (!goal || key === currentGoal) return;
    currentGoal = key;
    goalButtons.forEach(item => item.setAttribute('aria-pressed',String(item === button)));
    $('#dc-goal-panel').dataset.activeGoal = key;
    for (const field of ['number','title','description','metric']) $('#dc-goal-'+field).textContent = goal[field];
    $('#dc-goal-list').replaceChildren(...goal.list.map(text => { const item=document.createElement('li');item.textContent=text;return item; }));
    $('#dc-demo-nav-text').textContent = goal.nav;
    $('#dc-demo-tag').textContent = goal.tag;
    $('#dc-demo-title').textContent = goal.demoTitle;
    $('#dc-demo-description').textContent = goal.demoDescription;
    $('#dc-demo-caption').textContent = goal.caption;
    $('#dc-demo-proof').replaceChildren(...goal.proof.flatMap(text => {
      const mark=document.createElement('span');mark.setAttribute('aria-hidden','true');mark.textContent='✓';
      const label=document.createElement('span');label.textContent=text;return [mark,label];
    }));
    action.replaceChildren(document.createTextNode(goal.action+' '));
    const arrow=document.createElement('span');arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';action.appendChild(arrow);
    hideResponse();
    changeScene($('.dc-demo-site'));
    changeScene($('.dc-goal-copy'));
  }));
  action.addEventListener('click', () => {
    const goal = goals[currentGoal];
    $('#dc-demo-response-title').textContent = goal.responseTitle;
    $('#dc-demo-response-body').textContent = goal.responseBody;
    response.hidden = false;
    action.setAttribute('aria-expanded','true');
  });
  $('#dc-demo-reset').addEventListener('click', () => { hideResponse(); action.focus(); });
})();
