import { CheckCircle2, Circle, Clock, LayoutList } from "lucide-react";

interface SummaryCardsProps {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
}

const cards = [
  { key: "total", label: "Total Tasks", icon: LayoutList, gradient: "summary-gradient-total", color: "text-primary" },
  { key: "todo", label: "To Do", icon: Circle, gradient: "summary-gradient-todo", color: "text-status-todo" },
  { key: "inProgress", label: "In Progress", icon: Clock, gradient: "summary-gradient-progress", color: "text-status-progress" },
  { key: "completed", label: "Completed", icon: CheckCircle2, gradient: "summary-gradient-completed", color: "text-status-completed" },
] as const;

export function SummaryCards({ total, todo, inProgress, completed }: SummaryCardsProps) {
  const values = { total, todo, inProgress, completed };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon, gradient, color }) => (
        <div
          key={key}
          className={`glass-card ${gradient} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <div className={`${color} p-2.5 rounded-xl bg-card/60`}>
              <Icon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-4xl font-bold tracking-tight">{values[key]}</p>
        </div>
      ))}
    </div>
  );
}
