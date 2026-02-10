import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useElements } from "@stripe/react-stripe-js";
import { Button } from "@/shared/ui";
import { useAddressQuery } from "@/features/address/hooks";
import { useCreateOrder } from "@/features/orders/hooks";
import { useCheckoutFlow } from "./hooks";
import { OrderSummary } from "./components/OrderSummary";
import { AddressSelector } from "./components/AddressSelector";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { CheckoutStepper } from "./components/CheckoutStepper";
import { PaymentForm, PaymentFormFallback } from "./components/PaymentForm";
import type { CartItem, Address, OrderItem } from "@/types";

interface CheckoutState {
  cartItems: CartItem[];
  pricing: {
    actualPrice: number;
    deliveryCharge: number;
    couponDiscount: number;
    grandTotal: number;
    couponCode: string | null;
  };
}

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  const { data: addresses = [] } = useAddressQuery();
  const state = location.state as CheckoutState | null;
  const elements = useElements();

  const {
    currentStep,
    selectedAddressId,
    orderId,
    setSelectedAddressId,
    setOrderId,
    goToPayment,
    goToConfirmation,
    goBackToAddress,
  } = useCheckoutFlow();

  const [addressError, setAddressError] = useState("");

  if (!state) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-gray-500">No order data found.</p>
        <Button className="mt-4" onClick={() => navigate("/cart")}>
          Go to Cart
        </Button>
      </div>
    );
  }

  const { cartItems, pricing } = state;
  const selectedAddress = addresses.find((a: Address) => a._id === selectedAddressId);
  const isStripeAvailable = elements !== null;

  const handleContinueToPayment = () => {
    if (!selectedAddressId || !selectedAddress) {
      setAddressError("Please select a delivery address");
      return;
    }
    setAddressError("");
    goToPayment();
  };

  const handlePaymentSuccess = (pmId: string) => {
    const orderItems: OrderItem[] = cartItems.map((item) => ({
      _id: item._id,
      title: item.title,
      author: item.author,
      image: item.image,
      price: item.price,
      qty: item.qty,
    }));

    createOrder.mutate(
      {
        items: orderItems,
        totalAmount: pricing.grandTotal,
        deliveryAddress: selectedAddress!,
        couponCode: pricing.couponCode,
        couponDiscount: pricing.couponDiscount,
        deliveryCharge: pricing.deliveryCharge,
        paymentMethodId: pmId,
        paymentStatus: "completed",
      },
      {
        onSuccess: (order) => {
          setOrderId(order._id);
          goToConfirmation();
        },
      }
    );
  };

  if (currentStep === "confirmation" && orderId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <CheckoutStepper currentStep={currentStep} />
        <OrderConfirmation
          orderId={orderId}
          itemCount={cartItems.length}
          total={pricing.grandTotal}
          address={selectedAddress}
        />
      </div>
    );
  }

  // Payment step - full width single page layout
  if (currentStep === "payment" && selectedAddress) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
        <CheckoutStepper currentStep={currentStep} />

        {isStripeAvailable ? (
          <PaymentForm
            amount={pricing.grandTotal}
            orderDetails={{
              cartItems,
              pricing,
              address: selectedAddress,
            }}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={goBackToAddress}
            isProcessing={createOrder.isPending}
          />
        ) : (
          <PaymentFormFallback
            amount={pricing.grandTotal}
            orderDetails={{
              cartItems,
              pricing,
              address: selectedAddress,
            }}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={goBackToAddress}
            isProcessing={createOrder.isPending}
          />
        )}
      </div>
    );
  }

  // Address step - two column layout
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
      <CheckoutStepper currentStep={currentStep} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <AddressSelector
            selectedId={selectedAddressId}
            onSelect={(id) => {
              setSelectedAddressId(id);
              setAddressError("");
            }}
          />
          {addressError && (
            <p className="text-sm text-red-500">{addressError}</p>
          )}
        </div>

        <div className="space-y-6">
          <OrderSummary cartItems={cartItems} pricing={pricing} />
          <Button
            size="full"
            onClick={handleContinueToPayment}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
