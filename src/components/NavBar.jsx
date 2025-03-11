import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          Cookies.remove("token");
          setUser(null);
        } else {
          const { id, username, email } = decodedToken.user;
          setUser({ id, username, email });
        }
      } catch (err) {
        console.error("Failed to decode token:", err);
        setUser(null);
      }
    } else {
      console.log("No token found");
      setUser(null);
    }
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-semibold">
          Brew Recipes
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {user ? (
            <h1 className="text-white px-2 py-1">
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </h1>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-gray-400 border px-4 py-2 rounded-md border-gray-400"
            >
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 rounded-md text-white py-2">
          {user ? (
            <h1 className="text-white px-2 py-1">
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </h1>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-gray-700 border-t border-gray-700"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
