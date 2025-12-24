import { useState } from 'react';
import { useTaskStore, Task } from '@/stores/taskStore';
import { labels } from '@/i18n/labels';
import { getTodayId } from '@/lib/format';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/themes/ThemeContext';
import { cn } from '@/lib/utils';

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
  const { addTask } = useTaskStore();
  const { themeId } = useTheme();
  const [newTask, setNewTask] = useState({
    title: '',
    notes: '',
    dueDate: getTodayId(),
    priority: 'medium' as Task['priority'],
  });

  // Theme-specific styles
  const getThemeStyles = () => {
    switch (themeId) {
      case 'cyberpunk':
        return {
          content: 'bg-[#0f0518] border-2 border-[#bc13fe] text-white',
          contentShadow: '0 0 30px rgba(188,19,254,0.3)',
          title: 'font-[family-name:var(--font-orbitron)] text-[#00ffff] tracking-wider',
          label: 'text-[#ff00ff] text-xs tracking-wider font-bold uppercase',
          input: 'bg-[#1e0c35] border-[#bc13fe]/50 text-white placeholder:text-[#ff00ff]/30 focus:border-[#00ffff]',
          select: 'bg-[#1e0c35] border-[#bc13fe]/50 text-white',
          selectContent: 'bg-[#1e0c35] border-[#bc13fe]',
          button: 'bg-gradient-to-r from-[#ff00ff] to-[#bc13fe] text-white font-[family-name:var(--font-orbitron)] tracking-wider hover:opacity-90',
          buttonShadow: '0 0 15px rgba(255,0,255,0.4)',
        };
      case 'western':
        return {
          content: 'bg-[#FDF5E6] border-4 border-[#8B4513] text-[#3E2723]',
          contentShadow: '8px 8px 0 rgba(139,69,19,0.3)',
          title: 'font-[family-name:var(--font-rye)] text-[#8B4513] text-xl',
          label: 'text-[#8B4513] font-bold',
          input: 'bg-[#F0EAD6] border-2 border-[#D2B48C] text-[#3E2723] placeholder:text-[#8B4513]/50 focus:border-[#8B4513]',
          select: 'bg-[#F0EAD6] border-2 border-[#D2B48C] text-[#3E2723]',
          selectContent: 'bg-[#FDF5E6] border-2 border-[#D2B48C]',
          button: 'bg-[#8B4513] text-[#FDF5E6] font-[family-name:var(--font-rye)] border-2 border-[#5D4037] hover:bg-[#A0522D]',
          buttonShadow: '4px 4px 0 rgba(0,0,0,0.2)',
        };
      case 'synthwave':
        return {
          content: 'bg-[#1E1E1E] border-4 border-[#525252] text-[#E5E5E5]',
          contentShadow: '0 0 20px rgba(99,102,241,0.3)',
          title: 'font-[family-name:var(--font-press-start)] text-[#6366F1] text-sm',
          label: 'text-[#F2A900] text-xs font-bold uppercase font-[family-name:var(--font-press-start)]',
          input: 'bg-[#2b2b2b] border-2 border-[#525252] text-[#dcdcdc] placeholder:text-[#888] focus:border-[#6366F1]',
          select: 'bg-[#2b2b2b] border-2 border-[#525252] text-[#dcdcdc]',
          selectContent: 'bg-[#2b2b2b] border-2 border-[#525252]',
          button: 'bg-gradient-to-r from-[#6366F1] to-[#F2A900] text-white font-[family-name:var(--font-press-start)] text-xs hover:opacity-90',
          buttonShadow: '0 4px 10px rgba(99,102,241,0.4)',
        };
      default:
        return {
          content: '',
          contentShadow: '',
          title: '',
          label: '',
          input: '',
          select: '',
          selectContent: '',
          button: '',
          buttonShadow: '',
        };
    }
  };

  const themeStyles = getThemeStyles();

  const handleSubmit = () => {
    if (!newTask.title.trim()) return;

    addTask({
      title: newTask.title,
      notes: newTask.notes,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      status: 'pending',
      tags: [],
    });

    // Reset form
    setNewTask({
      title: '',
      notes: '',
      dueDate: getTodayId(),
      priority: 'medium',
    });
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn('max-w-[90vw] rounded-xl', themeStyles.content)}
        style={{ boxShadow: themeStyles.contentShadow }}
      >
        <DialogHeader>
          <DialogTitle className={themeStyles.title}>{labels.actions.newTask}</DialogTitle>
          <DialogDescription className="sr-only">
            Formulário para criar uma nova tarefa
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="task-title" className={themeStyles.label}>{labels.tasks.title}</Label>
            <Input
              id="task-title"
              placeholder="Digite o título da tarefa..."
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              onKeyDown={handleKeyDown}
              autoFocus
              className={cn('rounded-lg', themeStyles.input)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-notes" className={themeStyles.label}>{labels.tasks.notes} ({labels.misc.optional})</Label>
            <Input
              id="task-notes"
              placeholder="Notas adicionais..."
              value={newTask.notes}
              onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
              className={cn('rounded-lg', themeStyles.input)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="task-dueDate" className={themeStyles.label}>{labels.tasks.dueDate}</Label>
              <Input
                id="task-dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className={cn('rounded-lg', themeStyles.input)}
              />
            </div>

            <div className="space-y-2">
              <Label className={themeStyles.label}>{labels.tasks.priority}</Label>
              <Select
                value={newTask.priority}
                onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
              >
                <SelectTrigger className={cn('rounded-lg', themeStyles.select)}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={cn('rounded-lg', themeStyles.selectContent)}>
                  <SelectItem value="low">{labels.tasks.priorityLow}</SelectItem>
                  <SelectItem value="medium">{labels.tasks.priorityMedium}</SelectItem>
                  <SelectItem value="high">{labels.tasks.priorityHigh}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className={cn('w-full rounded-lg transition-all', themeStyles.button)}
            style={{ boxShadow: themeStyles.buttonShadow }}
          >
            {labels.actions.add} {labels.pages.tasks}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
