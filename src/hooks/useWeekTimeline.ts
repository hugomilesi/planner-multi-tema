import { useMemo } from 'react';

export interface WeekDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  isWeekend: boolean;
}

export function useWeekTimeline() {
  return useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);

    const weekDays: WeekDay[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      const isToday = date.toDateString() === today.toDateString();
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      weekDays.push({
        date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isToday,
        isWeekend,
      });
    }
    
    return weekDays;
  }, []);
}
