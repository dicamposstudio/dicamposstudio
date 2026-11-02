/* Instalação única do GTM em todas as páginas; eventos são encaminhados pelas tags do contêiner. */
(() => {
  'use strict';
  if (window.dicamposTagManagerLoaded) return;
  window.dicamposTagManagerLoaded = true;
  window.dataLayer = window.dataLayer || [];
  // Disponibiliza os dados da página antes do GTM, sem disparar eventos antecipadamente.
  const pageContext = {
    page_type:document.documentElement.dataset.pageType || 'page',
    page_category:document.documentElement.dataset.pageCategory || 'Institucional',
    page_title:document.title,
    page_path:location.pathname
  };
  window.dataLayer.push(pageContext);
  // Inicializa o contêiner antes de emitir eventos personalizados.
  window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
  window.dataLayer.push({event:'page_context',...pageContext});
  const script = document.createElement('script');
  script.async = true; script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5DW4BRTP';
  document.head.appendChild(script);
})();
