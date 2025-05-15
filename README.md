# Teste EngagED

Esse repositório serve como solução para o teste técnico da EngagED. Para isso, foi utilizado
as seguintes tecnologias: Quasar, Vue 3, Typescript, [URQL](https://nearform.com/open-source/urql/), GraphQL,
GraphQL CodeGen (para geração de tipos), SCSS, vitest (unitários) e Cypress (E2E).

Para testes, considero apenas testar unitariamente os _dumb components_, que são componentes que tem poucas -ou nenhuma-
dependências externas. Os restantes, testo com Cypress E2E pois consigo simular todo o fluxo do usuário e garantir
funcionamento de ponta-a-ponta com a integração.

## Como rodar o projeto

Primeiramente, adicione a URL da API em um arquivo .env no root do projeto assim como descrito no arquivo .env.example

### Instalar as dependências

```bash
bun install
```

### Pra rodar em dev mode

```bash
quasar dev
# ou
bun dev
```

### Lintar os arquivos com ESlint

```bash
bun lint
```

### Formatar com prettier

```bash
bun format
```

### Buildar para produção

```bash
quasar build
# or
bun build
```
