// Centralized formatting utilities
// All dates and currencies are formatted in pt-BR

/**
 * Format a date to pt-BR locale
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date + 'T12:00:00') : date;
  return d.toLocaleDateString('pt-BR');
}

/**
 * Format a date with weekday
 */
export function formatDateWithWeekday(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date + 'T12:00:00') : date;
  return d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' });
}

/**
 * Format a date showing only month and year
 */
export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

/**
 * Format a date showing short month and day
 */
export function formatShortDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date + 'T12:00:00') : date;
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
}

/**
 * Format a date showing only the weekday (short)
 */
export function formatWeekday(date: Date): string {
  return date.toLocaleDateString('pt-BR', { weekday: 'short' });
}

/**
 * Format currency in pt-BR with specified currency code
 */
export function formatCurrency(value: number, currency: string = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Format a number with pt-BR locale
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

/**
 * Get relative time description (today, yesterday, etc.)
 */
export function getRelativeDay(date: Date | string): 'today' | 'yesterday' | 'tomorrow' | 'other' {
  const d = typeof date === 'string' ? new Date(date + 'T12:00:00') : date;
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  
  const diffTime = d.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === -1) return 'yesterday';
  if (diffDays === 1) return 'tomorrow';
  return 'other';
}

/**
 * Convert a Date to local date ID (YYYY-MM-DD)
 */
export function toLocalDateId(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Parse a local date ID (YYYY-MM-DD) to Date
 */
export function parseLocalDateId(dateId: string): Date {
  const [y, m, d] = dateId.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/**
 * Get today's date as local date ID
 */
export function getTodayId(): string {
  return toLocalDateId(new Date());
}
