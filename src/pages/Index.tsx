import { Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import TodoList from "@/components/TodoList";
import { Loader2 } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-primary" aria-label="Loading" />
              </div>
            }
          >
            <TodoList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default Index;
