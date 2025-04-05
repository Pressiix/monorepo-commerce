import React, { useState, useRef, useEffect } from "react";
import HttpClientService from "@/services/httpClientService";
import { useSelector } from "react-redux";
import CartItem from "@/types/cart";

interface DiscountItem {
  id: number;
  code: string;
  description: string;
  discountPercentage: number;
}

interface CartProps {
  cartItems: CartItem[];
  totalPrice: number;
  discount: number;
  netPrice: number;  // Changed from grandTotal
  onQuantityChanged: (id: number, change: number) => void;
  onDiscountChanged: (value: number, couponCode: string) => void;
}

export default function Cart({
  cartItems,
  totalPrice,
  discount,
  netPrice,
  onQuantityChanged,
  onDiscountChanged,
}: CartProps) {
  const { couponCode: code} = useSelector((state: any) => state.cart);
  const [couponCode, setCouponCode] = useState<string>(code || ""); // Initialize with existing couponCode

  const fetchDiscount = async (value: string) => {
    if (!value) {
      onDiscountChanged(0, ""); // Clear couponCode
      return;
    }

    try {
      const httpClient = new HttpClientService(
        process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080"
      );

      const response = await httpClient.get<DiscountItem>(`api/discounts/${value}`);

      if (!response?.data?.discountPercentage) {
        onDiscountChanged(0, ""); // Clear couponCode
        return;
      }

      const discountPercentage = response.data.discountPercentage;
      const discountAmount = (totalPrice * discountPercentage) / 100; // Recalculate based on totalPrice
      onDiscountChanged(discountAmount, value); // Pass couponCode
    } catch (error) {
      onDiscountChanged(0, ""); // Clear couponCode
    }
  };

  const onCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCouponCode(value);
  };

  useEffect(() => {
    fetchDiscount(couponCode);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[totalPrice, couponCode])

  return (
    <div className="lg:col-span-4">
      <div className="bg-white border border-gray-300 mb-4">
        <div className="border-b border-gray-300 p-4 text-center text-xl font-medium">
          Cart
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center justify-between border-b border-gray-200 last:border-0"
            >
              <div className="flex items-center">
                <div className="bg-gray-200 w-16 h-16 flex items-center justify-center text-red-900 mr-3">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm">{item.price.toLocaleString()} THB</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => onQuantityChanged(item.id, -1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => onQuantityChanged(item.id, 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            Your cart is empty
          </div>
        )}
      </div>

      {/* Pricing Summary */}
      {cartItems.length > 0 && (
        <div className="bg-white border border-gray-300">
          <div className="border-b border-gray-300 p-4 flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-medium">
              {totalPrice.toLocaleString()} THB
            </span>
          </div>
          <div className="border-b border-gray-300 p-4 flex justify-between items-center">
            <span className="font-medium">Discount</span>
            <div className="flex items-center">
              <input
                type="string"
                placeholder="Enter your coupon code"
                className="border border-gray-300 w-28 px-2 py-1 text-right mr-2"
                value={couponCode}
                onChange={onCouponCodeChange}
              />
              <span className="text-red-500">
                {discount.toLocaleString()} THB
              </span>
            </div>
          </div>
          <div className="p-4 flex justify-between">
            <span className="font-bold">Grand Total</span>
            <span className="font-bold">{netPrice.toLocaleString()} THB</span>
          </div>
        </div>
      )}
    </div>
  );
}
