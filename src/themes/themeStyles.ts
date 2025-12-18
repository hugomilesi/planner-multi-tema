export interface ThemeVisualConfig {
  fonts: {
    heading: string;
    body: string;
  };
  labels: {
    dashboard: string;
    tasks: string;
    taskList: string;
    financial: string;
    budget: string;
    settings: string;
    greeting: string;
    progress: string;
    priority: string;
    income: string;
    expense: string;
  };
  card: {
    className: string;
    style: React.CSSProperties;
    titleClassName: string;
    decorations?: React.ReactNode;
  };
  progressBar: {
    className: string;
    fillClassName: string;
    style?: React.CSSProperties;
  };
  badge: {
    high: string;
    medium: string;
    low: string;
  };
}

export const themeVisuals: Record<string, ThemeVisualConfig> = {
  cyberpunk: {
    fonts: {
      heading: 'font-[family-name:var(--font-orbitron)]',
      body: 'font-[family-name:var(--font-space-grotesk)]',
    },
    labels: {
      dashboard: 'COMMAND CENTER',
      tasks: 'QUEST LOG',
      taskList: 'ACTIVE MISSIONS',
      financial: 'CREDITS',
      budget: 'CREDIT LIMIT',
      settings: 'SYSTEM CONFIG',
      greeting: 'WELCOME BACK, OPERATOR',
      progress: 'SYSTEM STATUS',
      priority: 'PRIORITY LEVEL',
      income: 'CREDITS IN',
      expense: 'CREDITS OUT',
    },
    card: {
      className: 'border-2 border-[#ff00ff]/50 bg-[#0a0014] text-white',
      style: {},
      titleClassName: 'text-[#00ffff] uppercase tracking-[0.2em] text-xs font-bold',
    },
    progressBar: {
      className: 'h-6 bg-[#4d008c] p-1 flex gap-1',
      fillClassName: 'bg-[#ff00ff]',
    },
    badge: {
      high: 'bg-[#ff00ff] text-white border border-white',
      medium: 'bg-[#00ffff] text-black border border-white',
      low: 'bg-[#120024] text-[#00ffff] border border-[#00ffff]',
    },
  },
  western: {
    fonts: {
      heading: 'font-[family-name:var(--font-rye)]',
      body: 'font-[family-name:var(--font-geist-sans)]',
    },
    labels: {
      dashboard: 'HOMESTEAD',
      tasks: 'BOUNTY BOARD',
      taskList: 'WANTED LIST',
      financial: 'TOWN BANK LEDGER',
      budget: 'CREDIT LIMIT',
      settings: 'GEAR',
      greeting: 'HOWDY, PARTNER',
      progress: 'DAILY BOUNTY',
      priority: 'WANTED LEVEL',
      income: 'GOLD EARNED',
      expense: 'GOLD SPENT',
    },
    card: {
      className: 'border-2 border-amber-700/60 bg-amber-950 text-amber-100 rounded-sm',
      style: {},
      titleClassName: 'text-amber-300 uppercase tracking-wide text-sm font-bold',
    },
    progressBar: {
      className: 'h-4 bg-amber-900 rounded-sm border border-amber-700',
      fillClassName: 'bg-gradient-to-r from-amber-600 to-amber-400 rounded-sm',
    },
    badge: {
      high: 'bg-red-700 text-white border border-red-900',
      medium: 'bg-amber-600 text-white border border-amber-800',
      low: 'bg-amber-900 text-amber-200 border border-amber-700',
    },
  },
  kawaii: {
    fonts: {
      heading: 'font-[family-name:var(--font-fredoka)]',
      body: 'font-[family-name:var(--font-fredoka)]',
    },
    labels: {
      dashboard: 'My Happy Place ✨',
      tasks: 'To-Do List 📝',
      taskList: 'Fun Tasks!',
      financial: 'My Piggy Bank 🐷',
      budget: 'Spending Limit',
      settings: 'Settings ⚙️',
      greeting: 'Hi there! 👋',
      progress: 'Daily Mission 🚀',
      priority: 'Importance',
      income: 'Money In 💰',
      expense: 'Money Out 💸',
    },
    card: {
      className: 'border-2 border-pink-200 bg-white text-gray-800 rounded-3xl',
      style: {},
      titleClassName: 'text-pink-600 font-medium text-base',
    },
    progressBar: {
      className: 'h-5 bg-pink-100 rounded-full overflow-hidden',
      fillClassName: 'bg-gradient-to-r from-green-400 to-emerald-400 rounded-full',
    },
    badge: {
      high: 'bg-pink-500 text-white rounded-full',
      medium: 'bg-yellow-400 text-yellow-900 rounded-full',
      low: 'bg-green-400 text-green-900 rounded-full',
    },
  },
  noir: {
    fonts: {
      heading: 'font-[family-name:var(--font-playfair)] italic',
      body: 'font-[family-name:var(--font-geist-sans)]',
    },
    labels: {
      dashboard: 'The Office',
      tasks: 'Case Files',
      taskList: 'Open Cases',
      financial: 'The Ledger',
      budget: 'Credit Line',
      settings: 'Preferences',
      greeting: 'Evening',
      progress: 'Case Progress',
      priority: 'Urgency',
      income: 'Income',
      expense: 'Expenses',
    },
    card: {
      className: 'border border-white/20 bg-[#0a0a0a] text-gray-200',
      style: {},
      titleClassName: 'text-gray-400 uppercase tracking-widest text-xs',
    },
    progressBar: {
      className: 'h-2 bg-gray-800 rounded-none',
      fillClassName: 'bg-gradient-to-r from-gray-500 to-gray-300',
    },
    badge: {
      high: 'bg-white text-black',
      medium: 'bg-gray-600 text-white',
      low: 'bg-gray-800 text-gray-400 border border-gray-700',
    },
  },
  space: {
    fonts: {
      heading: 'font-[family-name:var(--font-orbitron)]',
      body: 'font-[family-name:var(--font-space-grotesk)]',
    },
    labels: {
      dashboard: 'Mission Control',
      tasks: 'Mission Log',
      taskList: 'Active Missions',
      financial: 'Resource Allocation',
      budget: 'Resource Cap',
      settings: 'Ship Config',
      greeting: 'Welcome, Commander',
      progress: 'Mission Progress',
      priority: 'Priority',
      income: 'Resources In',
      expense: 'Resources Out',
    },
    card: {
      className: 'border border-purple-500/40 bg-[#0d0a1a] text-purple-100 rounded-lg',
      style: {},
      titleClassName: 'text-purple-400 uppercase tracking-wider text-xs font-medium',
    },
    progressBar: {
      className: 'h-3 bg-slate-800 rounded-full overflow-hidden border border-purple-500/20',
      fillClassName: 'bg-gradient-to-r from-purple-600 to-violet-400',
    },
    badge: {
      high: 'bg-purple-600 text-white',
      medium: 'bg-violet-500 text-white border border-violet-400',
      low: 'bg-slate-700 text-slate-300',
    },
  },
  ocean: {
    fonts: {
      heading: 'font-[family-name:var(--font-geist-sans)]',
      body: 'font-[family-name:var(--font-geist-sans)]',
    },
    labels: {
      dashboard: 'Captain\'s Log',
      tasks: 'Ship\'s Duties',
      taskList: 'Tasks Ahead',
      financial: 'Treasure Chest',
      budget: 'Treasure Limit',
      settings: 'Navigation',
      greeting: 'Ahoy, Captain',
      progress: 'Voyage Progress',
      priority: 'Priority',
      income: 'Treasure Found',
      expense: 'Treasure Spent',
    },
    card: {
      className: 'border border-cyan-500/40 bg-[#0a1a20] text-cyan-100 rounded-xl',
      style: {},
      titleClassName: 'text-cyan-400 font-medium text-sm',
    },
    progressBar: {
      className: 'h-3 bg-slate-700 rounded-full overflow-hidden',
      fillClassName: 'bg-gradient-to-r from-cyan-500 to-teal-400',
    },
    badge: {
      high: 'bg-cyan-500 text-white',
      medium: 'bg-teal-500 text-white border border-teal-400',
      low: 'bg-slate-600 text-slate-300',
    },
  },
  synthwave: {
    fonts: {
      heading: 'font-[family-name:var(--font-orbitron)]',
      body: 'font-[family-name:var(--font-space-grotesk)]',
    },
    labels: {
      dashboard: 'MAINFRAME',
      tasks: 'TASK GRID',
      taskList: 'ACTIVE PROCESSES',
      financial: 'CREDIT FLOW',
      budget: 'LIMIT',
      settings: 'SYSTEM',
      greeting: 'WELCOME BACK',
      progress: 'SYNC STATUS',
      priority: 'PRIORITY',
      income: 'INFLOW',
      expense: 'OUTFLOW',
    },
    card: {
      className: 'border-2 border-[#ff6ec7]/50 bg-[#12051f] text-pink-100',
      style: {},
      titleClassName: 'text-[#ff6ec7] uppercase tracking-[0.15em] text-xs font-bold',
    },
    progressBar: {
      className: 'h-4 bg-[#2d1b4e] rounded-none border border-[#ff6ec7]/30',
      fillClassName: 'bg-gradient-to-r from-[#ff6ec7] to-[#ffcc00]',
    },
    badge: {
      high: 'bg-[#ff6ec7] text-white',
      medium: 'bg-[#ffcc00] text-black',
      low: 'bg-[#1a0533] text-[#ff6ec7] border border-[#ff6ec7]',
    },
  },
  'dark-academia': {
    fonts: {
      heading: 'font-[family-name:var(--font-cormorant)] font-semibold',
      body: 'font-[family-name:var(--font-geist-sans)]',
    },
    labels: {
      dashboard: 'Study',
      tasks: 'Reading List',
      taskList: 'Pending Studies',
      financial: 'Accounts',
      budget: 'Allowance',
      settings: 'Preferences',
      greeting: 'Good day, Scholar',
      progress: 'Daily Progress',
      priority: 'Priority',
      income: 'Income',
      expense: 'Expenditure',
    },
    card: {
      className: 'border border-amber-800/50 bg-[#1a1510] text-amber-100 rounded-sm',
      style: {},
      titleClassName: 'text-amber-400 tracking-wide text-sm',
    },
    progressBar: {
      className: 'h-2 bg-stone-800 rounded-none border border-amber-900/50',
      fillClassName: 'bg-gradient-to-r from-amber-700 to-amber-500',
    },
    badge: {
      high: 'bg-amber-700 text-white',
      medium: 'bg-stone-600 text-stone-200',
      low: 'bg-stone-800 text-stone-400 border border-stone-700',
    },
  },
  nordic: {
    fonts: {
      heading: 'font-[family-name:var(--font-geist-sans)] font-semibold',
      body: 'font-[family-name:var(--font-geist-sans)]',
    },
    labels: {
      dashboard: 'Overview',
      tasks: 'Tasks',
      taskList: 'To Do',
      financial: 'Budget',
      budget: 'Limit',
      settings: 'Settings',
      greeting: 'Good day',
      progress: 'Daily Progress',
      priority: 'Priority',
      income: 'Income',
      expense: 'Expenses',
    },
    card: {
      className: 'border border-slate-200 bg-white text-slate-800 rounded-xl',
      style: {},
      titleClassName: 'text-slate-600 font-medium text-sm',
    },
    progressBar: {
      className: 'h-2 bg-slate-100 rounded-full overflow-hidden',
      fillClassName: 'bg-gradient-to-r from-blue-500 to-blue-400',
    },
    badge: {
      high: 'bg-red-500 text-white',
      medium: 'bg-amber-500 text-white',
      low: 'bg-slate-200 text-slate-600',
    },
  },
};

export function getThemeVisuals(themeId: string): ThemeVisualConfig {
  return themeVisuals[themeId] || themeVisuals.nordic;
}
