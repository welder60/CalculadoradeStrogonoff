# Calculadora de Strogonoff

Site de página única que calcula quanto comprar de cada ingrediente para um
strogonoff de carne ou frango, de 1 a 100 pessoas, e quanto vai custar no total
e por pessoa.

🔗 <https://calculadoradestrogonoff.com.br>

## Funcionalidades

- **Número de pessoas** de 1 a 100, por campo numérico, botões −/+, controle
  deslizante ou atalhos (Casal, Família, Almoço, Festa, Evento).
- **Proteína**: carne bovina ou frango.
- **Opcionais**: cebola e alho podem entrar ou sair da lista.
- **Lista de compras** com as embalagens a comprar. O cálculo escolhe a
  combinação de embalagens mais barata que cobre a quantidade necessária e
  mostra quanto vai sobrar.
- **Custo estimado** total e por pessoa, com preços por kg editáveis. Os preços
  editados ficam salvos no navegador (`localStorage`) e podem ser restaurados.
- **Copiar lista** para a área de transferência, pronta para enviar ou anotar.
- Receita passo a passo, tabela de quantidades por número de pessoas e
  perguntas frequentes.
- Utensílios recomendados com links de afiliado da Amazon.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Todo o site: HTML, CSS e JavaScript, sem dependências nem build |
| `favicon.*`, `favicon-*.png`, `apple-touch-icon.png` | Ícones do site |
| `og-image.png` | Imagem de compartilhamento em redes sociais |
| `site.webmanifest` | Manifesto para instalar o site como app |
| `robots.txt`, `sitemap.xml` | Indexação em buscadores |
| `vercel.json` | Cabeçalhos para a hospedagem na Vercel |
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
salvaram, troque a versão em `STORAGE_KEY`.

## Afiliados e anúncios

- Os links da Amazon em `index.html` usam o ID de Associado `calcstrogonof-20`
  (parâmetro `tag=`). Todo link novo precisa dele para gerar comissão.
- A tag do Google Ads fica no `<head>` de `index.html`. O passo a passo para
  criar campanhas e medir conversões está em
  [`docs/ANUNCIAR-NO-GOOGLE.md`](docs/ANUNCIAR-NO-GOOGLE.md).

## Publicação

O site é estático e hospedado na Vercel; basta publicar os arquivos da raiz do
repositório. Ao alterar o conteúdo, atualize a data em
`sitemap.xml` (`<lastmod>`) e no rodapé de `index.html`.
