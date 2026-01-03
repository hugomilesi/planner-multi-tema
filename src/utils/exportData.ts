import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Transaction } from '@/stores/financialStore';
import type { PeriodRange } from '@/components/financial/PeriodFilter';

// Exportar transações para CSV
export function exportToCSV(
  transactions: Transaction[],
  period: PeriodRange,
  categories: Array<{ id: string; name: string; icon: string }>
) {
  // Cabeçalhos do CSV
  const headers = ['Data', 'Tipo', 'Categoria', 'Valor', 'Nota'];
  
  // Dados das transações
  const rows = transactions.map(t => {
    const category = categories.find(c => c.id === t.categoryId);
    return [
      new Date(t.date).toLocaleDateString('pt-BR'),
      t.type === 'income' ? 'Receita' : 'Despesa',
      category?.name || 'Sem categoria',
      t.amount.toFixed(2),
      t.note || '-'
    ];
  });

  // Criar conteúdo CSV
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Criar blob e download
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `transacoes_${period.label.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Exportar relatório financeiro para PDF
export function exportToPDF(
  transactions: Transaction[],
  period: PeriodRange,
  categories: Array<{ id: string; name: string; icon: string }>,
  summary: {
    income: number;
    expense: number;
    balance: number;
  }
) {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.text('Relatório Financeiro', 14, 20);
  
  // Período
  doc.setFontSize(12);
  doc.text(`Período: ${period.label}`, 14, 30);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 37);
  
  // Resumo
  doc.setFontSize(14);
  doc.text('Resumo', 14, 50);
  
  doc.setFontSize(11);
  doc.setTextColor(34, 197, 94); // Verde
  doc.text(`Receitas: R$ ${summary.income.toFixed(2)}`, 14, 58);
  
  doc.setTextColor(239, 68, 68); // Vermelho
  doc.text(`Despesas: R$ ${summary.expense.toFixed(2)}`, 14, 65);
  
  doc.setTextColor(0, 0, 0); // Preto
  const balanceColor = summary.balance >= 0 ? [34, 197, 94] : [239, 68, 68];
  doc.setTextColor(balanceColor[0], balanceColor[1], balanceColor[2]);
  doc.text(`Saldo: R$ ${summary.balance.toFixed(2)}`, 14, 72);
  
  // Tabela de transações
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text('Transações', 14, 85);
  
  const tableData = transactions.map(t => {
    const category = categories.find(c => c.id === t.categoryId);
    return [
      new Date(t.date).toLocaleDateString('pt-BR'),
      t.type === 'income' ? 'Receita' : 'Despesa',
      category?.name || 'Sem categoria',
      `R$ ${t.amount.toFixed(2)}`,
      t.note || '-'
    ];
  });
  
  autoTable(doc, {
    startY: 90,
    head: [['Data', 'Tipo', 'Categoria', 'Valor', 'Nota']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 25 },
      2: { cellWidth: 40 },
      3: { cellWidth: 30 },
      4: { cellWidth: 60 }
    }
  });
  
  // Salvar PDF
  doc.save(`relatorio_financeiro_${period.label.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
}

// Exportar resumo por categoria para CSV
export function exportCategorySummaryToCSV(
  categorySpending: Array<{
    id: string;
    name: string;
    spent: number;
    budget?: number;
    percentage: number;
  }>,
  period: PeriodRange
) {
  const headers = ['Categoria', 'Gasto', 'Orçamento', 'Percentual'];
  
  const rows = categorySpending.map(cat => [
    cat.name,
    cat.spent.toFixed(2),
    cat.budget?.toFixed(2) || '-',
    `${cat.percentage.toFixed(1)}%`
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `gastos_por_categoria_${period.label.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
