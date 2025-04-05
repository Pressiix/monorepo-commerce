import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";

export default function Header({ totalItems }: { totalItems: number }) {
  return (
    <header className="bg-orange-400 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-16 h-16 flex items-center justify-center ">
          <img src="/logo.webp" />
        </div>
        <h1 className="text-white text-2xl ml-4 font-bold">
          Ticket2Attraction
        </h1>
      </div>
      <div className="relative">
        <div className="w-10 h-10  flex items-center justify-center">
          <ShoppingCartOutlined className="text-white w-24 h-24" />
        </div>
        {totalItems > 0 && (
          <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </div>
        )}
      </div>
    </header>
  );
}
