# PRD - Chamaleon Planner

## Product Requirements Document

**Versão:** 1.0
**Data:** Dezembro 2024
**Status:** Em desenvolvimento

---

## 1. Visão Geral

### 1.1 Descrição do Produto

O **Chamaleon Planner** é um aplicativo mobile-first de planejamento pessoal que combina gerenciamento de tarefas e controle financeiro com um sistema avançado de temas visuais personalizáveis.

### 1.2 Proposta de Valor

> "Organize sua vida com estilo - seu planejador, sua identidade visual"

O diferencial do Chamaleon é permitir que usuários escolham entre 9 temas visuais distintos, transformando completamente a experiência de uso sem alterar a funcionalidade.

### 1.3 Público-Alvo

- **Primário:** Jovens adultos (18-35 anos) que valorizam personalização e estética
- **Secundário:** Profissionais que buscam uma ferramenta simples de organização pessoal
- **Características:** Usuários mobile-first, familiarizados com apps modernos

---

## 2. Funcionalidades

### 2.1 Core Features

#### 2.1.1 Gerenciamento de Tarefas

| Funcionalidade | Descrição |
|----------------|-----------|
| Criar tarefa | Título, notas, data de vencimento, prioridade |
| Visualizar tarefas | Lista filtrada por: Todas, Hoje, Pendentes, Concluídas |
| Marcar como concluída | Toggle de checkbox |
| Excluir tarefa | Remoção permanente |
| Prioridades | Alta (vermelho), Média (amarelo), Baixa (azul) |
| Alertas de atraso | Indicação visual de tarefas vencidas |

#### 2.1.2 Controle Financeiro

| Funcionalidade | Descrição |
|----------------|-----------|
| Criar transação | Valor, categoria, tipo (receita/despesa), data |
| Categorias | Personalizáveis com orçamento mensal |
| Resumo mensal | Total de receitas e despesas |
| Gráfico de pizza | Despesas por categoria |
| Gráfico de barras | Últimos 7 dias (receita vs despesa) |
| Progresso de orçamento | Barra de progresso por categoria |
| Transações recentes | Lista das últimas movimentações |

#### 2.1.3 Sistema de Temas

| Tema | Estética | Cores Principais |
|------|----------|------------------|
| Cyberpunk | Futurista, neon | Magenta, Cyan |
| Synthwave | Retro 80s | Rosa, Amarelo |
| Dark Academia | Acadêmico elegante | Âmbar, Marrom |
| Western | Rústico | Âmbar, Dourado |
| Space | Cósmico | Roxo, Índigo |
| Kawaii | Fofo, pastel | Rosa, Pastel |
| Ocean | Aquático | Cyan, Teal |
| Noir | Minimalista | Preto, Branco |
| Nordic | Escandinavo clean | Azul, Branco |

### 2.2 Features de Suporte

| Feature | Descrição |
|---------|-----------|
| Autenticação | Email/senha via Supabase Auth |
| Persistência | Dados sincronizados com Supabase |
| Acessibilidade | Toggle "Reduzir movimento" |
| Backup | Exportar/importar dados em JSON |
| Splash Screen | Tela de loading animada |

---

## 3. Arquitetura Técnica

### 3.1 Stack Tecnológico

| Camada | Tecnologia |
|--------|------------|
| Frontend | React 18 + TypeScript |
| Build | Vite |
| Estilização | Tailwind CSS v4 |
| Componentes UI | Radix UI (primitives) |
| Animações | Framer Motion |
| Gráficos | Recharts |
| Roteamento | React Router v7 |
| Estado global | Zustand |
| Backend | Supabase (Auth + PostgreSQL) |

### 3.2 Estrutura de Diretórios

```
src/
├── app/                    # Páginas principais
│   ├── page.tsx           # Dashboard
│   ├── tasks/page.tsx     # Tarefas
│   ├── financial/page.tsx # Finanças
│   └── settings/page.tsx  # Configurações
├── components/
│   ├── layout/            # AppShell, BottomNav, SplashScreen
│   ├── backgrounds/       # Backgrounds animados por tema
│   ├── shared/            # Componentes temáticos reutilizáveis
│   └── ui/                # Primitivos (button, card, input)
├── contexts/              # AuthContext
├── stores/                # Zustand (taskStore, financialStore)
├── themes/
│   ├── ThemeContext.tsx   # Provider de tema
│   ├── registry.ts        # Registro de temas
│   └── packs/             # Definições dos 9 temas
├── hooks/                 # useAuth
└── lib/                   # Utilitários (supabase client)
```

### 3.3 Modelo de Dados

#### Tasks
```typescript
interface Task {
  id: string;
  title: string;
  notes?: string;
  due_date?: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  user_id: string;
  tenant_id: string;
  created_at: string;
}
```

#### Transactions
```typescript
interface Transaction {
  id: string;
  amount: number;
  category_id: string;
  type: 'income' | 'expense';
  description?: string;
  date: string;
  user_id: string;
  tenant_id: string;
}
```

#### Categories
```typescript
interface Category {
  id: string;
  name: string;
  budget?: number;
  color: string;
  tenant_id: string;
}
```

---

## 4. User Flows

### 4.1 Fluxo de Autenticação

```
Usuário abre app
    ↓
[Não autenticado?] → Tela de Login → Email/Senha → Supabase Auth
    ↓
[Autenticado] → Splash Screen (1.5s) → Dashboard
```

### 4.2 Fluxo de Criação de Tarefa

```
Dashboard ou Tasks
    ↓
Clica em "+" → Abre Dialog
    ↓
Preenche: Título, Notas, Data, Prioridade
    ↓
Clica "Salvar" → Task criada → Lista atualizada
```

### 4.3 Fluxo de Troca de Tema

```
Settings → Seção "Tema"
    ↓
Visualiza 9 cards de preview
    ↓
Clica no tema desejado
    ↓
CSS variables atualizadas → UI atualiza instantaneamente
    ↓
Preferência salva (localStorage + Supabase)
```

---

## 5. Navegação

### 5.1 Bottom Navigation

```
┌───────────────────────────────────────┐
│  🏠      📋      [+]      💰      ⚙️  │
│ Home   Tasks    FAB   Financial Settings
└───────────────────────────────────────┘
```

| Item | Destino | Descrição |
|------|---------|-----------|
| Home | `/` | Dashboard com resumo |
| Tasks | `/tasks` | Lista de tarefas |
| FAB | - | Botão de ação rápida |
| Financial | `/financial` | Controle financeiro |
| Settings | `/settings` | Configurações |

---

## 6. Requisitos Não-Funcionais

### 6.1 Performance

| Métrica | Target |
|---------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Performance | > 80 |

### 6.2 Compatibilidade

| Plataforma | Suporte |
|------------|---------|
| iOS Safari | 14+ |
| Android Chrome | 90+ |
| Desktop Chrome | 90+ |
| Desktop Firefox | 90+ |

### 6.3 Acessibilidade

- Componentes Radix UI com ARIA labels
- Toggle "Reduzir movimento" para animações
- Contraste de cores adequado (WCAG AA)
- Navegação por teclado em dialogs

---

## 7. Roadmap

### 7.1 Fase Atual (v1.0)

- [x] Autenticação básica
- [x] CRUD de tarefas
- [x] CRUD de transações
- [x] 9 temas visuais
- [x] Sincronização com Supabase
- [x] Gráficos financeiros

### 7.2 Próximas Fases

#### v1.1 - Melhorias de UX
- [ ] FAB funcional com menu de ações
- [ ] Consolidar páginas duplicadas
- [ ] Padronizar labels e formatação
- [ ] Redesign da tela de login

#### v1.2 - Novas Features
- [ ] Tarefas recorrentes
- [ ] Notificações push
- [ ] Metas financeiras
- [ ] Relatórios mensais

#### v1.3 - Social
- [ ] Compartilhar tema customizado
- [ ] Templates de categorias
- [ ] Multi-idioma (pt-BR, en-US)

---

## 8. Métricas de Sucesso

| KPI | Meta | Medição |
|-----|------|---------|
| DAU (Daily Active Users) | 1000+ | Analytics |
| Retenção D7 | > 30% | Cohort analysis |
| Tarefas criadas/usuário/mês | > 20 | Database |
| Trocas de tema/usuário | > 3 | Analytics |
| NPS | > 40 | Pesquisa in-app |

---

## 9. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Performance com muitos temas | Médio | Lazy loading de assets |
| Complexidade de manutenção (36 páginas duplicadas) | Alto | Refatoração planejada (v1.1) |
| Perda de dados offline | Alto | Implementar cache local |
| Custo Supabase escalando | Médio | Monitorar uso, otimizar queries |

---

## 10. Glossário

| Termo | Definição |
|-------|-----------|
| FAB | Floating Action Button - botão flutuante de ação |
| Tenant | Organização/workspace do usuário |
| Theme Pack | Conjunto de tokens visuais de um tema |
| Slots | Componentes decorativos específicos por tema |

---

## Histórico de Revisões

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | Dez/2024 | Claude | Documento inicial |
