# 🦎 Chamaleon Planner

> Organize sua vida com estilo - seu planejador, sua identidade visual

Um aplicativo web mobile-first de produtividade pessoal que combina gerenciamento de tarefas e controle financeiro com um sistema avançado de **10 temas visuais personalizáveis**.

![Version](https://img.shields.io/badge/version-1.0-blue)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

---

## ✨ Funcionalidades

### 📋 Gerenciamento de Tarefas
- Criar, editar e excluir tarefas
- Prioridades (Alta, Média, Baixa)
- Datas de vencimento
- Filtros: Todas, Hoje, Pendentes, Concluídas
- Indicação visual de tarefas atrasadas

### 💰 Controle Financeiro
- Transações de receita e despesa
- Categorias personalizáveis com orçamento
- Gráficos: Pizza (despesas por categoria) e Barras (últimos 7 dias)
- Resumo mensal automático
- Progresso de orçamento por categoria

### 🎨 Sistema de Temas
10 temas visuais completos que transformam toda a experiência:

| Tema | Estética | Fontes |
|------|----------|--------|
| **Cyberpunk** | Futurista neon | Orbitron, Press Start 2P |
| **Western** | Rústico vintage | Rye, Courier Prime |
| **Nordic** | Minimalista escandinavo | Inter, Lato |
| **Dark Academia** | Acadêmico elegante | Playfair, Cormorant |
| **Ocean** | Aquático sereno | Space Grotesk |
| **Synthwave** | Retro 80s | VT323 |
| **Kawaii** | Fofo pastel | Fredoka, Caveat |
| **Noir** | Minimalista B&W | Roboto Mono |
| **Space** | Cósmico | Space Grotesk |
| **Sacred Serenity** | Zen espiritual | Lora |

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Supabase

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd planner-multi-tema

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp env.example .env
# Edite .env com suas credenciais do Supabase

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173)

### Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute os scripts SQL em `db_dumps/` para criar as tabelas
3. Configure as variáveis no `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🏗️ Stack Tecnológico

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | React 19 + TypeScript |
| **Build** | Vite 7 |
| **Estilização** | Tailwind CSS v4 |
| **Componentes** | Radix UI |
| **Animações** | Framer Motion |
| **Gráficos** | Recharts |
| **Roteamento** | React Router v7 |
| **Estado** | Zustand |
| **Backend** | Supabase (Auth + PostgreSQL) |

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── layout/          # AppShell, BottomNav, PageSkeleton
│   ├── dialogs/         # CreateTaskDialog, CreateTransactionDialog
│   └── ui/              # Primitivos (button, card, input, skeleton)
├── contexts/            # AuthContext
├── pages/               # DashboardPage, TasksPage, FinancialPage, SettingsPage
├── stores/              # taskStore, financialStore (Zustand)
├── themes/
│   ├── ThemeContext.tsx # Provider de tema
│   ├── registry.ts      # Registro de temas
│   └── packs/           # 10 temas completos
├── lib/                 # Utilitários (supabase client)
└── utils/               # Helpers
```

---

## 🎯 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
npm run lint     # Linter
```

---

## 🗄️ Modelo de Dados

### Tasks
```typescript
interface Task {
  id: string;
  title: string;
  notes?: string;
  due_date?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
  user_id: string;
  tenant_id: string;
  created_at: string;
}
```

### Transactions
```typescript
interface Transaction {
  id: string;
  amount: number;
  category_id: string;
  type: 'income' | 'expense';
  note?: string;
  date: string;
  user_id: string;
  tenant_id: string;
}
```

### Categories
```typescript
interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  budget?: number;
  type: 'income' | 'expense';
  tenant_id: string;
}
```

---

## 🔐 Autenticação

O app usa **Supabase Auth** com suporte a:
- Email/Senha
- Multi-tenant (workspaces)
- Perfis de usuário
- Sincronização automática

---

## 🎨 Como Funcionam os Temas

Cada tema é um **pacote completo** que inclui:
1. **Tokens CSS** - Cores, fontes, espaçamentos
2. **Componentes temáticos** - Versões customizadas de cada página
3. **Backgrounds animados** - Elementos visuais únicos

Troca de tema é **instantânea** via CSS variables.

---

## 📱 Navegação

```
┌───────────────────────────────────────┐
│  🏠      📋      [+]      💰      ⚙️  │
│ Home   Tasks    FAB   Financial Settings
└───────────────────────────────────────┘
```

- **Home** (`/`) - Dashboard com resumo
- **Tasks** (`/tasks`) - Lista de tarefas
- **FAB** - Botão de ação rápida (criar task/transação)
- **Financial** (`/financial`) - Controle financeiro
- **Settings** (`/settings`) - Configurações e temas

---

## 🚧 Roadmap

### v1.1 (Em andamento)
- [x] Skeleton loaders e transições suaves
- [ ] FAB funcional com menu de ações
- [ ] Onboarding de primeiro uso
- [ ] Redesign da tela de login
- [ ] Sistema de notificações toast

### v1.2 (Planejado)
- [ ] Tarefas recorrentes
- [ ] Metas financeiras
- [ ] Relatórios mensais
- [ ] Modo offline (PWA)

### v1.3 (Futuro)
- [ ] Marketplace de temas customizados
- [ ] Colaboração (compartilhar listas)
- [ ] Integrações (Google Calendar, Open Banking)
- [ ] Multi-idioma

---

## 📄 Documentação

- [PRD Completo](./docs/PRD.md)
- [Guia de Login](./docs/login.md)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## 👤 Autor

**Hugo Milesi**

---

## 🙏 Agradecimentos

- [Supabase](https://supabase.com) - Backend as a Service
- [Radix UI](https://radix-ui.com) - Componentes acessíveis
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Recharts](https://recharts.org) - Biblioteca de gráficos
