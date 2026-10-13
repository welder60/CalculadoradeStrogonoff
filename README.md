# Calculadora de Strogonoff

Site de página única que calcula quanto comprar de cada ingrediente para um
strogonoff de carne ou frango, de 1 a 100 pessoas, e quanto vai custar no total
e por pessoa.

🔗 <https://calculadoradestrogonoff.com.br>

## Funcionalidades

- **Número de pessoas** de 1 a 100, por campo numérico, botões −/+, controle
  deslizante ou atalhos (Casal, Família, Almoço, Festa, Evento).
- **Proteína**: carne bovina ou frango, com comparativo de quanto custaria com a
  outra e um botão para trocar.
- **Tamanho da porção**: leve (150 g), normal (200 g) ou farta (250 g) de carne
  por pessoa; todos os ingredientes escalam junto.
- **Opcionais**: cebola e alho podem entrar ou sair da lista.
- **Lista de compras** com as embalagens a comprar. O cálculo escolhe a
  combinação de embalagens mais barata que cobre a quantidade necessária e
  mostra quanto vai sobrar.
- **Custo estimado** total e por pessoa, com preços por kg editáveis. Os preços
  editados ficam salvos no navegador (`localStorage`) e podem ser restaurados.
- **Na cozinha**: tamanho de panela sugerido, quantas levas para dourar a
  carne, tempo total estimado e xícaras de arroz.
- **Receita escalada**: o modo de preparo mostra as quantidades do número de
  pessoas escolhido.
- **Compartilhar**: botão que usa o compartilhamento nativo do celular (ou
  copia lista e link), além de copiar lista, enviar no WhatsApp e imprimir
  (folha de estilo própria para impressão).
- **Link compartilhável**: as escolhas vão para a URL
  (`?pessoas=30&proteina=frango&porcao=farta&opcionais=0`) e também ficam
  salvas no navegador para a próxima visita.
- **Barra fixa no celular** com o custo total e o botão de compartilhar quando o
  cartão de custo sai da tela.
- **Tema claro ou escuro** pelo botão no topo (segue o sistema por padrão).
- **Funciona sem internet** e pode ser instalado como aplicativo (service worker
  em `sw.js`).
- Tabela de quantidades por número de pessoas e perguntas frequentes.
- Utensílios recomendados com links de afiliado da Amazon.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Todo o site: HTML, CSS e JavaScript, sem dependências nem build |
| `privacidade.html` | Política de Privacidade e Cookies (LGPD) |
| `favicon.*`, `favicon-*.png`, `apple-touch-icon.png` | Ícones do site |
| `og-image.png` | Imagem de compartilhamento em redes sociais |
| `site.webmanifest` | Manifesto para instalar o site como app |
| `sw.js` | Service worker: cache dos arquivos para abrir sem internet |
| `robots.txt`, `sitemap.xml` | Indexação em buscadores |
| `vercel.json` | Cabeçalhos para a hospedagem na Vercel (tipos, cache e segurança) |
| `docs/ANUNCIAR-NO-GOOGLE.md` | Guia para anunciar o site no Google Ads |

## Rodar localmente

Não há instalação nem build. Abra o `index.html` no navegador ou sirva a pasta:

```sh
python3 -m http.server 8000
```

e acesse <http://localhost:8000>.

## Ajustar receita e preços

Os ingredientes ficam na constante `INGREDIENTES`, no `<script>` do final de
`index.html`. Cada item tem:

| Campo | Significado |
|---|---|
| `base` | Gramas fixas por panela (temperos que não dobram com o grupo) |
| `porPessoa` | Gramas a mais por pessoa |
| `preco` | Preço médio em R$ por kg na embalagem padrão |
| `embs` | Embalagens à venda: `g` (peso), `nome` e `fator` (preço por kg relativo à padrão; `0.85` = 15% mais barato). Sem `embs`, o item é vendido a granel |
| `proteina` | `carne` ou `frango`: o item só entra quando essa proteína está escolhida |
| `opcional` | Entra só quando "Incluir cebola e alho" está marcado |

Se mudar os preços padrão de forma incompatível com o que os usuários já
salvaram, troque a versão em `STORAGE_KEY`. As últimas escolhas ficam em
`ESCOLHAS_KEY` e o tema em `TEMA_KEY` (no `<head>`).

Os fatores das porções ficam em `PORCOES`. As estimativas da seção "Na cozinha"
usam as constantes `LITROS_POR_PESSOA`, `PANELAS_LITROS`, `GRAMAS_POR_LEVA` e
`GRAMAS_XICARA_ARROZ`, logo abaixo dos ingredientes.

## Parâmetros da URL

| Parâmetro | Valores | Padrão |
|---|---|---|
| `pessoas` | 1 a 100 | 10 |
| `proteina` | `carne` ou `frango` | `carne` |
| `porcao` | `leve`, `normal` ou `farta` | `normal` |
| `opcionais` | `0` ou `1` | `1` |

Exemplo: <https://calculadoradestrogonoff.com.br/?pessoas=30&proteina=frango>.
Valores padrão não aparecem na URL. Esses parâmetros também servem para
anúncios que levam direto a um cenário (festa de 30, por exemplo).

## Afiliados e anúncios

- Os links da Amazon em `index.html` usam o ID de Associado `calcstrogonof-20`
  (parâmetro `tag=`). Todo link novo precisa dele para gerar comissão.
- A tag do Google Ads fica no `<head>` de `index.html`, com o Modo de
  consentimento v2: os cookies começam negados e só são liberados quando o
  visitante clica em "Aceitar" no banner de cookies. A escolha fica no
  `localStorage` (chave `strogonoff-cookies-v1`) e pode ser mudada pelo link
  "Preferências de cookies" no rodapé ou em `privacidade.html`.
- Ao adicionar outra ferramenta que grave cookies ou colete dados, atualize
  `privacidade.html`.
- O passo a passo para criar campanhas e medir conversões está em
  [`docs/ANUNCIAR-NO-GOOGLE.md`](docs/ANUNCIAR-NO-GOOGLE.md).

## Publicação

O site é estático e hospedado na Vercel; basta publicar os arquivos da raiz do
repositório. Ao alterar o conteúdo, atualize a data em
`sitemap.xml` (`<lastmod>`) e no rodapé de `index.html`.

O `sw.js` guarda uma cópia das páginas e dos ícones no navegador do visitante.
As páginas são buscadas na rede primeiro, então uma nova publicação aparece na
visita seguinte. Se mudar o nome de algum arquivo em cache, troque `VERSAO` em
`sw.js` para o cache antigo ser apagado.
