/* Instalação única do GTM em todas as páginas; eventos são encaminhados pelas tags do contêiner. */
(() => {
  'use strict';
  if (window.dicamposTagManagerLoaded) return;
  window.dicamposTagManagerLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event:'page_context',page_type:document.documentElement.dataset.pageType || 'page',
    page_category:document.documentElement.dataset.pageCategory || 'Institucional',page_title:document.title,page_path:location.pathname});
  window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
  const script = document.createElement('script');
  script.async = true; script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5DW4BRTP';
  document.head.appendChild(script);
})();
