import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
  total?: number;
}

export default function PaginationControls({
  page,
  hasNext,
  hasPrev,
  onPageChange,
  total,
}: PaginationControlsProps) {
  return (
    <nav
      className="flex items-center justify-between border-t border-border pt-4"
      role="navigation"
      aria-label="Pagination"
    >
      <p className="text-sm text-muted-foreground">
        Page {page}
        {total != null && ` of ${Math.ceil(total / 10)}`}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!hasPrev}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}
