import { Calendar, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useThemedDialog } from '@/hooks/useThemedDialog';
import { cn } from '@/lib/utils';

export type PeriodType = 'current_month' | 'last_3_months' | 'last_6_months' | 'current_year' | 'custom';

export interface PeriodRange {
  type: PeriodType;
  startDate: Date;
  endDate: Date;
  label: string;
}

interface PeriodFilterProps {
  value: PeriodRange;
  onChange: (period: PeriodRange) => void;
  className?: string;
}

export function PeriodFilter({ value, onChange, className }: PeriodFilterProps) {
  const dialogStyles = useThemedDialog();
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const getPeriodRange = (type: PeriodType): PeriodRange => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (type) {
      case 'current_month': {
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { type, startDate: start, endDate: end, label: 'Este Mês' };
      }
      case 'last_3_months': {
        const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { type, startDate: start, endDate: end, label: 'Últimos 3 Meses' };
      }
      case 'last_6_months': {
        const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { type, startDate: start, endDate: end, label: 'Últimos 6 Meses' };
      }
      case 'current_year': {
        const start = new Date(now.getFullYear(), 0, 1);
        const end = new Date(now.getFullYear(), 11, 31);
        return { type, startDate: start, endDate: end, label: 'Este Ano' };
      }
      case 'custom':
        return value; // Return current custom value
      default:
        return getPeriodRange('current_month');
    }
  };

  const handlePeriodChange = (type: PeriodType) => {
    if (type === 'custom') {
      setIsCustomDialogOpen(true);
      return;
    }
    onChange(getPeriodRange(type));
  };

  const handleCustomSubmit = () => {
    if (!customStart || !customEnd) return;

    const start = new Date(customStart);
    const end = new Date(customEnd);

    if (start > end) {
      alert('Data inicial deve ser anterior à data final');
      return;
    }

    const label = `${start.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} - ${end.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}`;

    onChange({
      type: 'custom',
      startDate: start,
      endDate: end,
      label,
    });

    setIsCustomDialogOpen(false);
    setCustomStart('');
    setCustomEnd('');
  };

  return (
    <>
      <div className={className}>
        <Select value={value.type} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-full sm:w-[200px] bg-card border-border">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <SelectValue>{value.label}</SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current_month">Este Mês</SelectItem>
            <SelectItem value="last_3_months">Últimos 3 Meses</SelectItem>
            <SelectItem value="last_6_months">Últimos 6 Meses</SelectItem>
            <SelectItem value="current_year">Este Ano</SelectItem>
            <SelectItem value="custom">Período Customizado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Dialog open={isCustomDialogOpen} onOpenChange={setIsCustomDialogOpen}>
        <DialogContent className={cn("max-w-[90vw] sm:max-w-md", dialogStyles.content)}>
          <DialogHeader className={dialogStyles.header}>
            <DialogTitle className={dialogStyles.title}>Selecionar Período Customizado</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Data Inicial</Label>
              <Input
                id="start-date"
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">Data Final</Label>
              <Input
                id="end-date"
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
              />
            </div>
            <Button onClick={handleCustomSubmit} className="w-full">
              Aplicar Filtro
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Helper function to get default period (current month)
export function getDefaultPeriod(): PeriodRange {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { type: 'current_month', startDate: start, endDate: end, label: 'Este Mês' };
}
