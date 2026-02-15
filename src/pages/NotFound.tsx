import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <MapPin className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <p className="text-muted-foreground">The page you are looking for does not exist.</p>
        <Link to="/">
          <Button className="mt-2">Go Home</Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
