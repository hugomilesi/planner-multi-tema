# Script para Adicionar PeriodFilter e ExportButtons

## Temas que precisam de correção:
- Dark Academia
- Noir  
- Ocean
- Space
- Synthwave
- Sacred Serenity

## Mudanças necessárias em cada FinancialPage.tsx:

### 1. Adicionar imports:
```typescript
import { PeriodFilter } from '@/components/financial/PeriodFilter';
import { ExportButtons } from '@/components/financial/ExportButtons';
```

### 2. Adicionar `filteredTransactions` aos props:
```typescript
export function [Theme]FinancialPage({
  // ... outros props
  filteredTransactions,  // <- ADICIONAR
  // ... resto
}: FinancialPageProps) {
```

### 3. Adicionar ExportButtons no header (após o título, antes do último elemento):
```typescript
{selectedPeriod && filteredTransactions && (
  <ExportButtons
    transactions={filteredTransactions}
    period={selectedPeriod}
    categories={categories}
    categorySpending={categorySpending}
    summary={{ income: monthIncome, expense: monthExpense, balance }}
  />
)}
```

### 4. Adicionar PeriodFilter após o header:
```typescript
{/* Period Filter */}
{selectedPeriod && setSelectedPeriod && (
  <PeriodFilter 
    value={selectedPeriod} 
    onChange={setSelectedPeriod}
    className="w-full"
  />
)}
```

## Status:
- ✅ Kawaii - Completo
- ⏳ Dark Academia - Pendente
- ⏳ Noir - Pendente
- ⏳ Ocean - Pendente
- ⏳ Space - Pendente
- ⏳ Synthwave - Pendente
- ⏳ Sacred Serenity - Pendente
