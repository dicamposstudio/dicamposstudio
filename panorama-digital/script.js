document.getElementById('year')?.append(new Date().getFullYear());

// Mantém os parâmetros UTM disponíveis para o Tally incorporado.
(function forwardQueryToTally(){
  const iframe=document.querySelector('iframe[data-tally-src]');
  if(!iframe || !location.search) return;
  const url=new URL(iframe.dataset.tallySrc);
  const current=new URLSearchParams(location.search);
  current.forEach((value,key)=>url.searchParams.set(key,value));
  iframe.dataset.tallySrc=url.toString();
})();

document.querySelector('[data-download]')?.addEventListener('click',()=>{
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event:'download_panorama_digital_2026'});
});
