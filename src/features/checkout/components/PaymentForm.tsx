import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { Button } from "@/shared/ui";
import type { CartItem, Address } from "@/types";

interface OrderDetails {
  cartItems: CartItem[];
  pricing: {
    actualPrice: number;
    deliveryCharge: number;
    couponDiscount: number;
    grandTotal: number;
    couponCode: string | null;
  };
  address: Address;
}

interface PaymentFormProps {
  amount: number;
  orderDetails: OrderDetails;
  onPaymentSuccess: (paymentMethodId: string) => void;
  onBack: () => void;
  isProcessing: boolean;
}

type PaymentStep = "card-input" | "review" | "processing";

function getErrorMessage(errorCode: string | undefined, defaultMessage: string): string {
  const errorMessages: Record<string, string> = {
    card_declined: "Your card was declined. Please try a different card.",
    insufficient_funds: "Your card has insufficient funds. Please try a different card.",
    lost_card: "This card has been reported lost. Please use a different card.",
    stolen_card: "This card has been reported stolen. Please use a different card.",
    expired_card: "Your card has expired. Please use a different card.",
    incorrect_cvc: "The CVC code is incorrect. Please check and try again.",
    incorrect_number: "The card number is incorrect. Please check and try again.",
    invalid_expiry_month: "The expiration month is invalid.",
    invalid_expiry_year: "The expiration year is invalid.",
    processing_error: "An error occurred while processing your card. Please try again.",
  };

  return errorMessages[errorCode || ""] || defaultMessage;
}

function simulateServerDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1500));
}

export function PaymentForm({
  amount,
  orderDetails,
  onPaymentSuccess,
  onBack,
  isProcessing,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<PaymentStep>("card-input");
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [isValidatingCard, setIsValidatingCard] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setIsCardComplete(event.complete);
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleContinueToReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is not available. Please refresh the page.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found.");
      return;
    }

    // Keep CardElement mounted - just show loading on button
    setIsValidatingCard(true);
    setError(null);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    setIsValidatingCard(false);

    if (stripeError) {
      setError(getErrorMessage(stripeError.code, stripeError.message || "Card validation failed."));
      return;
    }

    if (paymentMethod) {
      setPaymentMethodId(paymentMethod.id);
      setPaymentStep("review");
    }
  };

  const handleConfirmPayment = async () => {
    if (!paymentMethodId) return;

    setPaymentStep("processing");
    setError(null);

    // Simulate server-side payment processing
    await simulateServerDelay();

    onPaymentSuccess(paymentMethodId);
  };

  const handleBackToCardInput = () => {
    setPaymentStep("card-input");
    setPaymentMethodId(null);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#374151",
        fontFamily: "system-ui, -apple-system, sans-serif",
        "::placeholder": {
          color: "#9CA3AF",
        },
      },
      invalid: {
        color: "#EF4444",
        iconColor: "#EF4444",
      },
    },
  };

  const isLoading = paymentStep === "processing" || isProcessing;

  // Processing state
  if (paymentStep === "processing") {
    return (
      <div className="rounded-lg border bg-white p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-secondary" />
          <p className="text-lg font-medium text-gray-700">Processing payment...</p>
          <p className="mt-1 text-sm text-gray-500">Please do not close this page</p>
        </div>
      </div>
    );
  }

  // Review & Confirm step - Single page layout
  if (paymentStep === "review") {
    const { cartItems, pricing, address } = orderDetails;

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Review & Confirm Payment</h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column - Order Details */}
          <div className="space-y-4">
            {/* Order Items */}
            <div className="rounded-lg border bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">Order Items ({cartItems.length})</h4>
              <div className="max-h-48 space-y-3 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-12 w-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-medium">Rs {Number(item.price) * item.qty}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="rounded-lg border bg-white p-4">
              <h4 className="mb-2 font-medium text-gray-800">Delivery Address</h4>
              <p className="font-medium text-gray-700">{address.name}</p>
              <p className="text-sm text-gray-600">
                {address.street}, {address.city}
              </p>
              <p className="text-sm text-gray-600">
                {address.state} - {address.zipCode}
              </p>
              <p className="mt-1 text-sm text-gray-500">Phone: {address.phone}</p>
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="space-y-4">
            {/* Price Breakdown */}
            <div className="rounded-lg border bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">Payment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs {pricing.actualPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span>Rs {pricing.deliveryCharge}</span>
                </div>
                {pricing.couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount ({pricing.couponCode})</span>
                    <span>-Rs {pricing.couponDiscount}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total Amount</span>
                  <span>Rs {pricing.grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-lg border bg-white p-4">
              <h4 className="mb-2 font-medium text-gray-800">Payment Method</h4>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-100">
                  <span className="text-xs font-bold text-gray-600">CARD</span>
                </div>
                <span className="text-sm text-gray-600">Credit/Debit Card</span>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleConfirmPayment}
                disabled={isLoading}
                size="full"
              >
                Confirm & Pay Rs {amount}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleBackToCardInput}
                disabled={isLoading}
                size="full"
              >
                Change Payment Method
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Card input step
  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-4 font-semibold">Payment Details</h3>

      <form onSubmit={handleContinueToReview} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Card Information
          </label>
          <div className="rounded border border-gray-300 px-3 py-3 transition-colors focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary">
            <CardElement options={cardElementOptions} onChange={handleCardChange} />
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="rounded-md bg-gray-50 p-3">
          <p className="text-xs font-medium text-gray-600 mb-1">Test Card:</p>
          <p className="text-xs text-gray-500">
            <span className="font-mono">4242 4242 4242 4242</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Use any future date, any CVC, any postal code
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isValidatingCard}
            className="sm:flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={!stripe || isValidatingCard || !isCardComplete}
            className="sm:flex-1"
          >
            {isValidatingCard ? "Validating..." : "Continue to Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function PaymentFormFallback({
  amount,
  orderDetails,
  onPaymentSuccess,
  onBack,
  isProcessing,
}: PaymentFormProps) {
  const [paymentStep, setPaymentStep] = useState<"input" | "review" | "processing">("input");

  const handleContinueToReview = () => {
    setPaymentStep("review");
  };

  const handleConfirmPayment = async () => {
    setPaymentStep("processing");
    await simulateServerDelay();
    onPaymentSuccess("mock_payment_method_" + Date.now());
  };

  const isLoading = paymentStep === "processing" || isProcessing;

  // Processing state
  if (paymentStep === "processing") {
    return (
      <div className="rounded-lg border bg-white p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-secondary" />
          <p className="text-lg font-medium text-gray-700">Processing payment...</p>
          <p className="mt-1 text-sm text-gray-500">Please do not close this page</p>
        </div>
      </div>
    );
  }

  // Review step - Single page layout
  if (paymentStep === "review") {
    const { cartItems, pricing, address } = orderDetails;

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Review & Confirm Payment</h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column - Order Details */}
          <div className="space-y-4">
            {/* Order Items */}
            <div className="rounded-lg border bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">Order Items ({cartItems.length})</h4>
              <div className="max-h-48 space-y-3 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-12 w-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-medium">Rs {Number(item.price) * item.qty}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="rounded-lg border bg-white p-4">
              <h4 className="mb-2 font-medium text-gray-800">Delivery Address</h4>
              <p className="font-medium text-gray-700">{address.name}</p>
              <p className="text-sm text-gray-600">
                {address.street}, {address.city}
              </p>
              <p className="text-sm text-gray-600">
                {address.state} - {address.zipCode}
              </p>
              <p className="mt-1 text-sm text-gray-500">Phone: {address.phone}</p>
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="space-y-4">
            {/* Price Breakdown */}
            <div className="rounded-lg border bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">Payment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs {pricing.actualPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span>Rs {pricing.deliveryCharge}</span>
                </div>
                {pricing.couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount ({pricing.couponCode})</span>
                    <span>-Rs {pricing.couponDiscount}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total Amount</span>
                  <span>Rs {pricing.grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-lg border bg-white p-4">
              <h4 className="mb-2 font-medium text-gray-800">Payment Method</h4>
              <p className="text-sm text-gray-600">Simulated Payment (Demo Mode)</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleConfirmPayment}
                disabled={isLoading}
                size="full"
              >
                Confirm & Pay Rs {amount}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setPaymentStep("input")}
                disabled={isLoading}
                size="full"
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Input step (fallback mode)
  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-4 font-semibold">Payment Details</h3>

      <div className="rounded-md bg-yellow-50 border border-yellow-200 p-4 mb-4">
        <p className="text-sm text-yellow-800">
          Stripe is not configured. Payment will be simulated.
        </p>
        <p className="text-xs text-yellow-600 mt-1">
          To enable real Stripe test mode, add <code className="bg-yellow-100 px-1">VITE_STRIPE_PUBLISHABLE_KEY</code> to your environment.
        </p>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="sm:flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleContinueToReview}
          disabled={isLoading}
          className="sm:flex-1"
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
}
