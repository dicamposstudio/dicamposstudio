# DiCampos Studio v3.4 — Analytics & Inteligência de Dados

## Identificadores

- Google Tag Manager: `GTM-5DW4BRTP`
- GA4 / Google Tag: `G-3WS38M5W18`

## Implementação no site

O container do GTM foi instalado em todas as páginas HTML:

- script do GTM no início do `<head>`;
- fallback `<noscript>` imediatamente após `<body>`;
- contexto de página enviado ao `dataLayer` antes do carregamento do GTM;
- biblioteca central de eventos em `js/analytics.js`.

## Eventos personalizados

| Evento | Uso principal |
|---|---|
| `page_context` | Tipo, categoria, título e caminho da página |
| `contact_whatsapp` | Clique para contato pelo WhatsApp |
| `contact_phone` | Clique em telefone |
| `contact_email` | Clique em e-mail |
| `diagnostic_request` | Clique em CTA de diagnóstico |
| `form_submit` | Envio de formulário |
| `lead_generated` | Acesso à página de agradecimento |
| `article_open` | Abertura de artigo |
| `article_read_25/50/75/90` | Profundidade de leitura |
| `article_cta_click` | CTA acionado dentro de artigo |
| `related_article_click` | Clique em conteúdo relacionado |
| `knowledge_search` | Pesquisa na Central de Conhecimento |
| `knowledge_filter` | Uso dos filtros da Central |
| `portfolio_view` | Interesse em projeto/case |
| `service_interest` | Interesse em solução |
| `file_download_custom` | Download de material |
| `engaged_time` | Permanência de 30, 60 e 120 segundos |

## Configuração necessária no GTM

1. Mantenha a tag **Google Tag - All Pages**, ID `G-3WS38M5W18`, acionada em **Initialization - All Pages**.
2. Crie uma tag **Google Analytics: evento do GA4** para cada evento que será enviado ao GA4, ou use uma tag genérica cujo nome do evento venha da variável `{{Event}}`.
3. Acionador recomendado para eventos do `dataLayer`: **Evento personalizado**, usando o nome do evento correspondente.
4. Inclua parâmetros úteis por meio de Variáveis da camada de dados, como `page_type`, `page_category`, `element_position`, `link_text`, `article_title` e `scroll_percent`.

## Conversões recomendadas no GA4

Marque como eventos principais:

- `lead_generated` — conversão principal;
- `form_submit` — conversão principal quando confirmado;
- `diagnostic_request` — microconversão;
- `contact_whatsapp` — microconversão.

Evite tratar scroll, permanência e visualizações como conversões.

## Validação após publicar no GitHub Pages

1. Publique os arquivos do ZIP no repositório.
2. Aguarde a atualização do GitHub Pages.
3. No GTM, clique em **Visualizar** e conecte a URL completa `https://dicamposstudio.github.io/dicamposstudio/`.
4. Verifique se o container `GTM-5DW4BRTP` é encontrado.
5. Navegue, clique no WhatsApp e abra um artigo para validar os eventos no painel do Tag Assistant.
6. Confirme o recebimento em **GA4 > Administrador > DebugView**.
7. Somente depois clique em **Enviar** no GTM para publicar o container.

## Próximas integrações

Google Ads, Meta Pixel e Microsoft Clarity devem ser instalados pelo GTM. Não é necessário inserir novos scripts diretamente nas páginas.
