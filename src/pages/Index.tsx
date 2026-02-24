import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/hooks/useTaskStore";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { TaskFilters } from "@/components/dashboard/TaskFilters";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { TaskFormDialog } from "@/components/dashboard/TaskFormDialog";
import { EmptyState } from "@/components/dashboard/EmptyState";
import type { Task } from "@/types/task";

const Index = () => {
  const { tasks, filters, setFilters, addTask, updateTask, deleteTask, changeStatus, summary } =
    useTaskStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSubmit = (data: Pick<Task, "title" | "description" | "priority" | "dueDate">) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    setEditingTask(null);
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Task Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Stay organized, stay productive.
            </p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Task</span>
          </Button>
        </div>

        {/* Summary */}
        <SummaryCards {...summary} />

        {/* Filters + Task List */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Tasks</h2>
            <TaskFilters filters={filters} onChange={setFilters} />
          </div>

          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={deleteTask}
                  onStatusChange={changeStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <TaskFormDialog
        open={dialogOpen}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
        editTask={editingTask}
      />
    </div>
  );
};

export default Index;
