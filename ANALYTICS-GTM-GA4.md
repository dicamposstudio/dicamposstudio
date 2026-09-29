# Mensuração da DiCampos Studio — referência atual

Os arquivos de importação citados acompanham o ZIP na pasta configuracao-externa; não precisam ser publicados como páginas do site.

# Ativação das configurações externas

Preparado em 20/09/2026 para o site DiCampos Studio. Os arquivos do site estão corrigidos; este documento trata das configurações que ficam nos painéis externos e na raiz do host. Nenhuma alteração foi publicada nesses serviços durante esta entrega.

## 1. Google Tag Manager e GA4

Contêiner: `GTM-5DW4BRTP`. Fluxo GA4: `G-3WS38M5W18`.

O arquivo `GTM-DiCampos-eventos.json` prepara uma tag nativa de evento GA4, um acionador com a lista dos 25 eventos permitidos, 20 variáveis da camada de dados e a variável integrada Event. Não adiciona uma segunda tag base. O JSON e suas referências foram conferidos localmente; a importação e a execução precisam ser validadas no próprio GTM.

1. Exporte a versão atual do contêiner para conservar uma cópia.
2. Em Administrador → Importar contêiner, escolha `GTM-DiCampos-eventos.json`, um novo espaço de trabalho e **Mesclar**. Confira o resumo antes de importar. Não escolha substituir o contêiner inteiro.
3. Em Tags, encontre a tag Google de `G-3WS38M5W18` que já existe. Mantenha o acionamento de inicialização em todas as páginas. Remova dessa tag apenas o acionador de clique no WhatsApp identificado na auditoria. O clique passa a ser medido por `contact_whatsapp`.
4. Confira a tag importada `DC - GA4 - Eventos do site`: tipo Google Analytics: evento do GA4, ID `G-3WS38M5W18`, nome do evento `{{Event}}` e acionador `DC - Eventos personalizados permitidos`.
5. Se a importação não reconhecer algum campo nesta versão da interface, use o JSON como mapa: crie uma tag nativa de evento GA4 com esse ID e nome, um acionador Evento personalizado com a expressão regular do JSON e as variáveis da camada de dados indicadas no arquivo. Não use HTML personalizado nem insira uma segunda instalação do GA4 nas páginas.
6. Abra Visualizar e conecte a versão atualizada do site. Verifique no Tag Assistant e no DebugView um clique, um diagnóstico preparado e um download. O acionador só deve enviar os nomes previstos.
7. Revise regras legadas que transformem visita ao agradecimento ou preparação de WhatsApp em `lead_generated`/`generate_lead`. Desative apenas as regras com esses critérios incorretos, preservando integrações que realmente confirmem um contato.
8. Após a validação, publique o espaço de trabalho no GTM. A simples atualização do ZIP não publica o contêiner.

Eventos principais e interpretação:

| Evento | O que confirma | Como interpretar |
|---|---|---|
| `diagnostic_start` | Primeira interação com os campos | Início do preenchimento |
| `diagnostic_prepared` | Duas etapas válidas e mensagem preparada | Intenção; não é lead recebido |
| `contact_whatsapp` | Ação para abrir a conversa | Clique de contato; não confirma envio |
| `panorama_form_submitted` | Confirmação recebida do formulário Tally correto | Cadastro do material; não comprova lead qualificado |
| `file_download_custom` | Clique no botão de download | Interesse no material; não confirma leitura do PDF |

Se o objetivo for medir cadastros do Panorama, `panorama_form_submitted` pode ser um evento principal após validação. Para o diagnóstico por WhatsApp, o recebimento e a qualificação precisam ser conciliados com o atendimento ou CRM. Não some abertura do WhatsApp, preparação e cadastro como se fossem o mesmo resultado.

O evento automático `file_download` do GA4 e o personalizado `file_download_custom` têm nomes diferentes. Use uma definição nos relatórios para não somar a mesma ação duas vezes. O mesmo cuidado vale para os eventos automáticos de formulário. Eventos de navegação como `diagnostic_request` e `conversion_cta_click` descrevem aspectos da mesma interação; não são dois contatos.

O código não inclui respostas do diagnóstico ou campos do Tally nos eventos personalizados. O botão que abre o diagnóstico no WhatsApp também mantém essas respostas fora dos atributos dos links. Configurações adicionais de coleta automática no painel não foram auditadas nesta entrega.

## 2. Formulário do Panorama no Tally

Formulário incorporado: `lbXZx6`.

O listener foi implementado conforme os eventos documentados do Tally, verificando a origem, a janela do iframe, o ID do formulário e a duplicação da submissão. `panorama_form_loaded` significa formulário carregado; não é uma afirmação de que o visitante começou a preenchê-lo. O site não tenta ler campos dentro do iframe.

Confira no painel do Tally se o redirecionamento após envio continua apontando para:

`https://dicamposstudio.com.br/panorama-digital/obrigado.html`

Valide a confirmação em um formulário de teste ou exclua da análise um registro de teste identificado. Esta entrega não enviou cadastros à base comercial. A mensagem de sucesso do Tally e o recebimento real da submissão precisam ser conferidos no serviço, além do evento observado no navegador.

## 3. robots.txt e Search Console

Com o domínio próprio `https://dicamposstudio.com.br/` configurado no GitHub Pages, o arquivo `robots.txt` deste repositório é servido na raiz do domínio.

Ele permite o rastreamento e informa o sitemap em `https://dicamposstudio.com.br/sitemap.xml`. As páginas de agradecimento permanecem acessíveis ao rastreador para que o Google possa ler as diretivas `noindex` presentes no HTML.

No Search Console, envie o sitemap:

`https://dicamposstudio.com.br/sitemap.xml`

Ele contém 37 URLs canônicas. A URL antiga `landing-page-ou-site-institucional.html` encaminha imediatamente para `site-institucional-ou-landing-page.html` e aponta o canonical para o destino. Em GitHub Pages estático isso é um redirecionamento HTML, não uma resposta HTTP 301. A indexação e a consolidação final precisam ser acompanhadas no Search Console; enviar sitemap não garante inclusão no Google.

## Referências de implementação

- [Importação e exportação no GTM](https://support.google.com/tagmanager/answer/6106997?hl=pt-BR).
- [Configuração de eventos GA4 no GTM](https://support.google.com/tagmanager/answer/13034206?hl=pt-BR).
- [Estrutura de tags na API do GTM](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.tags).
- [Eventos JavaScript do Tally](https://developers.tally.so/widgets/events).
- [Localização do robots.txt](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt).
- [Bloqueio de indexação com noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
