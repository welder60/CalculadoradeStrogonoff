# Como anunciar a Calculadora de Strogonoff no Google

Guia passo a passo para colocar o site **calculadoradestrogonoff.com.br** nos
resultados pagos do Google (Google Ads), medir o retorno e não gastar à toa.

> **Antes de pagar:** o site ganha dinheiro com links de afiliado da Amazon.
> Cada clique pago só vale a pena se o que você ganha em comissão for maior que o
> custo do clique. Comece com orçamento pequeno, meça por 2–3 semanas e só
> depois aumente.

---

## 0. Pré-requisitos (grátis, faça primeiro)

1. **Google Search Console** – <https://search.google.com/search-console>
   - Adicione a propriedade `calculadoradestrogonoff.com.br` (tipo *Domínio*).
   - Confirme a posse com o registro TXT no DNS (na Vercel: *Settings → Domains*,
     ou no painel do registro.br).
   - Envie o sitemap: `https://calculadoradestrogonoff.com.br/sitemap.xml`.
   - Isso não é anúncio, mas mostra para quais buscas o site já aparece de graça
     — ótima fonte de palavras-chave.
2. **ID de afiliado da Amazon** – já configurado: todos os links do
   `index.html` usam `tag=calcstrogonof-20`. Sem ele, os cliques pagos não
   geram comissão.
3. **Conta Google** que será dona da conta de anúncios (use a mesma do
   Search Console).
4. **Cartão de crédito, boleto ou Pix** para pagar os anúncios.

---

## 1. Criar a conta no Google Ads

1. Acesse <https://ads.google.com> e clique em **Começar agora**.
2. O Google vai tentar criar uma *Campanha Inteligente* (Smart). **Não use.**
   Procure o link **"Mudar para o modo Especialista"** (Expert mode) — ele dá
   controle sobre palavras-chave e lances.
3. Escolha **"Criar uma conta sem uma campanha"**.
4. Confirme país **Brasil**, fuso **(GMT-03:00) Brasília** e moeda **Real (BRL)**.
   ⚠️ Fuso e moeda **não podem ser alterados depois**.
5. Em **Faturamento**, cadastre o pagamento e os dados fiscais (CPF ou CNPJ).

---

## 2. Instalar a tag do Google (medir conversões)

Sem medição você não sabe se o anúncio funciona. Vamos medir duas ações:

| Conversão              | O que significa                         |
|------------------------|-----------------------------------------|
| `copiar_lista`         | Usuário clicou em **Copiar lista**      |
| `clique_amazon`        | Usuário clicou em **Ver preço na Amazon** |

### 2.1 Pegar o ID da tag

No Google Ads: **Metas → Conversões → Resumo → + Nova ação de conversão →
Site**. Informe a URL do site e escolha **"Configurar manualmente com código"**.
Crie as duas ações acima (categoria: *Envio de formulário de lead* para
`copiar_lista` e *Saída de página/Outro* para `clique_amazon`). O Google mostra:

- o **ID da tag**, no formato `AW-18505768191`;
- um **rótulo** para cada conversão, no formato `AbCdEfGh123`.

### 2.2 Colar a tag no `index.html`

Logo depois de `<head>` (antes do `<title>`), cole — trocando `AW-18505768191`
pelo seu ID:

```html
<!-- Google tag (gtag.js) - Google Ads -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18505768191"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18505768191');
</script>
```

### 2.3 Disparar as conversões

No `<script>` do final do `index.html`, junto dos outros `addEventListener`,
adicione (trocando os rótulos):

```js
/* ---------- Conversões Google Ads ---------- */
function converter(rotulo) {
  if (typeof gtag === 'function') gtag('event', 'conversion', { send_to: 'AW-18505768191/' + rotulo });
}
$('copiar').addEventListener('click', () => converter('ROTULO_COPIAR_LISTA'));
document.querySelectorAll('.btn-amazon').forEach(a =>
  a.addEventListener('click', () => converter('ROTULO_CLIQUE_AMAZON')));
```

Faça o deploy na Vercel e confira em **Metas → Conversões** se o status muda
para **"Gravando conversões"** (pode levar algumas horas). Para testar na hora,
instale a extensão **Google Tag Assistant** no Chrome.

> **LGPD:** ao usar a tag do Google, inclua no site um aviso de cookies/política
> de privacidade dizendo que você usa o Google Ads para medir visitas.

---

## 3. Criar a campanha de Pesquisa

**Campanhas → + Nova campanha** e preencha:

| Campo                       | Valor recomendado                                    |
|-----------------------------|------------------------------------------------------|
| Objetivo                    | **Tráfego do site** (ou "Criar sem orientação")      |
| Tipo                        | **Pesquisa** (Search)                                |
| Nome                        | `Pesquisa - Calculadora Strogonoff`                  |
| Redes                       | ❌ Desmarque **Parceiros de pesquisa** e **Rede de Display** |
| Locais                      | **Brasil** → opção *"Presença: pessoas que estão nos locais"* |
| Idiomas                     | **Português**                                        |
| Lances                      | **Maximizar cliques** com **CPC máximo de R$ 0,50**  |
| Orçamento diário            | **R$ 10 a R$ 20** para começar                       |
| Programação (opcional)      | Reforce **quinta a domingo**, quando as pessoas planejam o almoço |
| Recursos automáticos        | Desative *"Recomendações aplicadas automaticamente"* em **Recomendações → Aplicar automaticamente** |

> Depois de ~30 conversões em 30 dias, troque o lance para
> **Maximizar conversões**. Antes disso o Google não tem dados suficientes.

---

## 4. Grupos de anúncios e palavras-chave

Use **correspondência de frase** (`"..."`) e **exata** (`[...]`). Evite a
correspondência ampla no começo: ela gasta com buscas pouco relacionadas.

### Grupo 1 – Quantidade por pessoa
```
"strogonoff para quantas pessoas"
"quanto de carne para strogonoff"
"quantidade de strogonoff por pessoa"
"quanto de frango para strogonoff"
[calculadora de strogonoff]
"strogonoff por pessoa"
```

### Grupo 2 – Festas e eventos
```
"strogonoff para 10 pessoas"
"strogonoff para 20 pessoas"
"strogonoff para 30 pessoas"
"strogonoff para 50 pessoas"
"strogonoff para 100 pessoas"
"strogonoff para festa"
```

### Grupo 3 – Lista de compras e custo
```
"lista de compras strogonoff"
"ingredientes strogonoff"
"quanto custa fazer strogonoff"
"custo strogonoff por pessoa"
```

### Palavras-chave negativas (nível da campanha)
Adicione em **Palavras-chave → Palavras-chave negativas** para não pagar por
cliques que não convertem:

```
ifood
delivery
entrega
restaurante
congelado
pronto
vaga
emprego
curso
calorias
amazon
```

> ⚠️ **Não** use "amazon" ou marcas como palavra-chave e **não** coloque link da
> Amazon direto no anúncio: as regras do Programa de Associados proíbem e podem
> cancelar sua conta de afiliado. O anúncio deve sempre levar ao **seu site**.

---

## 5. Anúncio responsivo de pesquisa

Crie **um anúncio por grupo**. URL final:
`https://calculadoradestrogonoff.com.br/` (para o Grupo 3 use
`https://calculadoradestrogonoff.com.br/#lista`).

Caminho de exibição: `calculadoradestrogonoff.com.br/` **`calculadora`** / **`strogonoff`**

### Títulos (máx. 30 caracteres — todos já conferidos)
1. Calculadora de Strogonoff  *(fixe na posição 1)*
2. Quanto de Carne Comprar?
3. Strogonoff p/ Quantas Pessoas
4. Lista de Compras Pronta
5. Grátis e Sem Cadastro
6. Custo Total e por Pessoa
7. Strogonoff para Festa
8. De 1 a 100 Pessoas
9. Carne ou Frango
10. Calcule em 10 Segundos
11. Strogonoff para 30 Pessoas
12. Evite Sobras e Desperdício
13. Quantidades Exatas
14. Planeje seu Almoço
15. Receita e Modo de Preparo

### Descrições (máx. 90 caracteres)
1. Descubra quanto comprar de carne, creme de leite e batata palha para qualquer evento.
2. Lista de compras pronta com custo total e por pessoa. Grátis, sem cadastro e sem app.
3. Vai fazer strogonoff para muita gente? Calcule as quantidades exatas em segundos.
4. Strogonoff de carne ou frango para 1 a 100 pessoas. Copie a lista e vá ao mercado.

### Recursos (extensões) — aumentam o anúncio de graça
- **Sitelinks:** *Lista de Compras* (`/#lista`), *Custo Estimado* (`/#h-custo`),
  *Modo de Preparo* (`/#h-preparo`), *Tabela por Pessoas* (`/#h-tabela`).
- **Frases de destaque:** `100% grátis` · `Sem cadastro` · `Funciona no celular` ·
  `Carne ou frango`.
- **Snippets estruturados** (cabeçalho *Tipos*): `Almoço de família`, `Festa`,
  `Aniversário`, `Evento`.

---

## 6. Rotina de acompanhamento

| Quando             | O que fazer                                                        |
|--------------------|--------------------------------------------------------------------|
| **Dia 1–3**        | Ver se os anúncios foram **aprovados** e se há impressões.        |
| **Toda semana**    | **Insights e relatórios → Termos de pesquisa**: adicione como negativa tudo que não tem a ver; promova a palavra-chave os termos bons. |
| **Toda semana**    | Pause palavras com muitos cliques e **zero conversões**.          |
| **Após 2–3 semanas** | Compare **custo por conversão** com sua comissão média na Amazon. Só aumente o orçamento se der lucro. |
| **Após 30 conversões** | Mude o lance para **Maximizar conversões**.                    |

Métricas de referência para começar (ajuste com seus dados):

- **CTR** (taxa de cliques) acima de **5%** → anúncio relevante.
- **Índice de qualidade** 7+ nas palavras principais.
- **Custo por conversão** menor que o ganho médio por visitante.

---

## 7. Dúvida comum: "anunciar no Google" × "ganhar com anúncios do Google"

- **Google Ads** (este guia): **você paga** para o site aparecer no Google.
- **Google AdSense**: **você recebe** para mostrar anúncios de outros no seu site.
  Se esse for o objetivo, cadastre o site em <https://adsense.google.com>, cole o
  código de verificação no `<head>`, crie o arquivo `ads.txt` na raiz com a linha
  que o AdSense fornecer e aguarde a aprovação (normalmente dias a semanas).

---

### Checklist rápido

- [ ] Search Console verificado e sitemap enviado
- [x] `SEUTAG-20` trocado pelo ID real da Amazon (`calcstrogonof-20`)
- [ ] Conta Google Ads criada no **modo Especialista**, BRL e fuso de Brasília
- [ ] Tag do Google no `<head>` e conversões `copiar_lista` / `clique_amazon` gravando
- [ ] Aviso de cookies/privacidade no site
- [ ] Campanha só de **Pesquisa**, Brasil, Português, sem Display/Parceiros
- [ ] 3 grupos de anúncios + palavras negativas
- [ ] Anúncios responsivos com sitelinks e frases de destaque
- [ ] Revisão semanal dos termos de pesquisa
