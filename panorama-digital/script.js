/* O formulário só conta como enviado após a confirmação do Tally. */
(() => {
  'use strict';
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const iframe = document.querySelector('iframe[data-tally-src]');
  if (!iframe) return;
  const formId = 'lbXZx6';
  const url = new URL(iframe.dataset.tallySrc);
  const query = new URLSearchParams(location.search);
  for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
    const value = query.get(key);
    if (value && value.length <= 150 && !/@/.test(value)) url.searchParams.set(key,value);
  }
  iframe.dataset.tallySrc = url.toString();
  const submissions = new Set();
  let loaded = false;
  window.addEventListener('message',event => {
    if (event.origin !== 'https://tally.so' || event.source !== iframe.contentWindow) return;
    let data;
    try { data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data; } catch (_) { return; }
    if (!data || data.payload?.formId !== formId) return;
    const params = {form_name:'panorama_digital_2026'};
    if (data.event === 'Tally.FormLoaded' && !loaded) {
      loaded = true;
      window.dicamposTrack?.('panorama_form_loaded',params);
    }
    if (data.event === 'Tally.FormPageView' && Number.isInteger(data.payload.page))
      window.dicamposTrack?.('panorama_form_page_view',{...params,form_page:data.payload.page});
    if (data.event !== 'Tally.FormSubmitted' || typeof data.payload.id !== 'string' || !data.payload.id) return;
    const id = data.payload.id.slice(0,120);
    const key = 'dicamposPanoramaSubmission';
    if (submissions.has(id)) return;
    try { if (sessionStorage.getItem(key) === id) return; } catch (_) {}
    submissions.add(id);
    try { sessionStorage.setItem(key,id); } catch (_) {}
    // Não envia respostas, nomes, e-mails ou identificadores do respondente ao Analytics.
    window.dicamposTrack?.('panorama_form_submitted',params);
  });
  const load = () => {
    if (window.Tally) window.Tally.loadEmbeds();
    else if (!iframe.src) iframe.src = iframe.dataset.tallySrc;
  };
  if (window.Tally) load();
  else {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true; script.onload = load; script.onerror = load;
    document.body.appendChild(script);
  }
})();
