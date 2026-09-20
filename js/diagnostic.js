/* DiCampos Studio — diagnóstico e recuperação, sem registrar mensagem preparada como lead. */
(() => {
  'use strict';
  const key = 'dicamposDiagnosticDraftV2';
  const ttl = 2 * 60 * 60 * 1000;
  const whatsapp = 'https://wa.me/5581997782751';
  const track = (event, params = {}) => window.dicamposTrack?.(event, params);
  const readDraft = () => {
    try {
      const draft = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (draft && typeof draft.message === 'string' && draft.message.length <= 6000 &&
          Number.isFinite(draft.createdAt) && Date.now() - draft.createdAt >= 0 && Date.now() - draft.createdAt < ttl) return draft;
      sessionStorage.removeItem(key);
    } catch (_) { /* A navegação e o contato continuam disponíveis sem armazenamento. */ }
    return null;
  };
  function showDraft(panel, draft) {
    if (!panel) return;
    panel.hidden = false;
    const preview = panel.querySelector('[data-message-preview]');
    const link = panel.querySelector('[data-diagnostic-whatsapp]');
    const copy = panel.querySelector('[data-copy-message]');
    const status = panel.querySelector('[data-copy-status]');
    if (preview) preview.value = draft.message;
    if (link) link.onclick = () => {
      track('contact_whatsapp', {link_url:whatsapp,element_position:'diagnostic_review',form_name:'diagnostico'});
      window.open(whatsapp + '?text=' + encodeURIComponent(draft.message), '_blank', 'noopener,noreferrer');
    };
    if (copy) copy.onclick = async () => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(draft.message);
        if (status) status.textContent = 'Mensagem copiada. Cole na conversa do WhatsApp.';
      } catch (_) {
        if (preview) { preview.focus(); preview.select(); }
        if (status) status.textContent = 'Selecione a mensagem acima e use a opção Copiar do seu dispositivo.';
      }
    };
  }
  const recovery = document.querySelector('[data-diagnostic-recovery]');
  if (document.body.dataset.diagnosticPage === 'confirmation') {
    const draft = readDraft();
    if (draft) {
      showDraft(recovery, draft);
      document.querySelector('[data-no-draft]')?.setAttribute('hidden', '');
    }
  }
  const form = document.querySelector('.qualified-diagnostic-form');
  if (!form) return;
  form.noValidate = true;
  const steps = [...form.querySelectorAll('.form-step')];
  const progress = [...document.querySelectorAll('.form-progress span')];
  const live = document.querySelector('[data-step-status]');
  const phone = form.elements.telefone;
  const name = form.elements.nome;
  let current = 0;
  let lastMessage = '';
  let lastDraft = null;
  const digits = value => {
    let result = value.replace(/\D/g, '');
    if ((result.length === 12 || result.length === 13) && result.startsWith('55')) result = result.slice(2);
    return result;
  };
  function checkPhone() {
    const value = digits(phone.value);
    const ddds = new Set(['11','12','13','14','15','16','17','18','19','21','22','24','27','28','31','32','33','34','35','37','38','41','42','43','44','45','46','47','48','49','51','53','54','55','61','62','63','64','65','66','67','68','69','71','73','74','75','77','79','81','82','83','84','85','86','87','88','89','91','92','93','94','95','96','97','98','99']);
    const valid = ddds.has(value.slice(0,2)) && /^\d{2}(?:[2-5]\d{7}|9\d{8})$/.test(value);
    phone.setCustomValidity(valid ? '' : 'Informe um telefone com DDD e 10 ou 11 dígitos.');
  }
  function errorFor(field) {
    const id = 'error-' + field.name;
    let error = document.getElementById(id);
    if (!error) {
      error = document.createElement('span'); error.id = id; error.className = 'field-error';
      error.hidden = true;
      field.closest('label')?.appendChild(error);
      const ids = new Set((field.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
      ids.add(id); field.setAttribute('aria-describedby', [...ids].join(' '));
    }
    return error;
  }
  function validate(field, reveal = true) {
    if (field === phone) checkPhone();
    if (field === name) field.setCustomValidity(field.value.trim().length >= 2 ? '' : 'Informe seu nome com pelo menos dois caracteres.');
    if (field.name === 'mensagem') field.setCustomValidity(field.value.trim() ? '' : 'Conte brevemente o principal desafio.');
    const valid = field.validity.valid;
    if (reveal || valid) {
      const error = errorFor(field);
      error.textContent = valid ? '' : (field.validationMessage || 'Revise este campo.');
      error.hidden = valid;
      if (valid) field.removeAttribute('aria-invalid'); else field.setAttribute('aria-invalid', 'true');
    }
    return valid;
  }
  function showStep(index, moveFocus = true) {
    current = index;
    steps.forEach((step, i) => {
      step.hidden = i !== index; step.disabled = i !== index;
      step.classList.toggle('active', i === index);
    });
    progress.forEach((item, i) => {
      item.classList.toggle('active', i <= index);
      if (i === index) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
    });
    if (live) live.textContent = `Etapa ${index + 1} de ${steps.length}: ${steps[index].querySelector('legend').textContent}.`;
    if (moveFocus) {
      const legend = steps[index].querySelector('legend');
      legend.tabIndex = -1; legend.focus();
      form.scrollIntoView?.({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }
  function validateStep(index) {
    const fields = [...steps[index].querySelectorAll('input,select,textarea')];
    const invalid = fields.filter(field => !validate(field));
    if (invalid.length) { invalid[0].focus(); return false; }
    return true;
  }
  form.addEventListener('input', event => {
    const field = event.target;
    if (!field.matches('input,select,textarea')) return;
    if (field === phone) {
      const d = digits(phone.value).slice(0, 11);
      phone.value = d.length > 10 ? d.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') :
        d.length > 6 ? d.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3') :
        d.length > 2 ? d.replace(/(\d{2})(\d+)/, '($1) $2') : d;
    }
    validate(field, field.hasAttribute('aria-invalid'));
    if (recovery) recovery.hidden = true;
  });
  form.querySelectorAll('.next-step').forEach(button => button.addEventListener('click', () => {
    if (validateStep(current)) showStep(Math.min(current + 1, steps.length - 1));
  }));
  form.querySelectorAll('.prev-step').forEach(button => button.addEventListener('click', () => showStep(Math.max(current - 1, 0))));
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (current < steps.length - 1) {
      if (validateStep(current)) showStep(current + 1);
      return;
    }
    // Campos ocultos não participam da validação nativa; todas as etapas são verificadas aqui.
    for (let i = 0; i < steps.length; i++) {
      steps[i].disabled = false;
      const invalid = [...steps[i].querySelectorAll('input,select,textarea')].filter(field => !validate(field));
      if (invalid.length) { showStep(i, false); invalid[0].focus(); return; }
    }
    const data = new FormData(form);
    showStep(current, false);
    const rows = [['Nome', data.get('nome')], ['WhatsApp', data.get('telefone')], ['Empresa', data.get('empresa')],
      ['Segmento', data.get('segmento')], ['Objetivo', data.get('objetivo')], ['Situação do site', data.get('possui_site')],
      ['Prazo', data.get('prazo')], ['Principal desafio', data.get('mensagem')]].filter(([,value]) => String(value || '').trim());
    const message = 'Olá! Preenchi o Diagnóstico Digital da DiCampos Studio.\n\n' + rows.map(([label,value]) => `*${label}:* ${String(value).trim()}`).join('\n');
    const draft = message === lastMessage && lastDraft ? lastDraft : { message, createdAt: Date.now() };
    if (message !== lastMessage) track('diagnostic_prepared', { form_name: 'diagnostico', lead_objective: String(data.get('objetivo')) });
    lastMessage = message; lastDraft = draft;
    let stored = false;
    try {
      sessionStorage.setItem(key, JSON.stringify(draft));
      sessionStorage.removeItem('dicamposDiagnosticMessage');
      stored = !!readDraft();
    } catch (_) { /* O painel abaixo preserva as respostas mesmo com storage bloqueado. */ }
    if (stored) window.location.assign(form.dataset.thankyou || 'obrigado.html');
    else {
      showDraft(recovery, draft);
      recovery?.querySelector('[data-diagnostic-whatsapp]')?.focus();
    }
  });
  showStep(0, false);
})();
