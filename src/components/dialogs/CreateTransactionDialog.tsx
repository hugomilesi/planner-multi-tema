import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useFinancialStore } from '@/stores/financialStore';
import { labels } from '@/i18n/labels';
import { getTodayId } from '@/lib/format';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CreateTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultType?: 'income' | 'expense';
}

export function CreateTransactionDialog({
  open,
  onOpenChange,
  defaultType = 'expense'
}: CreateTransactionDialogProps) {
  const { categories, addTransaction } = useFinancialStore();
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>(defaultType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    categoryId: '',
    date: getTodayId(),
    note: '',
  });

  const expenseCategories = categories.filter((c) => c.type === 'expense');
  const incomeCategories = categories.filter((c) => c.type === 'income');
  const currentCategories = transactionType === 'expense' ? expenseCategories : incomeCategories;

  const handleSubmit = async () => {
    // Prevent multiple submissions
    if (isSubmitting) {
      console.log('⚠️ Already submitting, ignoring click');
      return;
    }

    const amount = parseFloat(newTransaction.amount);
    if (isNaN(amount) || amount <= 0 || !newTransaction.categoryId) {
      console.log('❌ Validation failed:', { amount, categoryId: newTransaction.categoryId });
      return;
    }

    console.log('🚀 Starting transaction submission...');

    setIsSubmitting(true);

    try {
      await addTransaction({
        type: transactionType,
        amount,
        categoryId: newTransaction.categoryId,
        date: newTransaction.date,
        note: newTransaction.note,
      });

      console.log('✅ Transaction added successfully');

      // Reset form
      setNewTransaction({
        amount: '',
        categoryId: '',
        date: getTodayId(),
        note: '',
      });
      onOpenChange(false);
    } catch (error) {
      console.error('❌ Error adding transaction:', error);
    } finally {
      console.log('🏁 Resetting isSubmitting');
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Reset category when type changes
  const handleTypeChange = (type: 'income' | 'expense') => {
    setTransactionType(type);
    setNewTransaction({ ...newTransaction, categoryId: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] rounded-2xl">
        <DialogHeader>
          <DialogTitle>{labels.actions.newTransaction}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Tabs value={transactionType} onValueChange={(v) => handleTypeChange(v as 'income' | 'expense')}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="expense" className="gap-2">
                <TrendingDown className="w-4 h-4" />
                {labels.financial.expenses}
              </TabsTrigger>
              <TabsTrigger value="income" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                {labels.financial.income}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="transaction-amount">{labels.financial.amount}</Label>
            <Input
              id="transaction-amount"
              type="number"
              placeholder="0,00"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label>{labels.financial.category}</Label>
            <Select
              value={newTransaction.categoryId}
              onValueChange={(value) => setNewTransaction({ ...newTransaction, categoryId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {currentCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transaction-date">{labels.financial.date}</Label>
              <Input
                id="transaction-date"
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transaction-note">{labels.financial.note}</Label>
              <Input
                id="transaction-note"
                placeholder={labels.misc.optional}
                value={newTransaction.note}
                onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Adicionando...' : labels.actions.add}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
