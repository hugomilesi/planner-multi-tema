// Registry de temas com páginas customizadas
export const themedPages = {
  cyberpunk: {
    tasks: () => import('./cyberpunk/TasksPage').then(m => m.CyberpunkTasksPage),
    dashboard: () => import('./cyberpunk/DashboardPage').then(m => m.CyberpunkDashboardPage),
    financial: () => import('./cyberpunk/FinancialPage').then(m => m.CyberpunkFinancialPage),
    settings: () => import('./cyberpunk/SettingsPage').then(m => m.CyberpunkSettingsPage),
  },
  western: {
    tasks: () => import('./western/TasksPage').then(m => m.WesternTasksPage),
    dashboard: () => import('./western/DashboardPage').then(m => m.WesternDashboardPage),
    financial: () => import('./western/FinancialPage').then(m => m.WesternFinancialPage),
    settings: () => import('./western/SettingsPage').then(m => m.WesternSettingsPage),
  },
  space: {
    tasks: () => import('./space/TasksPage').then(m => m.SpaceTasksPage),
    dashboard: () => import('./space/DashboardPage').then(m => m.SpaceDashboardPage),
    financial: () => import('./space/FinancialPage').then(m => m.SpaceFinancialPage),
    settings: () => import('./space/SettingsPage').then(m => m.SpaceSettingsPage),
  },
  synthwave: {
    tasks: () => import('./synthwave/TasksPage').then(m => m.SynthwaveTasksPage),
    dashboard: () => import('./synthwave/DashboardPage').then(m => m.SynthwaveDashboardPage),
    financial: () => import('./synthwave/FinancialPage').then(m => m.SynthwaveFinancialPage),
    settings: () => import('./synthwave/SettingsPage').then(m => m.SynthwaveSettingsPage),
  },
  kawaii: {
    tasks: () => import('./kawaii/TasksPage').then(m => m.KawaiiTasksPage),
    dashboard: () => import('./kawaii/DashboardPage').then(m => m.KawaiiDashboardPage),
    financial: () => import('./kawaii/FinancialPage').then(m => m.KawaiiFinancialPage),
    settings: () => import('./kawaii/SettingsPage').then(m => m.KawaiiSettingsPage),
  },
  ocean: {
    tasks: () => import('./ocean/TasksPage').then(m => m.OceanTasksPage),
    dashboard: () => import('./ocean/DashboardPage').then(m => m.OceanDashboardPage),
    financial: () => import('./ocean/FinancialPage').then(m => m.OceanFinancialPage),
    settings: () => import('./ocean/SettingsPage').then(m => m.OceanSettingsPage),
  },
  noir: {
    tasks: () => import('./noir/TasksPage').then(m => m.NoirTasksPage),
    dashboard: () => import('./noir/DashboardPage').then(m => m.NoirDashboardPage),
    financial: () => import('./noir/FinancialPage').then(m => m.NoirFinancialPage),
    settings: () => import('./noir/SettingsPage').then(m => m.NoirSettingsPage),
  },
  'dark-academia': {
    tasks: () => import('./dark-academia/TasksPage').then(m => m.DarkAcademiaTasksPage),
    dashboard: () => import('./dark-academia/DashboardPage').then(m => m.DarkAcademiaDashboardPage),
    financial: () => import('./dark-academia/FinancialPage').then(m => m.DarkAcademiaFinancialPage),
    settings: () => import('./dark-academia/SettingsPage').then(m => m.DarkAcademiaSettingsPage),
  },
  nordic: {
    tasks: () => import('./nordic/TasksPage').then(m => m.NordicTasksPage),
    dashboard: () => import('./nordic/DashboardPage').then(m => m.NordicDashboardPage),
    financial: () => import('./nordic/FinancialPage').then(m => m.NordicFinancialPage),
    settings: () => import('./nordic/SettingsPage').then(m => m.NordicSettingsPage),
  },
  'sacred-serenity': {
    tasks: () => import('./sacred-serenity/TasksPage').then(m => m.SacredSerenityTasksPage),
    dashboard: () => import('./sacred-serenity/DashboardPage').then(m => m.SacredSerenityDashboardPage),
    financial: () => import('./sacred-serenity/FinancialPage').then(m => m.SacredSerenityFinancialPage),
    settings: () => import('./sacred-serenity/SettingsPage').then(m => m.SacredSerenitySettingsPage),
  },
} as const;

export type ThemeWithCustomPages = keyof typeof themedPages;

export function hasCustomPage(themeId: string, page: 'tasks' | 'dashboard' | 'financial' | 'settings'): boolean {
  const themePack = themedPages[themeId as ThemeWithCustomPages];
  return themePack ? page in themePack : false;
}
