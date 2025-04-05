import CartItem from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: CartItem[];
  discount: number;
  couponCode: string; // Added couponCode
}

const initialState: CartState = {
  items: [],
  discount: 0,
  couponCode: "", // Added couponCode
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; change: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.change;
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    setDiscount: (
      state,
      action: PayloadAction<{ discount: number; couponCode?: string }>
    ) => {
      state.discount = action.payload.discount;
      state.couponCode = action.payload.couponCode || ""; // Update couponCode
    },
  },
});

export const { addToCart, updateQuantity, setDiscount } = cartSlice.actions;
export default cartSlice.reducer;
