import { ClipboardList } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-muted rounded-2xl p-5 mb-4">
        <ClipboardList className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-1">No tasks yet</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Create your first task to get started. Stay organized and track your progress.
      </p>
    </div>
  );
}
