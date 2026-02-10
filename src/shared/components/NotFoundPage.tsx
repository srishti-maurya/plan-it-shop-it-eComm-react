import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold text-gray-600 dark:text-slate-400">Oops!</h2>
      <h1 className="text-3xl font-bold text-primary dark:text-primary-300">
        Looks like you lost your way.
      </h1>
      <Link to="/">
        <Button size="sm">Go Back Home</Button>
      </Link>
    </div>
  );
}
