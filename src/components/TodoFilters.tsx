import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FilterStatus = "all" | "completed" | "incomplete";

interface TodoFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: FilterStatus;
  onFilterChange: (value: FilterStatus) => void;
}


const filters: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Complete", value: "completed" },
  { label: "Incomplete", value: "incomplete" },
];

export default function TodoFilters({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-sm">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
          aria-label="Search todos by title"
        />
      </div>
      <div className="flex items-center gap-1 rounded-lg bg-muted p-1" role="tablist" aria-label="Filter by status">
        {filters.map((f) => (
          <Button
            key={f.value}
            role="tab"
            aria-selected={filter === f.value}
            variant={filter === f.value ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(f.value)}
            className="text-xs"
          >
            {f.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
