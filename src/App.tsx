import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";

// ✅ Lazy load pages (code splitting)
const Index = lazy(() => import("./pages/Index"));
const TodoDetailPage = lazy(() => import("./pages/TodoDetailPage"));
const ErrorTestPage = lazy(() => import("./pages/ErrorTestPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary children={undefined}>
          {/* ✅ Suspense clearly used here */}
          <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/todos/:id" element={<TodoDetailPage />} />
              <Route path="/error-test" element={<ErrorTestPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;