> Registro de uma versão anterior. Para a revisão de 20/09/2026, consulte CORRECOES-2026-09-20.md e ANALYTICS-GTM-GA4.md.

# Melhorias implementadas — DiCampos Studio

Atualização realizada em 5 de agosto de 2026, mantendo a identidade escura e o esquema de cores roxo/ciano do site.

## Página inicial

- CTAs com linguagem mais clara e consistente: “Diagnóstico gratuito”.
- Informação de tempo e canal logo abaixo da ação principal.
- Faixa de evidências objetivas com projetos, estudos de caso e frentes de atuação.
- Apresentação do portfólio mais transparente, separando projetos publicados e demonstrações.
- Espaçamentos ajustados para reduzir a sensação de página excessivamente longa.
- Conteúdo principal visível mesmo se animações ou JavaScript falharem.

## Diagnóstico

- Formulário reduzido de três para duas etapas.
- Remoção antecipada de perguntas sobre anúncios, orçamento e URL.
- Empresa e segmento passaram a ser opcionais.
- Texto de expectativa mais direto: gratuito e preenchido em cerca de dois minutos.
- Consentimento ligado à nova Política de Privacidade.

## Navegação, privacidade e mensuração

- Widget de WhatsApp permanece compacto e não cobre conteúdo automaticamente.
- No celular, o widget duplicado é ocultado porque a barra inferior já oferece WhatsApp e diagnóstico.
- Eventos de analytics centralizados para evitar disparos duplicados no código do site.
- Nova página `pages/privacidade.html`, também adicionada ao rodapé e ao sitemap.
- Alvos de toque e links do rodapé aprimorados.

## Validação realizada

- Home, diagnóstico e privacidade renderizados sem rolagem horizontal no desktop.
- Fluxo entre as duas etapas do formulário verificado.
- Widget do WhatsApp verificado após o tempo de espera: permanece recolhido.
- JavaScript validado e build de produção concluído com sucesso.

## Ponto que ainda depende de uma decisão

O domínio personalizado não foi alterado, pois é necessário definir primeiro qual domínio será utilizado e configurá-lo no provedor de DNS e no GitHub Pages.
