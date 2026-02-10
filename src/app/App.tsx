import { ErrorBoundary } from "react-error-boundary";
import { AppRouter } from "./router";
import { ErrorFallback } from "@/shared/components";
import { ToastContainer } from "react-toastify";
import { useTheme } from "@/shared/hooks/useTheme";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const { resolvedTheme } = useTheme();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ToastContainer theme={resolvedTheme === "dark" ? "dark" : "light"} />
      <AppRouter />
    </ErrorBoundary>
  );
}
