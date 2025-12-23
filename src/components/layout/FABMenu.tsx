import { useState } from 'react';
import { Plus, X, CheckSquare, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { labels } from '@/i18n/labels';
import { CreateTaskDialog } from '@/components/dialogs/CreateTaskDialog';
import { CreateTransactionDialog } from '@/components/dialogs/CreateTransactionDialog';

interface FABMenuProps {
  className?: string;
  style?: React.CSSProperties;
}

export function FABMenu({ className, style }: FABMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);

  const handleTaskClick = () => {
    setIsOpen(false);
    setTaskDialogOpen(true);
  };

  const handleTransactionClick = () => {
    setIsOpen(false);
    setTransactionDialogOpen(true);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* FAB Menu Container */}
      <div className="relative">
        {/* Menu Items */}
        <div className={cn(
          'absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-200',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}>
          {/* New Transaction */}
          <button
            onClick={handleTransactionClick}
            className="flex items-center gap-3 bg-card border border-border rounded-full pl-4 pr-5 py-2.5 shadow-lg hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium whitespace-nowrap">{labels.actions.newTransaction}</span>
          </button>

          {/* New Task */}
          <button
            onClick={handleTaskClick}
            className="flex items-center gap-3 bg-card border border-border rounded-full pl-4 pr-5 py-2.5 shadow-lg hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium whitespace-nowrap">{labels.actions.newTask}</span>
          </button>
        </div>

        {/* Main FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200 z-50',
            isOpen ? 'rotate-45 bg-muted' : '',
            className
          )}
          style={style}
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Plus className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Dialogs */}
      <CreateTaskDialog 
        open={taskDialogOpen} 
        onOpenChange={setTaskDialogOpen} 
      />
      <CreateTransactionDialog 
        open={transactionDialogOpen} 
        onOpenChange={setTransactionDialogOpen} 
      />
    </>
  );
}
