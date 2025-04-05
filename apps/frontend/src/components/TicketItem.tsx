interface TicketItemProps {
  id: number;
  title: string;
  price: number;
  img: string;
  addToCart: (id: number, name: string, price: number, img: string) => void;
}

export default function TicketItem({
  id,
  title,
  price,
  img,
  addToCart,
}: TicketItemProps) {
  return (
    <div className="p-4 flex flex-col md:flex-row items-center justify-between border-b border-gray-200 last:border-0">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="bg-gray-200 w-20 h-20 flex items-center justify-center text-red-900 mr-4">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          {/* Add description if needed */}
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-xl font-bold mr-4">
          {price.toLocaleString()} THB
        </span>
        <button
          onClick={() => addToCart(id, title, price, img)}
          className="bg-orange-400 text-white px-6 py-2 hover:bg-orange-500 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}
