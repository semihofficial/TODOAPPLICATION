import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTodo } from "@/lib/api";
import { ArrowLeft, Calendar, Check, Clock, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";


export default function TodoDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id!),
    enabled: !!id,
  });

  const todo = data?.data;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to list
          </Button>
        </Link>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        )}

        {isError && (
          <div role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
            <p className="font-medium text-destructive">Failed to load todo</p>
            <p className="text-sm text-muted-foreground mt-1">{(error as Error).message}</p>
          </div>
        )}

        {todo && (
          <article className="animate-fade-in rounded-xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                  todo.status === "DONE" ? "todo-check-done" : "todo-check-pending"
                }`}
                aria-label={todo.status === "DONE" ? "Completed" : "Pending"}
              >
                {todo.status === "DONE" && <Check className="h-4 w-4" aria-hidden="true" />}
              </div>
              <div className="flex-1 space-y-4">
                <h1
                  className={`text-xl font-semibold sm:text-2xl ${
                    todo.status === "DONE" ? "text-muted-foreground line-through" : "text-foreground"
                  }`}
                >
                  {todo.name}
                </h1>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      todo.status === "DONE"
                        ? "bg-success/10 text-success"
                        : todo.status === "IN_PROGRESS"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {todo.status === "DONE" ? "Completed" : todo.status === "IN_PROGRESS" ? "In Progress" : "Todo"}
                  </span>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      todo.priority === "HIGH"
                        ? "bg-destructive/10 text-destructive"
                        : todo.priority === "MEDIUM"
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {todo.priority} priority
                  </span>
                </div>

                {todo.description && (
                  <p className="text-muted-foreground leading-relaxed">{todo.description}</p>
                )}

                <dl className="grid gap-3 border-t border-border pt-4 text-sm sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <dt className="sr-only">Created</dt>
                    <dd>Created {new Date(todo.createdAt).toLocaleDateString()}</dd>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <dt className="sr-only">Updated</dt>
                    <dd>Updated {new Date(todo.updatedAt).toLocaleDateString()}</dd>
                  </div>
                  {todo.owner && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" aria-hidden="true" />
                      <dt className="sr-only">Owner</dt>
                      <dd>{todo.owner}</dd>
                    </div>
                  )}
                  <div className="text-muted-foreground font-mono text-xs sm:col-span-2">
                    <dt className="sr-only">ID</dt>
                    <dd>ID: {todo.id}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
