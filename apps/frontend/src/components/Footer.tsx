export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-orange-400 p-6 text-center text-white">
      Copyright © {year}
    </footer>
  );
}
