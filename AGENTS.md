# CLAUDE.md - Nolva Components

## Contexto do Projeto

`@rentalhost/nolva-components` é um pacote privado de componentes React reutilizáveis organizados
por categorias funcionais. Este documento fornece uma compreensão rápida da arquitetura e padrões
únicos do projeto.

## Stack Tecnológica

- **React 19.2.4** com **TypeScript 5.9.3** (strict mode)
- **TailwindCSS 4.1.18** com sistema customizado de variantes
- **Storybook 10.2.8** para documentação de componentes
- **Build**: TypeScript → SWC (minificação)
- **Dependência interna**: `@rheactor/rheactor-core` (GitHub) para utilitários compartilhados como
  `twMerge` (via `@rheactor/rheactor-core/tailwind`)

## Organização de Componentes

Hierarquia de 11 categorias funcionais:

- **Primitive**: Componentes base sem dependências (Container, Section, Alert)
- **Form**: Controles de formulário com contexto compartilhado (Button, Input, Select, Textarea,
  Label, Form)
- **Generic**: Utilitários funcionais (BackButton, Share, InputSearch, TextClamp, Resource, Ready,
  WhatsappButton, BackTopButton)
- **Surface**: Componentes UI complexos (Media, Accordion, Slider, Hero, Counter, FlipCard,
  ScrollProgress, VLibras)
- **Animate**: Wrapper de animação baseado em IntersectionObserver
- **Header**: Componentes de navegação (Header, HeaderNav, HeaderContainer)
- **Pagination**: Controle de paginação
- **Print**: Layout específico para impressão
- **Theme**: Sistema de variantes de cor
- **Analytics**: Tracking de analytics (AnalyticsViewport, AnalyticsProvider)

### Estrutura de Arquivos Padrão

```
ComponentName/
├── ComponentName.tsx          # Componente principal
├── ComponentName.stories.tsx  # Histórias do Storybook
└── ComponentProvider.tsx      # Provider opcional (se usa Context API)
```

## Padrões Arquiteturais Únicos

### 1. Convenção de Data Attributes

Todos os componentes seguem uma convenção consistente de data attributes:

- `data-component="ComponentName"` - Identificação do componente
- `data-theme="solid|outline|transparent"` - Variantes de tema
- `data-*` para estados (ex: `data-focused`, `data-opened`, `data-animated`, `data-stuck`)

Isso habilita **custom variants no TailwindCSS**:

```tsx
className = "theme-solid:bg-theme-500 not-data-animated:*:opacity-0";
```

**Referência**: `src/components/Form/Button/Button.tsx` (linhas 60-61, 72-73)

### 2. contextWrapper Pattern

Utilitário em `src/services/ContextService.tsx` que envolve automaticamente componentes com seus
Context Providers, eliminando boilerplate.

Componentes que usam: Form, Label, Resource, Analytics

**Referência**: `src/services/ContextService.tsx`

### 3. asChild Pattern (Composição Polimórfica)

Permite mesclar comportamento de um componente com elementos customizados via `cloneElement`,
seguindo o padrão Radix UI.

```tsx
<Button asChild>
  <Link href="/page">Click me</Link>
</Button>
```

**Referência**: `src/components/Form/Button/Button.tsx` (linhas 58-65)

### 4. Sistema de Tema com CSS Custom Properties

- Variáveis CSS `--theme-50` até `--theme-950` (escala de cores)
- Custom variants: `@custom-variant theme-solid`, `theme-outline`, `theme-transparent`, `disabled`,
  `stuck`
- Classes utilitárias `.theme-{color}` para todas as cores do Tailwind (red, blue, green, etc)
- **ThemeSpread component** no Storybook renderiza componentes em todas as variantes de tema

**Referência**: `src/theme.css` (linhas 6-12 para variants, 45-57 para variáveis base, 59-367 para
cores)

### 5. Event Service com Cleanup Functions

Services em `src/services/EventService.ts` e `MutationService.ts` retornam funções de cleanup:

```typescript
const unload = listenWindowScroll(callback);
// Depois: unload() para limpar
```

**Referência**: `src/services/EventService.ts`

### 6. Hooks Hydration-Aware

- Todos os hooks em `src/services/hooks/` são marcados `"use client"`
- `useReady` lida com timing SSR/hidratação
- `useInViewport` usado por Animate e Analytics para IntersectionObserver

### 7. TypeScript Path Aliases

```json
{
  "@/*": "./src/*",
  "@storybook/*": "./.storybook/*",
  "@assets/*": "./public/assets/*"
}
```

Usa `typescript-transform-paths` plugin para transformação em compile-time.

## Comandos Comuns

```bash
# Desenvolvimento
bun dev                  # Storybook na porta 9009

# Build
bun run build            # Processo completo: rimraf → tspc → swc

# Code Quality
bun run prettier:fix     # Formatar código
bun run eslint:fix       # Lint e corrigir

# Storybook Estático
bun run build-storybook  # Build estático do Storybook
```

## Convenções de Código

- **TypeScript**: Strict mode com `noImplicitReturns`, `noUnusedLocals`, `noUnusedParameters`
- **Props**: Extend `ComponentProps<"element">` para elementos nativos
- **Styling**: Sempre usar `twMerge` de `@rheactor/rheactor-core/tailwind` (não do tailwind-merge
  local)
- **className**: Prop `className` sempre merged por último para permitir overrides do consumidor
- **Data attributes**: Prefixar componentes com `data-component` e estados com `data-*`

## Storybook

- Stories em arquivos `*.stories.tsx` ao lado dos componentes
- Usa `@storybook/nextjs` framework com SWC builder
- Pattern glob: `../src/**/*.stories.@(ts|tsx)`
- **ThemeSpread component** para testar todas as variantes de tema
- Custom viewports: Mobile (320x640), Tablet (768x1024), Desktop (1400x1024)

## Arquivos Críticos para Referência

Ao trabalhar neste projeto, estes arquivos demonstram os padrões arquiteturais únicos:

1. **src/services/ContextService.tsx** - Pattern contextWrapper
2. **src/components/Form/Button/Button.tsx** - Pattern asChild e data-attributes
3. **src/components/Theme/Theme/Theme.tsx** - Sistema de temas e mapeamento de variantes
4. **src/theme.css** - Custom variants do TailwindCSS e variáveis de tema
5. **src/services/EventService.ts** - Pattern de cleanup de listeners

## Exportações

- **Entry point**: `src/index.ts` exporta componentes e services server-safe (livre de dependência
  de `next`)
- **Client**: `src/index-client.ts` exporta componentes e hooks que declaram `"use client"` (exports
  `./Client` no package.json)
- **Next**: `src/index-next.ts` exporta apenas os componentes server-safe que dependem de `next`;
  `src/index-client-next.ts` exporta os que usam `"use client"` (exports `./Next` e `./Client/Next`)
- **Tema**: `src/theme.css` exportado separadamente via package.json exports field
- **Convenção de bundles**: bundles mistos geram `index-*.ts` (server) e `index-client-*.ts`
  (client); bundles exclusivamente client geram apenas `index-client-*.ts`; bundles sem
  `"use client"` geram apenas `index-*.ts`

## Notas Importantes

- Este é um **pacote privado**, não publicado no npm
- Consumido via dependência GitHub ou monorepo
- Não há testes automatizados configurados no momento
- A biblioteca é compatível com React Server Components ("use client" onde necessário)
- Portal cleanup usa `requestIdleCallback` para evitar bloqueio de render
- Theme component usa `className="contents"` para evitar wrapper elements no layout
