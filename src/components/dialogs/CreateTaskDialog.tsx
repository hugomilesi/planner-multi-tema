import { useState } from 'react';
import { useTaskStore, Task } from '@/stores/taskStore';
import { labels } from '@/i18n/labels';
import { getTodayId } from '@/lib/format';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/toast';
import { useThemedDialog } from '@/hooks/useThemedDialog';
import { cn } from '@/lib/utils';

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
  const { addTask } = useTaskStore();
  const { addToast } = useToast();
  const dialogStyles = useThemedDialog();
  const [newTask, setNewTask] = useState({
    title: '',
    notes: '',
    dueDate: getTodayId(),
    priority: 'medium' as Task['priority'],
  });

  const handleSubmit = async () => {
    if (!newTask.title.trim()) return;

    await addTask({
      title: newTask.title,
      notes: newTask.notes,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      status: 'pending',
      tags: [],
    });

    addToast('success', 'Tarefa criada com sucesso!');

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
      <DialogContent className={cn("max-w-[90vw] sm:max-w-lg", dialogStyles.content)}>
        <DialogHeader className={dialogStyles.header}>
          <DialogTitle className={dialogStyles.title}>{labels.actions.newTask}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="task-title">{labels.tasks.title}</Label>
            <Input
              id="task-title"
              placeholder="Digite o título da tarefa..."
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-notes">{labels.tasks.notes} ({labels.misc.optional})</Label>
            <Input
              id="task-notes"
              placeholder="Notas adicionais..."
              value={newTask.notes}
              onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="task-dueDate">{labels.tasks.dueDate}</Label>
              <Input
                id="task-dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>{labels.tasks.priority}</Label>
              <Select
                value={newTask.priority}
                onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{labels.tasks.priorityLow}</SelectItem>
                  <SelectItem value="medium">{labels.tasks.priorityMedium}</SelectItem>
                  <SelectItem value="high">{labels.tasks.priorityHigh}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            {labels.actions.add} {labels.pages.tasks}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
