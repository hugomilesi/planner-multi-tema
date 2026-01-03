// Unified theme styling configuration
// All visual styles for each theme in one place

export interface ThemeStyles {
  // Common styles
  container: string;
  card: string;
  cardHover: string;
  button: string;
  buttonHover: string;
  
  // Task-specific styles
  taskCard: string;
  taskCardCompleted: string;
  taskPriorityHigh: string;
  taskPriorityMedium: string;
  taskPriorityLow: string;
  
  // Financial-specific styles
  incomeCard: string;
  expenseCard: string;
  balanceCard: string;
  
  // Dashboard-specific styles
  statCard: string;
  progressBar: string;
  
  // Typography
  heading: string;
  subheading: string;
  body: string;
  
  // Decorative elements
  accent: string;
  border: string;
  shadow: string;
  glow: string;
}

export const themeStyles: Record<string, ThemeStyles> = {
  cyberpunk: {
    container: 'bg-[#0b0c15] text-white',
    card: 'bg-[#1a1b2e] border border-[#ff00ff]/30 rounded-lg',
    cardHover: 'hover:border-[#00ffff] hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]',
    button: 'bg-[#ff00ff] text-white border border-[#ff00ff]',
    buttonHover: 'hover:bg-[#00ffff] hover:border-[#00ffff] hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]',
    
    taskCard: 'bg-[#1a1b2e] border-2 border-[#ff00ff]/20 rounded-lg p-4',
    taskCardCompleted: 'opacity-60 border-[#00ffff]/30',
    taskPriorityHigh: 'border-l-4 border-l-[#ff00ff]',
    taskPriorityMedium: 'border-l-4 border-l-[#00ffff]',
    taskPriorityLow: 'border-l-4 border-l-[#9d4edd]',
    
    incomeCard: 'bg-gradient-to-br from-[#00ffff]/10 to-[#00ffff]/5 border border-[#00ffff]/30',
    expenseCard: 'bg-gradient-to-br from-[#ff00ff]/10 to-[#ff00ff]/5 border border-[#ff00ff]/30',
    balanceCard: 'bg-gradient-to-br from-[#1a1b2e] to-[#0b0c15] border-2 border-[#ff00ff]/50',
    
    statCard: 'bg-[#1a1b2e]/50 backdrop-blur-sm border border-white/10 rounded-xl',
    progressBar: 'bg-gradient-to-r from-[#ff00ff] to-[#00ffff]',
    
    heading: 'font-mono text-white uppercase tracking-wider',
    subheading: 'text-[#00ffff] font-mono text-sm',
    body: 'text-white/80',
    
    accent: 'text-[#ff00ff]',
    border: 'border-[#ff00ff]/30',
    shadow: 'shadow-[0_0_30px_rgba(255,0,255,0.3)]',
    glow: 'shadow-[0_0_20px_rgba(0,255,255,0.5)]',
  },
  
  western: {
    container: 'bg-[#f3e5ab] text-[#2c1810]',
    card: 'bg-[#fffdf0] border-2 border-[#2c1810] rounded-sm',
    cardHover: 'hover:shadow-[2px_2px_8px_rgba(0,0,0,0.3)]',
    button: 'bg-[#d4af37] text-[#2c1810] border-2 border-[#2c1810]',
    buttonHover: 'hover:bg-[#2c1810] hover:text-[#f3e5ab]',
    
    taskCard: 'bg-[#fffdf0] border-2 border-[#2c1810] rounded-sm p-4',
    taskCardCompleted: 'opacity-70 bg-[#e8dfc5]',
    taskPriorityHigh: 'border-l-4 border-l-[#8b0000]',
    taskPriorityMedium: 'border-l-4 border-l-[#d4af37]',
    taskPriorityLow: 'border-l-4 border-l-[#2e4a2e]',
    
    incomeCard: 'bg-[#fffdf0] border-2 border-[#2e4a2e] rounded-sm',
    expenseCard: 'bg-[#fffdf0] border-2 border-[#8b0000] rounded-sm',
    balanceCard: 'bg-gradient-to-br from-[#e8dfc5] to-[#d8c8b0] border-4 border-double border-[#2c1810] rounded-lg',
    
    statCard: 'bg-[#fffdf0] border-2 border-[#2c1810] rounded-sm',
    progressBar: 'bg-[#d4af37]',
    
    heading: 'font-rye text-[#2c1810] uppercase tracking-wide',
    subheading: 'text-[#2c1810]/70 font-courier-prime text-xs uppercase',
    body: 'text-[#2c1810]',
    
    accent: 'text-[#d4af37]',
    border: 'border-[#2c1810]',
    shadow: 'shadow-[2px_2px_5px_rgba(0,0,0,0.2)]',
    glow: '',
  },
  
  nordic: {
    container: 'bg-gradient-to-b from-[#f4e4d8] to-[#c89878] text-[#2c2825]',
    card: 'bg-white/95 border border-[#d1c7b0] rounded-xl shadow-md',
    cardHover: 'hover:shadow-lg',
    button: 'bg-[#c24d3b] text-white border border-[#a03d2d]',
    buttonHover: 'hover:bg-[#a03d2d]',
    
    taskCard: 'bg-white/95 border border-[#d1c7b0] rounded-xl p-4',
    taskCardCompleted: 'opacity-60',
    taskPriorityHigh: 'border-l-4 border-l-[#c24d3b]',
    taskPriorityMedium: 'border-l-4 border-l-[#3d5a6b]',
    taskPriorityLow: 'border-l-4 border-l-[#8a8078]',
    
    incomeCard: 'bg-white/95 border border-[#3d5a6b] rounded-xl',
    expenseCard: 'bg-white/95 border border-[#c24d3b] rounded-xl',
    balanceCard: 'bg-gradient-to-br from-[#e8dfc5] to-[#d8c8b0] border border-[#c8b8a0] rounded-xl',
    
    statCard: 'bg-white/95 border border-[#d1c7b0] rounded-xl',
    progressBar: 'bg-[#c24d3b]',
    
    heading: 'font-courier-prime text-[#2c2825] uppercase tracking-widest font-bold',
    subheading: 'text-[#5d5650] font-courier-prime text-xs uppercase tracking-wider',
    body: 'text-[#2c2825]',
    
    accent: 'text-[#c24d3b]',
    border: 'border-[#d1c7b0]',
    shadow: 'shadow-md',
    glow: '',
  },
  
  'dark-academia': {
    container: 'bg-[#1a1612] text-stone-100',
    card: 'bg-[#2a2520] border border-[#3a3530] rounded-lg',
    cardHover: 'hover:border-[#C5A065] hover:shadow-lg',
    button: 'bg-[#C5A065] text-[#1a1612] border border-[#C5A065]',
    buttonHover: 'hover:bg-[#d4af37]',
    
    taskCard: 'bg-[#2a2520] border border-[#3a3530] rounded-lg p-4',
    taskCardCompleted: 'opacity-60 border-[#C5A065]/30',
    taskPriorityHigh: 'border-l-4 border-l-[#8b4513]',
    taskPriorityMedium: 'border-l-4 border-l-[#C5A065]',
    taskPriorityLow: 'border-l-4 border-l-stone-600',
    
    incomeCard: 'bg-[#2a2520] border border-[#C5A065]/50 rounded-lg',
    expenseCard: 'bg-[#2a2520] border border-[#8b4513]/50 rounded-lg',
    balanceCard: 'bg-gradient-to-br from-[#2a2520] to-[#1a1612] border-2 border-[#C5A065] rounded-lg',
    
    statCard: 'bg-[#2a2520] border border-[#3a3530] rounded-lg',
    progressBar: 'bg-[#C5A065]',
    
    heading: 'font-serif text-stone-100 font-semibold',
    subheading: 'text-stone-400 text-xs uppercase tracking-widest',
    body: 'text-stone-300',
    
    accent: 'text-[#C5A065]',
    border: 'border-[#3a3530]',
    shadow: 'shadow-lg',
    glow: '',
  },
  
  ocean: {
    container: 'bg-gradient-to-b from-[#0a1929] to-[#1e3a5f] text-white',
    card: 'bg-[#1e3a5f]/50 backdrop-blur-sm border border-[#4fc3f7]/30 rounded-xl',
    cardHover: 'hover:border-[#4fc3f7] hover:shadow-[0_0_20px_rgba(79,195,247,0.3)]',
    button: 'bg-[#4fc3f7] text-[#0a1929] border border-[#4fc3f7]',
    buttonHover: 'hover:bg-[#29b6f6]',
    
    taskCard: 'bg-[#1e3a5f]/50 backdrop-blur-sm border border-[#4fc3f7]/30 rounded-xl p-4',
    taskCardCompleted: 'opacity-60 border-[#81c784]/30',
    taskPriorityHigh: 'border-l-4 border-l-[#f44336]',
    taskPriorityMedium: 'border-l-4 border-l-[#4fc3f7]',
    taskPriorityLow: 'border-l-4 border-l-[#81c784]',
    
    incomeCard: 'bg-[#1e3a5f]/50 border border-[#81c784]/50 rounded-xl',
    expenseCard: 'bg-[#1e3a5f]/50 border border-[#f44336]/50 rounded-xl',
    balanceCard: 'bg-gradient-to-br from-[#1e3a5f] to-[#0a1929] border-2 border-[#4fc3f7]/50 rounded-xl',
    
    statCard: 'bg-[#1e3a5f]/50 backdrop-blur-sm border border-[#4fc3f7]/30 rounded-xl',
    progressBar: 'bg-gradient-to-r from-[#4fc3f7] to-[#29b6f6]',
    
    heading: 'text-white font-bold',
    subheading: 'text-[#4fc3f7] text-sm',
    body: 'text-white/90',
    
    accent: 'text-[#4fc3f7]',
    border: 'border-[#4fc3f7]/30',
    shadow: 'shadow-[0_0_20px_rgba(79,195,247,0.2)]',
    glow: 'shadow-[0_0_15px_rgba(79,195,247,0.4)]',
  },
  
  synthwave: {
    container: 'bg-[#1a0033] text-white',
    card: 'bg-[#2d0066]/50 backdrop-blur-sm border border-[#ff00ff]/30 rounded-lg',
    cardHover: 'hover:border-[#00ffff] hover:shadow-[0_0_25px_rgba(255,0,255,0.4)]',
    button: 'bg-gradient-to-r from-[#ff00ff] to-[#00ffff] text-white',
    buttonHover: 'hover:shadow-[0_0_20px_rgba(255,0,255,0.6)]',
    
    taskCard: 'bg-[#2d0066]/50 backdrop-blur-sm border border-[#ff00ff]/30 rounded-lg p-4',
    taskCardCompleted: 'opacity-60 border-[#00ffff]/30',
    taskPriorityHigh: 'border-l-4 border-l-[#ff00ff]',
    taskPriorityMedium: 'border-l-4 border-l-[#ff00aa]',
    taskPriorityLow: 'border-l-4 border-l-[#9d4edd]',
    
    incomeCard: 'bg-[#2d0066]/50 border border-[#00ffff]/50 rounded-lg',
    expenseCard: 'bg-[#2d0066]/50 border border-[#ff00ff]/50 rounded-lg',
    balanceCard: 'bg-gradient-to-br from-[#2d0066] to-[#1a0033] border-2 border-[#ff00ff]/50 rounded-lg',
    
    statCard: 'bg-[#2d0066]/50 backdrop-blur-sm border border-[#ff00ff]/30 rounded-lg',
    progressBar: 'bg-gradient-to-r from-[#ff00ff] via-[#ff00aa] to-[#00ffff]',
    
    heading: 'text-white font-bold uppercase tracking-wider',
    subheading: 'text-[#ff00ff] text-sm',
    body: 'text-white/90',
    
    accent: 'text-[#ff00ff]',
    border: 'border-[#ff00ff]/30',
    shadow: 'shadow-[0_0_30px_rgba(255,0,255,0.3)]',
    glow: 'shadow-[0_0_25px_rgba(255,0,255,0.5)]',
  },
  
  kawaii: {
    container: 'bg-[#2d1f24] text-white',
    card: 'bg-[#3d2a32] border border-rose-900/30 rounded-[1.5rem] shadow-sm',
    cardHover: 'hover:border-[#d47a96]/30 hover:shadow-[0_4px_20px_-2px_rgba(212,122,150,0.25)]',
    button: 'bg-gradient-to-br from-[#d47a96] to-[#b85c78] text-white rounded-full shadow-xl shadow-[#d47a96]/40',
    buttonHover: 'hover:scale-110 transition-all duration-300',
    
    taskCard: 'bg-[#3d2a32] border border-rose-900/30 rounded-[1.5rem] p-4 shadow-sm',
    taskCardCompleted: 'opacity-70 bg-[#3d2a32]/50 border-rose-900/20',
    taskPriorityHigh: 'border-l-4 border-l-[#d47a96]',
    taskPriorityMedium: 'border-l-4 border-l-[#d4b06a]',
    taskPriorityLow: 'border-l-4 border-l-[#a3c9a8]',
    
    incomeCard: 'bg-gradient-to-br from-[#a3c9a8]/20 to-[#3d2a32] border border-[#a3c9a8]/30 rounded-[1.5rem]',
    expenseCard: 'bg-gradient-to-br from-[#d47a96]/20 to-[#3d2a32] border border-[#d47a96]/30 rounded-[1.5rem]',
    balanceCard: 'bg-[#3d2a32] border border-rose-900/30 rounded-[2rem] shadow-[0_4px_20px_-2px_rgba(212,122,150,0.15)]',
    
    statCard: 'bg-[#3d2a32] border border-rose-900/30 rounded-[1.5rem] shadow-sm',
    progressBar: 'bg-gradient-to-r from-[#a3c9a8] to-[#d47a96]',
    
    heading: 'text-white font-bold',
    subheading: 'text-[#9e7f8a] text-sm font-medium',
    body: 'text-white',
    
    accent: 'text-[#d47a96]',
    border: 'border-rose-900/30',
    shadow: 'shadow-[0_4px_20px_-2px_rgba(212,122,150,0.15)]',
    glow: 'shadow-[0_0_20px_-5px_rgba(212,122,150,0.3)]',
  },
  
  noir: {
    container: 'bg-[#0a0a0a] text-white',
    card: 'bg-[#1a1a1a] border border-white/10 rounded-sm',
    cardHover: 'hover:border-white/30',
    button: 'bg-white text-black border border-white',
    buttonHover: 'hover:bg-black hover:text-white',
    
    taskCard: 'bg-[#1a1a1a] border border-white/10 rounded-sm p-4',
    taskCardCompleted: 'opacity-50 border-white/5',
    taskPriorityHigh: 'border-l-4 border-l-white',
    taskPriorityMedium: 'border-l-4 border-l-white/60',
    taskPriorityLow: 'border-l-4 border-l-white/30',
    
    incomeCard: 'bg-[#1a1a1a] border border-white/20 rounded-sm',
    expenseCard: 'bg-[#1a1a1a] border border-white/10 rounded-sm',
    balanceCard: 'bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-white/20 rounded-sm',
    
    statCard: 'bg-[#1a1a1a] border border-white/10 rounded-sm',
    progressBar: 'bg-white',
    
    heading: 'text-white font-bold uppercase tracking-widest',
    subheading: 'text-white/60 text-xs uppercase tracking-wider',
    body: 'text-white/80',
    
    accent: 'text-white',
    border: 'border-white/10',
    shadow: 'shadow-2xl',
    glow: '',
  },
  
  space: {
    container: 'bg-[#0a0a1a] text-white',
    card: 'bg-[#1a1a2e]/50 backdrop-blur-sm border border-[#6c63ff]/30 rounded-xl',
    cardHover: 'hover:border-[#6c63ff] hover:shadow-[0_0_20px_rgba(108,99,255,0.3)]',
    button: 'bg-[#6c63ff] text-white border border-[#6c63ff]',
    buttonHover: 'hover:bg-[#5a52d5]',
    
    taskCard: 'bg-[#1a1a2e]/50 backdrop-blur-sm border border-[#6c63ff]/30 rounded-xl p-4',
    taskCardCompleted: 'opacity-60 border-[#4ecca3]/30',
    taskPriorityHigh: 'border-l-4 border-l-[#ff6b6b]',
    taskPriorityMedium: 'border-l-4 border-l-[#6c63ff]',
    taskPriorityLow: 'border-l-4 border-l-[#4ecca3]',
    
    incomeCard: 'bg-[#1a1a2e]/50 border border-[#4ecca3]/50 rounded-xl',
    expenseCard: 'bg-[#1a1a2e]/50 border border-[#ff6b6b]/50 rounded-xl',
    balanceCard: 'bg-gradient-to-br from-[#1a1a2e] to-[#0a0a1a] border-2 border-[#6c63ff]/50 rounded-xl',
    
    statCard: 'bg-[#1a1a2e]/50 backdrop-blur-sm border border-[#6c63ff]/30 rounded-xl',
    progressBar: 'bg-gradient-to-r from-[#6c63ff] to-[#4ecca3]',
    
    heading: 'text-white font-bold',
    subheading: 'text-[#6c63ff] text-sm',
    body: 'text-white/90',
    
    accent: 'text-[#6c63ff]',
    border: 'border-[#6c63ff]/30',
    shadow: 'shadow-[0_0_20px_rgba(108,99,255,0.2)]',
    glow: 'shadow-[0_0_15px_rgba(108,99,255,0.4)]',
  },
  
  'sacred-serenity': {
    container: 'bg-gradient-to-b from-[#f5f0e8] to-[#e8dcc8] text-[#5a4a3a]',
    card: 'bg-white/90 border border-[#d4c4b0] rounded-lg shadow-md',
    cardHover: 'hover:shadow-lg',
    button: 'bg-[#8b7355] text-white border border-[#6b5345]',
    buttonHover: 'hover:bg-[#6b5345]',
    
    taskCard: 'bg-white/90 border border-[#d4c4b0] rounded-lg p-4',
    taskCardCompleted: 'opacity-60',
    taskPriorityHigh: 'border-l-4 border-l-[#8b4513]',
    taskPriorityMedium: 'border-l-4 border-l-[#8b7355]',
    taskPriorityLow: 'border-l-4 border-l-[#a89f91]',
    
    incomeCard: 'bg-white/90 border border-[#9acd32]/50 rounded-lg',
    expenseCard: 'bg-white/90 border border-[#8b4513]/50 rounded-lg',
    balanceCard: 'bg-gradient-to-br from-white to-[#f5f0e8] border-2 border-[#8b7355] rounded-lg',
    
    statCard: 'bg-white/90 border border-[#d4c4b0] rounded-lg',
    progressBar: 'bg-[#8b7355]',
    
    heading: 'text-[#5a4a3a] font-serif font-semibold',
    subheading: 'text-[#8b7355] text-sm',
    body: 'text-[#5a4a3a]',
    
    accent: 'text-[#8b7355]',
    border: 'border-[#d4c4b0]',
    shadow: 'shadow-md',
    glow: '',
  },
};

// Helper function to get theme styles
export function getThemeStyles(themeId: string): ThemeStyles {
  return themeStyles[themeId] || themeStyles.nordic;
}
