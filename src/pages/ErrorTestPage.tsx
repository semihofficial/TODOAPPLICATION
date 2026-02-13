import { Button } from "@/components/ui/button";
import { Bomb } from "lucide-react";
import { useState } from "react";

export default function ErrorTestPage() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("This is a test error triggered intentionally to demonstrate the Error Boundary.");
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <Bomb className="h-8 w-8 text-destructive" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Error Boundary Test</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Click the button below to trigger an intentional error and see the Error Boundary in action.
        </p>
        <Button variant="destructive" onClick={() => setShouldError(true)} className="gap-2">
          <Bomb className="h-4 w-4" aria-hidden="true" />
          Trigger Error
        </Button>
      </div>
    </main>
  );
}
