import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "../components/Cart";
import HttpClientService from "@/services/httpClientService";
import CartService from "@/services/cartService";
import CartItem from "@/types/cart";

jest.mock("@/services/httpClientService");

describe("Cart Component", () => {
  const mockUpdateQuantity = jest.fn();
  const mockSetDiscount = jest.fn();
  const mockStore = configureStore([]);
  let store: any;
  let mockResponseFromDiscountAPI: jest.Mock;
  const DiscountPercentageForValidCode = 10; // 10% discount

  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock response from api @GET '/api/discounts/:code'
    mockResponseFromDiscountAPI = jest.fn((url) => {
      const validCodes = ["VALIDCODE", "ANOTHERVALIDCODE"];
      const code = url.split("/").pop();
      if (validCodes.includes(code)) {
        return Promise.resolve({
          data: { discountPercentage: DiscountPercentageForValidCode },
        });
      }
      return Promise.resolve({ data: null });
    });

    (HttpClientService as jest.Mock).mockImplementation(() => ({
      get: mockResponseFromDiscountAPI,
    }));

    store = mockStore({
      cart: {
        couponCode: "", // Initial couponCode in Redux state
      },
    });
  });

  const mockCartItems: CartItem[] = [
    {
      id: 1,
      name: "Item 1",
      price: 100,
      quantity: 2,
      img: "/tickets/dreamworld.jpeg",
    }, // Total: 200
    {
      id: 2,
      name: "Item 2",
      price: 200,
      quantity: 1,
      img: "/tickets/dreamworld.jpeg",
    }, // Total: 200
  ];

  const mockTotalPrice = CartService.calculateTotalPrice(mockCartItems); // Total price: 400
  const defaultDiscount = 0; // default discount value
  const mockNetPrice = CartService.calculateNetPrice(
    mockTotalPrice,
    defaultDiscount
  );

  const renderWithRedux = (component: React.ReactNode) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it("calculates total price correctly", () => {
    const discount = 50; // 50 THB discount
    const expectedNetPrice = CartService.calculateNetPrice(
      mockTotalPrice,
      discount
    );
    renderWithRedux(
      <Cart
        cartItems={mockCartItems}
        totalPrice={mockTotalPrice}
        discount={discount}
        netPrice={expectedNetPrice}
        onQuantityChanged={mockUpdateQuantity}
        onDiscountChanged={mockSetDiscount}
      />
    );

    const netPriceElement = screen.getByText(
      `${expectedNetPrice.toLocaleString()} THB`
    );
    expect(netPriceElement).toBeInTheDocument();
  });

  it("calculates discount correctly when a valid coupon code is entered", async () => {
    renderWithRedux(
      <Cart
        cartItems={mockCartItems}
        totalPrice={mockTotalPrice}
        discount={defaultDiscount}
        netPrice={mockNetPrice}
        onQuantityChanged={mockUpdateQuantity}
        onDiscountChanged={mockSetDiscount} // Mocked function passed as prop
      />
    );

    const couponCode = "VALIDCODE";
    const couponInput = screen.getByPlaceholderText("Enter your coupon code");
    fireEvent.change(couponInput, { target: { value: couponCode } });

    await waitFor(() => {
      const expectedDiscount =
        (mockTotalPrice * DiscountPercentageForValidCode) / 100; // 10% of 400 = 40
      expect(mockResponseFromDiscountAPI).toHaveBeenCalledWith(
        `api/discounts/${couponCode}`
      );
      expect(mockSetDiscount).toHaveBeenCalledWith(
        expectedDiscount,
        couponCode
      );
    });
  });

  it("sets discount to 0 when an invalid coupon code is entered", async () => {
    renderWithRedux(
      <Cart
        cartItems={mockCartItems}
        totalPrice={mockTotalPrice}
        discount={50} // Start with non-zero discount
        netPrice={mockTotalPrice - 50}
        onQuantityChanged={mockUpdateQuantity}
        onDiscountChanged={mockSetDiscount}
      />
    );

    const couponCode = "INVALIDCODE";
    const couponInput = screen.getByPlaceholderText("Enter your coupon code");
    await fireEvent.change(couponInput, { target: { value: couponCode } });

    await waitFor(() => {
      expect(mockResponseFromDiscountAPI).toHaveBeenCalledWith(
        `api/discounts/${couponCode}`
      );
      expect(mockSetDiscount).toHaveBeenCalledWith(0, "");
    });
  });

  it("initializes coupon code from Redux state", () => {
    store = mockStore({
      cart: {
        couponCode: "EXISTINGCODE", // Pre-existing coupon code in Redux state
      },
    });

    renderWithRedux(
      <Cart
        cartItems={mockCartItems}
        totalPrice={mockTotalPrice}
        discount={defaultDiscount}
        netPrice={mockNetPrice}
        onQuantityChanged={mockUpdateQuantity}
        onDiscountChanged={mockSetDiscount}
      />
    );

    const couponInput = screen.getByPlaceholderText("Enter your coupon code");
    expect(couponInput).toHaveValue("EXISTINGCODE");
  });

  it("matches the snapshot", () => {
    const discount = 50; // Example discount
    const expectedNetPrice = CartService.calculateNetPrice(
      mockTotalPrice,
      discount
    );

    const CartComponent = renderWithRedux(
      <Cart
        cartItems={mockCartItems}
        totalPrice={mockTotalPrice}
        discount={discount}
        netPrice={expectedNetPrice}
        onQuantityChanged={mockUpdateQuantity}
        onDiscountChanged={mockSetDiscount}
      />
    );

    expect(CartComponent.asFragment()).toMatchSnapshot();
  });
});
