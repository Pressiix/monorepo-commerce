import CartItem from "@/types/cart";

export default class CartService {
  static calculateTotalPrice(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  static calculateNetPrice(totalPrice: number, discount: number): number {
    return Math.max(0, totalPrice - discount);
  }

  static calculateTotalItems(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
