import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, updateTodo } from "@/lib/api";
import { ListChecks } from "lucide-react";
import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";
import PaginationControls from "./PaginationControls";
import CreateTodoDialog from "./CreateTodoDialog";
import DeleteTodoDialog from "./DeleteTodoDialog";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type FilterStatus = "all" | "completed" | "incomplete";


function TodoListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-lg" />
      ))}
    </div>
  );
}

export default function TodoList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page, 10),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateTodo(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const todos = data?.data ?? [];

  const filtered = useMemo(() => {
    let result = todos;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(q));
    }
    if (filter === "completed") result = result.filter((t) => t.status === "DONE");
    if (filter === "incomplete") result = result.filter((t) => t.status !== "DONE");
    return result;
  }, [todos, search, filter]);

  const hasNext = data?.meta?.hasNextPage ?? false;
  const hasPrev = data?.meta?.hasPreviousPage ?? false;

  if (isError) {
    return (
      <div role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-destructive font-medium">Failed to load todos</p>
        <p className="text-sm text-muted-foreground mt-1">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-primary" aria-hidden="true" />
            My Todos
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {data?.meta?.total != null
              ? `${data.meta.total} total tasks`
              : "Manage your tasks"}
          </p>
        </div>
        <CreateTodoDialog />
      </div>

      <TodoFilters
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />

      {isLoading ? (
        <TodoListSkeleton />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <ListChecks className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
          </div>
          <p className="text-muted-foreground font-medium">No todos found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {search || filter !== "all" ? "Try adjusting your filters" : "Create your first todo above"}
          </p>
        </div>
      ) : (
        <ul className="space-y-2" aria-label="Todo list">
          {filtered.map((todo, i) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={i}
              onToggle={(id, status) => toggleMutation.mutate({ id, status })}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </ul>
      )}

      {!isLoading && (hasNext || hasPrev) && (
        <PaginationControls
          page={page}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onPageChange={setPage}
          total={data?.meta?.total}
        />
      )}

      <DeleteTodoDialog
        todoId={deleteId}
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
      />
    </div>
  );
}
