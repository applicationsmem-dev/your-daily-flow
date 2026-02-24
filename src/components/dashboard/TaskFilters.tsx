import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TaskFilters as TFilters } from "@/types/task";

interface TaskFiltersProps {
  filters: TFilters;
  onChange: (filters: TFilters) => void;
}

export function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={filters.status}
        onValueChange={(v) => onChange({ ...filters, status: v as TFilters["status"] })}
      >
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.priority}
        onValueChange={(v) => onChange({ ...filters, priority: v as TFilters["priority"] })}
      >
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 bg-card"
        onClick={() =>
          onChange({ ...filters, sortByDueDate: filters.sortByDueDate === "asc" ? "desc" : "asc" })
        }
      >
        {filters.sortByDueDate === "asc" ? (
          <ArrowDownAZ className="h-4 w-4" />
        ) : (
          <ArrowUpAZ className="h-4 w-4" />
        )}
        Due Date
      </Button>
    </div>
  );
}
