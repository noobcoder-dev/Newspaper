import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-y border-orange-500 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        <div className="bg-yellow-400 text-blue-900 font-bold text-2xl px-4 py-2">శుభోదయం</div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <FaBars />
        </button>
        <div className={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-full left-0 right-0 bg-white md:bg-transparent p-4 md:p-0`}>
          <Link to="/" className="block md:inline-block py-2 md:py-0">Home</Link>
          <Link to="/andhra-archive" className="block md:inline-block py-2 md:py-0">Andhra Pradesh</Link>
          <Link to="/telangana-archive" className="block md:inline-block py-2 md:py-0">Telangana</Link>
          <Link to="/admin-login" className="block md:inline-block py-2 md:py-0">Admin Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
