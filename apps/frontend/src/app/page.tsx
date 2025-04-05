"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores";
import { addToCart, updateQuantity, setDiscount } from "../stores/cartSlice";
import useTickets from "../hooks/useTickets";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import TicketItem from "../components/TicketItem";
import CartService from "@/services/cartService";
import TicketService from "@/services/TicketService";
import { TicketSortKey } from "../types/ticket";

export default function Home() {
  const { tickets: products, loading, error } = useTickets();
  const [searchKey, setSearchKey] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortKey, setSortKey] = useState<TicketSortKey>("title");
  const dispatch = useDispatch();
  const { items: cartItems, discount } = useSelector((state: RootState) => state.cart);

  const totalPrice = useMemo(
    () => CartService.calculateTotalPrice(cartItems),
    [cartItems]
  );

  const discountValue = useMemo(() => {
    const discountPercentage = discount / totalPrice || 0;
    return totalPrice * discountPercentage;
  }, [totalPrice, discount]);

  const netPrice = useMemo(
    () => CartService.calculateNetPrice(totalPrice, discountValue),
    [totalPrice, discountValue]
  );

  const totalItems = useMemo(
    () => CartService.calculateTotalItems(cartItems),
    [cartItems]
  );

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const sortedProducts = TicketService.sortByKey(products, sortKey);
    setFilteredProducts(sortedProducts);
  }, [products, sortKey]);

  const handleSearch = async () => {
    try {
      const response = await TicketService.fetchTickets(searchKey);
      const {data} = response;
      setFilteredProducts(data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      {/* Header */}
      <Header totalItems={totalItems} />

      {/* Search Section */}
      <div className="flex justify-center p-4 bg-gray-200">
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search tickets..."
          className="border border-gray-400 rounded-l px-4 py-2 w-1/2 bg-white text-black" // Added bg-white and text-black
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white px-4 py-2 rounded-r" // Added rounded-r for rounded right corner
        >
          Search
        </button>
        <div className="ml-4">
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select
            id="sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as TicketSortKey)}
            className="border border-gray-400 px-4 py-2 rounded bg-white text-black" // Added bg-white and text-black
          >
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-gray-300 p-4 md:p-8 lg:p-16">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tickets Section */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-gray-300">
                <div className="border-b border-gray-300 p-4 text-center text-xl font-medium">
                  Tickets
                </div>
                {filteredProducts.map((product) => (
                  <TicketItem
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    img={product.img}
                    addToCart={(id, name, price, img) =>
                      dispatch(addToCart({ id, name, price, img }))
                    }
                  />
                ))}
              </div>
            </div>

            {/* Cart Section */}
            <Cart
              cartItems={cartItems}
              totalPrice={totalPrice}
              discount={discountValue}
              netPrice={netPrice}
              onQuantityChanged={(id, change) =>
                dispatch(updateQuantity({ id, change }))
              }
              onDiscountChanged={(value, couponCode) =>
                dispatch(setDiscount({ discount: value, couponCode }))
              }
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
