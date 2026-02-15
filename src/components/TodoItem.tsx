import { Check, Circle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { Todo } from "@/lib/api";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  index: number;
}


const priorityStyles: Record<string, string> = {
  HIGH: "border-l-destructive",
  MEDIUM: "border-l-accent",
  LOW: "border-l-primary",
};

export default function TodoItem({ todo, onToggle, onDelete, index }: TodoItemProps) {
  const isDone = todo.status === "DONE";
  const nextStatus = isDone ? "TODO" : "DONE";

  return (
    <li
      className={`group flex items-center gap-3 rounded-lg border border-border border-l-4 bg-card p-4 transition-all hover:shadow-sm animate-fade-in ${
        priorityStyles[todo.priority] || ""
      }`}
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: "backwards" }}
    >
      <button
        onClick={() => onToggle(todo.id, nextStatus)}
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
          isDone ? "todo-check-done" : "todo-check-pending"
        }`}
        aria-label={`Mark "${todo.name}" as ${isDone ? "todo" : "done"}`}
      >
        {isDone && <Check className="h-3 w-3" aria-hidden="true" />}
      </button>

      <Link
        to={`/todos/${todo.id}`}
        className={`flex-1 text-sm font-medium transition-colors hover:text-primary ${
          isDone ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        {todo.name}
      </Link>

      <span
        className={`hidden text-xs font-medium sm:inline-block rounded-full px-2.5 py-0.5 ${
          isDone
            ? "bg-success/10 text-success"
            : todo.status === "IN_PROGRESS"
            ? "bg-primary/10 text-primary"
            : "bg-accent/10 text-accent"
        }`}
      >
        {isDone ? "Done" : todo.status === "IN_PROGRESS" ? "In Progress" : "Todo"}
      </span>

      <span className={`hidden text-xs sm:inline-block ${
        todo.priority === "HIGH" ? "text-destructive" : "text-muted-foreground"
      }`}>
        {todo.priority}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-xs text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100 focus:opacity-100"
        aria-label={`Delete "${todo.name}"`}
      >
        Delete
      </button>
    </li>
  );
}
