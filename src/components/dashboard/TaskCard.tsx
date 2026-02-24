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

const priorityConfig = {
  high: { label: "High", className: "bg-priority-high-bg text-priority-high border-priority-high/20" },
  medium: { label: "Medium", className: "bg-priority-medium-bg text-priority-medium border-priority-medium/20" },
  low: { label: "Low", className: "bg-priority-low-bg text-priority-low border-priority-low/20" },
};

const statusConfig: Record<TaskStatus, { label: string; dot: string }> = {
  todo: { label: "To Do", dot: "bg-status-todo" },
  "in-progress": { label: "In Progress", dot: "bg-status-progress" },
  completed: { label: "Completed", dot: "bg-status-completed" },
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const due = new Date(task.dueDate);
  const overdue = isPast(due) && !isToday(due) && task.status !== "completed";
  const isCompleted = task.status === "completed";
  const status = statusConfig[task.status];

  return (
    <div
      className={`glass-card rounded-2xl p-5 group transition-all duration-300 hover:-translate-y-0.5 ${
        isCompleted ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${status.dot} shrink-0`} />
            <h3
              className={`font-semibold text-base leading-snug ${
                isCompleted ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </h3>
          </div>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1.5 ml-4 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => onEdit(task)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <Badge variant="outline" className={`rounded-full text-xs font-medium px-3 py-0.5 ${priorityConfig[task.priority].className}`}>
          {priorityConfig[task.priority].label}
        </Badge>

        <div
          className={`flex items-center gap-1.5 text-xs font-medium ${
            overdue ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          <Calendar className="h-3.5 w-3.5" />
          {overdue ? "Overdue · " : ""}
          {format(due, "MMM d, yyyy")}
        </div>

        <div className="ml-auto">
          <Select value={task.status} onValueChange={(v) => onStatusChange(task.id, v as TaskStatus)}>
            <SelectTrigger className="h-7 text-xs w-[130px] rounded-full bg-secondary/60 border-0 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(statusConfig) as [TaskStatus, { label: string; dot: string }][]).map(
                ([value, { label, dot }]) => (
                  <SelectItem key={value} value={value} className="text-xs">
                    <span className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                      {label}
                    </span>
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
