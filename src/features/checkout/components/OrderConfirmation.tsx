import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui";
import type { Address } from "@/types";

interface OrderConfirmationProps {
  orderId: string;
  itemCount: number;
  total: number;
  address: Address | undefined;
}

export function OrderConfirmation({
  orderId,
  itemCount,
  total,
  address,
}: OrderConfirmationProps) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-md text-center">
      <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h2 className="mt-4 text-2xl font-bold">Order Placed Successfully!</h2>
      <p className="mt-2 text-gray-500">
        Your order ID is{" "}
        <span className="font-mono font-semibold text-gray-800">{orderId}</span>
      </p>
      <div className="mt-6 rounded-lg border bg-white p-4 text-left text-sm">
        <div className="flex justify-between py-1">
          <span className="text-gray-500">Items</span>
          <span className="font-medium">{itemCount}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-500">Total</span>
          <span className="font-medium">Rs {total}</span>
        </div>
        {address && (
          <div className="mt-2 border-t pt-2">
            <p className="text-gray-500">Delivering to:</p>
            <p className="font-medium">{address.name}</p>
            <p className="text-gray-600">
              {address.street}, {address.city}, {address.state} {address.zipCode}
            </p>
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          onClick={() => navigate("/orders")}
          variant="outline"
        >
          View Order History
        </Button>
        <Button onClick={() => navigate("/products")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
