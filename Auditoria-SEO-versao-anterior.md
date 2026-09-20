> Registro de uma versão anterior. Para a revisão de 20/09/2026, consulte CORRECOES-2026-09-20.md e ANALYTICS-GTM-GA4.md.

# Auditoria SEO e QA — DiCampos Studio

**Versão corrigida:** v1.2 — SEO Auditado  
**Data:** 2026-07-16

## Resumo

A auditoria encontrou e corrigiu problemas de estrutura, SEO e acessibilidade: footer duplicado, seções posicionadas depois do footer, ID duplicado, links vazios, metadados sociais ausentes, Schema incompleto, ausência de favicon/manifest e limitações no menu mobile.

## Correções aplicadas

- Titles e descriptions revisados.
- Foco em “criação de sites em Recife” na página comercial.
- Organization, WebSite, Service, BreadcrumbList e FAQPage Schema.
- Favicon SVG e manifest.
- Sitemap com `lastmod` e robots revisado.
- ID duplicado e links vazios corrigidos.
- Sobre e CTA movidos antes do único footer.
- Foco de teclado, Escape no menu e fallback de animações.
- Autocomplete e limites nos campos do formulário.

## Testes estáticos

[
  {
    "file": "index.html",
    "title": 55,
    "desc": 153,
    "h1": 1,
    "dup": [],
    "dead": 0,
    "jsonld_errors": 0
  },
  {
    "file": "pages/criacao-de-sites.html",
    "title": 58,
    "desc": 144,
    "h1": 1,
    "dup": [],
    "dead": 0,
    "jsonld_errors": 0
  }
]

Recursos locais quebrados: **0**

Nenhum recurso CSS/JS local quebrado encontrado.

## Pendência bloqueadora

O formulário ainda precisa de um destino real (WhatsApp, Formspree, backend ou outro serviço). A confirmação falsa foi removida. Antes de publicar, configure o canal oficial de envio.

## Pendência recomendada

Ainda falta uma imagem `og:image` de 1200 × 630 px para compartilhamentos sociais. Ela pode entrar junto com as imagens da identidade visual.

## Status

**Tecnicamente pronto após configurar o envio real do formulário. As fotos não bloqueiam o lançamento.**
