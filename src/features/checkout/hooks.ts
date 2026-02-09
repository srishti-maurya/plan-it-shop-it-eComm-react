import { useState, useCallback } from "react";

export type CheckoutStep = "address" | "payment" | "confirmation";

interface UseCheckoutFlowReturn {
  currentStep: CheckoutStep;
  selectedAddressId: string;
  paymentMethodId: string;
  orderId: string;
  setSelectedAddressId: (id: string) => void;
  setPaymentMethodId: (id: string) => void;
  setOrderId: (id: string) => void;
  goToPayment: () => void;
  goToConfirmation: () => void;
  goBackToAddress: () => void;
  resetFlow: () => void;
}

export function useCheckoutFlow(): UseCheckoutFlowReturn {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("address");
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [orderId, setOrderId] = useState("");

  const goToPayment = useCallback(() => {
    setCurrentStep("payment");
  }, []);

  const goToConfirmation = useCallback(() => {
    setCurrentStep("confirmation");
  }, []);

  const goBackToAddress = useCallback(() => {
    setCurrentStep("address");
  }, []);

  const resetFlow = useCallback(() => {
    setCurrentStep("address");
    setSelectedAddressId("");
    setPaymentMethodId("");
    setOrderId("");
  }, []);

  return {
    currentStep,
    selectedAddressId,
    paymentMethodId,
    orderId,
    setSelectedAddressId,
    setPaymentMethodId,
    setOrderId,
    goToPayment,
    goToConfirmation,
    goBackToAddress,
    resetFlow,
  };
}
