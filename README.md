# DiCampos Studio v1.0 — Release Candidate

Pacote final da integração de identidade e dos sprints 2, 3, 4 e 5.

## Implementado
- Nova identidade visual integrada no header, footer, favicon, manifest e Open Graph.
- WhatsApp oficial: +55 81 99778-2751.
- Instagram oficial: @dicamposstudio.
- Home reposicionada como estúdio de estratégia digital.
- Método DiCampos: Diagnosticar, Estruturar, Atrair e Evoluir.
- Páginas de Criação de Sites, SEO, Google Ads, Meta Ads e Landing Pages.
- Formulário de diagnóstico conectado ao WhatsApp.
- Design responsivo, acessibilidade básica, animações com suporte a reduced-motion.
- Metadados SEO, Schema, sitemap e robots atualizados.

## Publicação
Substitua os arquivos do repositório GitHub Pages pelos arquivos deste pacote, mantendo a mesma estrutura de pastas.

## Revisão recomendada após o deploy
1. Confirmar a URL real do repositório/domínio nos canonicals caso seja diferente de `https://dicamposstudio.github.io/dicamposstudio/`.
2. Testar o compartilhamento no WhatsApp para atualizar o cache da imagem Open Graph.
3. Conectar GA4/GTM quando os IDs definitivos estiverem disponíveis.


## Sprint 1 — Posicionamento da Home

Implementado em 21/07/2026:

- reposicionamento para Implantação Digital;
- novo hero e proposta de valor;
- seção explicando a implantação digital;
- revisão da narrativa de problemas, soluções e método;
- reforço de autoridade e diferenciais;
- atualização de CTAs e formulário de diagnóstico;
- atualização de title, description, Open Graph e dados estruturados da Home;
- ajustes responsivos no CSS.

Neste sprint, as páginas internas foram preservadas para serem tratadas nos próximos ciclos.


## Sprint 2 — Arquitetura SEO

Implementado em 21/07/2026:
- 4 páginas locais: criação de sites, SEO, Google Ads e landing pages em Recife;
- 6 páginas por segmento: arquitetos, corretores, clínicas, advogados, indústrias e empresas de piscinas;
- nova seção “Atuação” na Home;
- links internos entre serviços, páginas locais e páginas por segmento;
- breadcrumbs visuais e dados estruturados BreadcrumbList;
- Service Schema e FAQPage nas novas páginas;
- sitemap.xml ampliado e atualizado;
- estilos responsivos específicos para a nova arquitetura.

Observação: as páginas foram escritas com conteúdo próprio para evitar duplicação e páginas locais artificiais.


## Sprint 3 — Cases e autoridade

Implementado em 21/07/2026:

- criação de 5 páginas completas de estudos de caso;
- Linha Verde Spas e Piscinas;
- Uillian Novaes Tattoo;
- Corretor de Imóveis Premium;
- DUTOP Industrial;
- Fluxo SP 24h;
- reformulação da seção de projetos da Home com links para os cases;
- narrativa estruturada em desafio, solução e efeitos da implantação;
- aviso de transparência para evitar apresentação de métricas sem autorização;
- dados estruturados CreativeWork e BreadcrumbList;
- links internos entre cases, serviços e diagnóstico;
- atualização do sitemap.xml;
- estilos responsivos específicos para os estudos de caso.


## Sprint 4 — Blog estratégico e autoridade temática

Implementado em 21/07/2026:

- criação do Centro de Conhecimento da DiCampos Studio;
- página principal do blog com arquitetura preparada para expansão;
- criação de 5 artigos estratégicos ligados às páginas comerciais;
- artigos sobre preço de site, landing page versus site, prazo de desenvolvimento, SEO e Google Ads;
- nova seção de conteúdo na Home;
- links internos entre artigos, serviços e diagnóstico;
- navegação e rodapés atualizados com acesso ao conteúdo;
- dados estruturados Blog e BlogPosting;
- metadados Open Graph e canonical individualizados;
- sumário lateral e CTAs contextuais em cada artigo;
- atualização do sitemap.xml;
- estilos responsivos específicos para blog e artigos.


## Sprint 5 - Conversão e Geração de Leads

Implementações:
- landing page `pages/diagnostico.html` com formulário de qualificação em 3 etapas;
- página de confirmação `pages/obrigado.html`;
- geração de mensagem contextualizada para WhatsApp;
- eventos no `dataLayer`/GA4 para WhatsApp, diagnóstico, telefone, downloads e envio de lead;
- CTAs de diagnóstico padronizados;
- barra de conversão fixa em dispositivos móveis;
- lead magnet em PDF com checklist de 25 pontos;
- blocos de captura inseridos no blog e nos artigos;
- seção de diagnóstico da Home reformulada;
- sitemap atualizado.

### Eventos preparados
- `generate_lead`
- `diagnostic_cta` / `diagnostic_home` / `diagnostic_mobile`
- `whatsapp_click` / `whatsapp_mobile` / `whatsapp_thankyou`
- `phone_click`
- `download_checklist`

Os eventos são enviados para `dataLayer` e também para `gtag`, quando disponível.


## Sprint 6 — SEO Técnico Avançado

Implementações realizadas sobre a versão do Sprint 5:

- metadados técnicos padronizados nas 29 páginas existentes;
- canonical, robots, Open Graph, Twitter Cards e `hreflang` revisados;
- grafo Schema.org global com `Organization`, `ProfessionalService` e `WebSite`;
- breadcrumbs estruturados adicionados às páginas internas que não possuíam marcação;
- artigos enriquecidos com autor, editor, idioma, datas e `mainEntityOfPage`;
- carregamento de imagens com `loading`, `decoding` e prioridade adequada para a identidade visual;
- melhorias de acessibilidade: skip link, foco visível, menu por teclado, landmarks, redução de movimento e fallback sem JavaScript;
- campos de formulário com `autocomplete` e `inputmode` adequados;
- links externos protegidos com `noopener` e `noreferrer`;
- nova página `404.html`;
- `robots.txt` e `sitemap.xml` regenerados;
- página de agradecimento marcada como `noindex` e removida do sitemap;
- criação de `humans.txt` e `.well-known/security.txt`;
- estilos de impressão e suporte a `prefers-reduced-motion`.

### Observações de publicação

O domínio canônico configurado permanece `https://dicamposstudio.github.io/dicamposstudio/`. Caso o projeto seja transferido para domínio próprio, substitua essa base em HTML, sitemap, robots e dados estruturados antes da publicação.

## Sprint 7 — Release Final

Versão consolidada e pronta para publicação.

Implementações finais:
- navegação contextual com indicação da página atual;
- menu mobile com rótulos acessíveis e bloqueio de rolagem;
- progresso de leitura e botão de retorno ao topo;
- microinterações e consistência visual revisadas;
- otimização de renderização em páginas longas;
- validação acessível de formulários;
- revisão de segurança dos links externos;
- relatório final e checklist de publicação.

Arquivos de apoio:
- `RELATORIO-SPRINT-7.md`
- `CHECKLIST-PUBLICACAO.md`

Esta é a versão recomendada para substituir o conteúdo atual do repositório.


## v3.1 — Portfólio Premium
- Fluxo SP 24h removido do portfólio, páginas relacionadas e sitemap.
- Nova página `pages/portfolio.html`.
- Projetos separados entre publicados e demonstrativos.
- Botões para visitar Linha Verde, Uillian Tattoo e Corretor Premium.
- Cases enriquecidos com status, cidade, segmento e CTA para o projeto.
- Cards reformulados com metadados, tags e ações independentes.


## v3.2 — Premium Experience
- Portfólio redesenhado em grade uniforme 2x2.
- Imagens visuais reais dos projetos dentro de molduras de navegador.
- Separação clara entre projetos publicados e demonstrativos.
- Ações de case e visita ao site mais visíveis.
- Layout responsivo e acessível para desktop e mobile.


## v3.2.1 — Conversão & UX (Entrega 1)

- Novo componente próprio de WhatsApp com ícone oficial em SVG.
- Expansão automática após 5,2 segundos e recolhimento suave.
- Pulse discreto a cada 15 segundos.
- Mensagens e textos pré-preenchidos conforme o contexto da página.
- CTA adaptado após 65% da rolagem.
- Suporte a teclado, `aria-live` e preferência por movimento reduzido.
- Compatibilidade com a barra móvel de conversão e eventos de mensuração.

## v3.2.1 — Entrega 2: Microinterações

- brilho direcional e resposta tátil em botões e CTA do menu;
- efeito de onda no clique, sem bibliotecas externas;
- elevação e iluminação contextual em cards;
- zoom suave nas imagens do portfólio;
- sublinhado animado em links editoriais e do rodapé;
- micro movimento em marcadores visuais;
- suporte a teclado, dispositivos touch e `prefers-reduced-motion`;
- implementação com CSS e JavaScript leves, sem dependências.

A produção dos conteúdos da seção **Conteúdo** permanece programada para depois das Entregas 3 e 4.


## v3.2.1 — Entrega 3: Hero Premium

- Sequência de entrada na primeira dobra: mensagem, proposta, CTAs, confiança e diagrama.
- Conexões do diagrama desenhadas progressivamente.
- Nós do sistema surgem em sequência curta e coordenada.
- Movimento ambiente sutil nos brilhos de fundo.
- Animações feitas com CSS e JavaScript mínimo, sem bibliotecas externas.
- Compatibilidade com `prefers-reduced-motion` para acessibilidade.
- A seção Conteúdo permanece reservada para desenvolvimento após as Entregas 3 e 4.

## v3.2.1 — Entrega 4: Performance e Conversão

- imagens principais convertidas para WebP, preservando os arquivos originais como segurança;
- logo da primeira dobra com preload, carregamento prioritário e dimensões explícitas;
- imagens fora da primeira dobra mantidas com lazy loading e decoding assíncrono;
- adaptação para economia de dados e conexões lentas;
- sinal discreto de intenção após 20 segundos ou 50% de rolagem;
- mensuração de visualização das seções principais;
- eventos de CTA enriquecidos com texto, posição e página;
- efeitos respeitam `prefers-reduced-motion`;
- nenhuma biblioteca externa adicionada.

A próxima etapa programada é a produção dos conteúdos reais da seção **Conteúdo**.


## v3.3 — Central de Conhecimento
- Central com pesquisa e filtros por categoria.
- Seis artigos pilares da Fase 1.
- Template editorial com índice, destaques, checklist, FAQ, CTA e relacionados.
- Dados estruturados Article, FAQPage e BreadcrumbList.
- Home e sitemap atualizados.


## v3.4 — Analytics & Inteligência de Dados

- GTM `GTM-5DW4BRTP` instalado em todas as páginas.
- Contexto de página no `dataLayer`.
- Biblioteca `js/analytics.js` com eventos de contato, conversão, conteúdo e navegação.
- Documentação completa em `ANALYTICS-GTM-GA4.md`.
