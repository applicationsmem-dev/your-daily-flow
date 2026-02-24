import { Calendar, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Task, TaskStatus } from "@/types/task";
import { format, isPast, isToday } from "date-fns";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const priorityStyles = {
  high: "bg-priority-high/10 text-priority-high border-priority-high/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-success/10 text-success border-success/20",
};

const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  completed: "Completed",
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const due = new Date(task.dueDate);
  const overdue = isPast(due) && !isToday(due) && task.status !== "completed";
  const isCompleted = task.status === "completed";

  return (
    <div
      className={`glass-card rounded-xl p-5 transition-all hover:shadow-md group ${
        isCompleted ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-base leading-snug ${
              isCompleted ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(task)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <Badge variant="outline" className={priorityStyles[task.priority]}>
          {task.priority}
        </Badge>

        <div
          className={`flex items-center gap-1 text-xs ${
            overdue ? "text-destructive font-medium" : "text-muted-foreground"
          }`}
        >
          <Calendar className="h-3 w-3" />
          {overdue ? "Overdue · " : ""}
          {format(due, "MMM d, yyyy")}
        </div>

        <div className="ml-auto">
          <Select value={task.status} onValueChange={(v) => onStatusChange(task.id, v as TaskStatus)}>
            <SelectTrigger className="h-7 text-xs w-[120px] bg-secondary/50 border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(statusLabels) as [TaskStatus, string][]).map(([value, label]) => (
                <SelectItem key={value} value={value} className="text-xs">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
