# Correções da auditoria — 20/09/2026

Esta é a referência atual do projeto. Documentos de sprints anteriores são históricos.

| Auditoria | Implementação | Situação |
|---|---|---|
| A01 — ligação com GA4 | Eventos padronizados e JSON de importação do GTM preparado | Ativação e Preview pendentes no painel |
| A02 — falsos leads | Removidos eventos de lead por preparação/agradecimento | Corrigido e testado no código |
| A03 — respostas perdidas | Recuperação da mensagem completa, revisão e cópia | Corrigido e testado, inclusive sem armazenamento |
| A04 — âncoras | Menu/rodapé do portfólio apontam para a home | Corrigido; nenhuma âncora interna quebrada |
| A05 — telefone | Formato brasileiro, DDD e mensagem de erro | Corrigido e testado |
| A06 — acessibilidade | Cor do botão, foco na etapa, progresso e filtros acessíveis | Código corrigido; validação visual no dispositivo pendente |
| A07 — robots.txt | Arquivo atualizado para o domínio próprio | Resolvido com `dicamposstudio.com.br` em 29/09/2026 |
| A08 — cobertura | GTM no Panorama/Fluxo/privacidade; listener Tally | Código corrigido; entrega ao GA4 e configuração Tally a conferir |
| A09 — descoberta | 37 URLs no sitemap, nove artigos e links ao Panorama/Fluxo | Corrigido |
| A10 — duplicação editorial | Uma URL principal; redirect HTML e canonical na antiga | Corrigido; acompanhar consolidação no Google |
| A11 — home longa | Chamada reduzida, prova antecipada e bloco repetitivo removido | Ajuste editorial concluído; redesenho adiado conforme solicitado |
| A12 — provas | Quatro cases de mídia com contexto; demonstrativos rotulados | Corrigido |
| A13 — decisão comercial | Serviços detalhados e título de artigo alinhado à resposta | Corrigido |
| A14 — privacidade | Rodapés consistentes; texto atualizado para diagnóstico e Tally | Corrigido no escopo técnico/editorial |
| A15 — CSS | Correções integradas ao final do arquivo principal | Corrigido |
| A16 — logo | WebP já existente substitui PNG no Fluxo | Corrigido |
| A17 — topo | Controle só é inserido quando existe destino | Corrigido |

## Referência das métricas

Os números publicados seguem o portfólio de cases fornecido e autorizado pelo responsável pela DiCampos Studio. São derivados de relatórios, não de uma auditoria independente dos gerenciadores. A origem e os limites estão escritos nas próprias páginas. Janeiro–julho de 2026 se aplica aos recortes da Linha Verde; janeiro–abril de 2026 ao Bê Tattoo; março de 2026 ao teste do Uillian; abril/junho de 2025 ao Imbalança.

Não foram usados os intervalos conflitantes de Linha Verde em janeiro/Meta nem de Imbalança em 1–7 de abril. Resultados de mídia não foram apresentados como efeito comprovado do site.

## Arquitetura atual

- `js/tag-manager.js`: uma instalação por página; contexto antes do GTM.
- `js/analytics.js`: eventos permitidos e parâmetros sem respostas de formulários.
- `js/diagnostic.js`: validação, etapas, rascunho com validade de duas horas e continuação pelo WhatsApp.
- `js/main.js`: navegação, interações visuais e busca de artigos.
- `panorama-digital/script.js`: inicialização do embed e eventos documentados do Tally.

Não há compilação obrigatória: o projeto continua sendo HTML, CSS e JavaScript estático. O pacote de testes fica fora dos arquivos públicos. Esta revisão não publica automaticamente GTM, Tally, Search Console ou o repositório do host raiz.
