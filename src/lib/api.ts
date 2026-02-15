export interface Todo {
  id: string;
  name: string;
  description: string | null;
  start: string | null;
  end: string | null;
  duration: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  archived: boolean;
  isDefault: boolean | null;
  parentId: string | null;
  children: string;
  owner: string | null;
  tags: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TodosResponse {
  data: Todo[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface TodoResponse {
  data: Todo;
}

const BASE_URL = "https://api.oluwasetemi.dev";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      (error as { message?: string }).message || `Request failed with status ${response.status}`
    );
  }
  return response.json();
}

export async function fetchTodos(page = 1, limit = 10): Promise<TodosResponse> {
  const res = await fetch(`${BASE_URL}/tasks?page=${page}&limit=${limit}`);
  return handleResponse<TodosResponse>(res);
}

export async function fetchTodo(id: string): Promise<TodoResponse> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`);
  return handleResponse<TodoResponse>(res);
}

export async function createTodo(data: { name: string; description?: string; priority?: string }): Promise<TodoResponse> {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<TodoResponse>(res);
}

export async function updateTodo(id: string, data: Partial<{ name: string; status: string; priority: string; description: string }>): Promise<TodoResponse> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<TodoResponse>(res);
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`Failed to delete todo`);
  }
}
