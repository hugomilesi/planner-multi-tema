// Centralized labels for the entire application
// These labels are consistent across all themes - no variation by theme

export const labels = {
  // Page titles
  pages: {
    dashboard: 'Dashboard',
    tasks: 'Tarefas',
    financial: 'Finanças',
    settings: 'Configurações',
  },

  // Navigation
  nav: {
    home: 'Início',
    tasks: 'Tarefas',
    money: 'Finanças',
    settings: 'Config',
  },

  // Actions
  actions: {
    newTask: 'Nova Tarefa',
    newTransaction: 'Nova Transação',
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    add: 'Adicionar',
    viewAll: 'Ver Tudo',
    export: 'Exportar Dados',
    import: 'Importar Dados',
    signOut: 'Sair',
    loggingOut: 'Saindo...',
  },

  // Dashboard sections
  dashboard: {
    greeting: 'Bem-vindo de volta',
    dailyProgress: 'Progresso Diário',
    priorityTask: 'Tarefa Prioritária',
    financialSummary: 'Resumo Financeiro',
    todaysTasks: 'Tarefas de Hoje',
    overdue: 'Atrasadas',
  },

  // Tasks
  tasks: {
    title: 'Título',
    notes: 'Notas',
    dueDate: 'Data de Vencimento',
    priority: 'Prioridade',
    priorityHigh: 'Alta',
    priorityMedium: 'Média',
    priorityLow: 'Baixa',
    status: 'Status',
    pending: 'Pendente',
    completed: 'Concluída',
    all: 'Todas',
    today: 'Hoje',
    done: 'Feitas',
    taskProgress: 'Progresso das Tarefas',
  },

  // Financial
  financial: {
    income: 'Receitas',
    expenses: 'Despesas',
    balance: 'Saldo',
    totalBalance: 'Saldo Total',
    spendingChart: 'Gastos por Categoria',
    categories: 'Categorias',
    recentTransactions: 'Transações Recentes',
    budgetProgress: 'Progresso do Orçamento',
    last7Days: 'Últimos 7 Dias',
    amount: 'Valor',
    category: 'Categoria',
    date: 'Data',
    note: 'Nota',
  },

  // Settings
  settings: {
    chooseTheme: 'Escolher Tema',
    currentTheme: 'Tema Atual',
    accessibility: 'Acessibilidade',
    reduceMotion: 'Reduzir Movimento',
    reduceMotionDesc: 'Desativar animações e transições',
    dataManagement: 'Gerenciamento de Dados',
    account: 'Conta',
    version: 'Versão',
  },

  // Empty states
  empty: {
    tasks: 'Nenhuma tarefa encontrada',
    tasksHint: 'Toque em + para criar sua primeira tarefa',
    transactions: 'Nenhuma transação encontrada',
    transactionsHint: 'Toque em + para adicionar uma transação',
    noTasksToday: 'Nenhuma tarefa para hoje',
  },

  // Time
  time: {
    today: 'Hoje',
    yesterday: 'Ontem',
    tomorrow: 'Amanhã',
    thisWeek: 'Esta Semana',
    thisMonth: 'Este Mês',
  },

  // Misc
  misc: {
    of: 'de',
    active: 'ativas',
    complete: 'concluídas',
    optional: 'Opcional',
  },
} as const;

export type Labels = typeof labels;
