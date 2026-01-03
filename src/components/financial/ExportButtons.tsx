import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportToCSV, exportToPDF, exportCategorySummaryToCSV } from '@/utils/exportData';
import type { Transaction } from '@/stores/financialStore';
import type { PeriodRange } from '@/components/financial/PeriodFilter';

interface ExportButtonsProps {
  transactions: Transaction[];
  period: PeriodRange;
  categories: Array<{ id: string; name: string; icon: string }>;
  categorySpending: Array<{
    id: string;
    name: string;
    spent: number;
    budget?: number;
    percentage: number;
  }>;
  summary: {
    income: number;
    expense: number;
    balance: number;
  };
}

export function ExportButtons({
  transactions,
  period,
  categories,
  categorySpending,
  summary,
}: ExportButtonsProps) {
  const handleExportCSV = () => {
    exportToCSV(transactions, period, categories);
  };

  const handleExportPDF = () => {
    exportToPDF(transactions, period, categories, summary);
  };

  const handleExportCategoryCSV = () => {
    exportCategorySummaryToCSV(categorySpending, period);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleExportPDF} className="gap-2 cursor-pointer">
          <FileText className="w-4 h-4" />
          Relatório PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportCSV} className="gap-2 cursor-pointer">
          <FileSpreadsheet className="w-4 h-4" />
          Transações CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportCategoryCSV} className="gap-2 cursor-pointer">
          <FileSpreadsheet className="w-4 h-4" />
          Categorias CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
