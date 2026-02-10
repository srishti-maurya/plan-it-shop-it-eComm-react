import { FaCheck } from "react-icons/fa";
import type { CheckoutStep } from "../hooks";

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
}

const steps = [
  { key: "address" as const, label: "Address" },
  { key: "payment" as const, label: "Payment" },
  { key: "confirmation" as const, label: "Confirm" },
];

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                    isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : isCurrent
                      ? "border-secondary bg-secondary text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {isCompleted ? <FaCheck className="h-4 w-4" /> : index + 1}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isCompleted
                      ? "text-green-600"
                      : isCurrent
                      ? "text-secondary"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 w-12 sm:w-20 ${
                    index < currentIndex ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
