import { CheckCircle2, Circle, Clock, LayoutList } from "lucide-react";

interface SummaryCardsProps {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
}

const cards = [
  { key: "total", label: "Total Tasks", icon: LayoutList, color: "text-foreground", bg: "bg-card" },
  { key: "todo", label: "To Do", icon: Circle, color: "text-info", bg: "bg-info/10" },
  { key: "inProgress", label: "In Progress", icon: Clock, color: "text-warning", bg: "bg-warning/10" },
  { key: "completed", label: "Completed", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
] as const;

export function SummaryCards({ total, todo, inProgress, completed }: SummaryCardsProps) {
  const values = { total, todo, inProgress, completed };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon, color, bg }) => (
        <div key={key} className="glass-card rounded-xl p-5 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <div className={`${bg} ${color} p-2 rounded-lg`}>
              <Icon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight">{values[key]}</p>
        </div>
      ))}
    </div>
  );
}
