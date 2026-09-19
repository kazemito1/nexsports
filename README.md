# NEXSPORTS

E-commerce de artigos esportivos construído com Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma, Clerk, Stripe e Supabase.

## Funcionalidades

- Catálogo de produtos por categoria
- Carrinho de compras persistente
- Checkout com Stripe
- Painel administrativo
- Autenticação de usuários
- Gestão de produtos, pedidos e clientes

## Tecnologias

- Next.js 16 (App Router + Turbopack)
- React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui
- Prisma ORM + SQLite (desenvolvimento)
- Clerk (autenticação)
- Stripe (pagamentos)
- Supabase Storage (upload de imagens)

## Como executar

### 1. Clone e instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha suas chaves:

```bash
cp .env.example .env
```

Você precisará de contas em:

- [Clerk](https://clerk.com)
- [Stripe](https://stripe.com)
- [Supabase](https://supabase.com) (opcional para imagens iniciais)

### 3. Configure o banco de dados

```bash
npx prisma migrate dev
npx prisma db seed
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### 5. Acesse o painel administrativo

Para acessar `/admin`, você precisa definir o papel do usuário como `ADMIN` no painel do Clerk (metadados públicos do usuário).

## Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera a build de produção
- `npm run seed` — popula o banco com dados iniciais
- `npm run db:reset` — reseta o banco e executa o seed

## Deploy

O projeto está pronto para deploy na Vercel. Lembre-se de configurar todas as variáveis de ambiente no painel da Vercel.

## Próximos passos sugeridos

1. Configurar chaves reais do Clerk, Stripe e Supabase
2. Migrar de SQLite para PostgreSQL (Supabase ou outro)
3. Implementar upload real de imagens no admin
4. Adicionar busca avançada e filtros
5. Integrar cálculo de frete com API dos Correios
6. Implementar avaliações de produtos
7. Criar testes automatizados

---

Desenvolvido por NEXSPORTS.
