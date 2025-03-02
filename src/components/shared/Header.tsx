import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Balad
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-500 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-500 transition-colors">
            About
          </Link>
          <Link href="/services" className="hover:text-blue-500 transition-colors">
            Services
          </Link>
          <Link href="/contact" className="hover:text-blue-500 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;