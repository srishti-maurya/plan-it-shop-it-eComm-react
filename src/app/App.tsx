import { ErrorBoundary } from "react-error-boundary";
import { AppRouter } from "./router";
import { ErrorFallback } from "@/shared/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ToastContainer />
      <AppRouter />
    </ErrorBoundary>
  );
}
