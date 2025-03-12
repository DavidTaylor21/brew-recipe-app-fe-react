import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Logout from "./Logout";

const Navbar = ({setIsLoggedIn}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("jwt_token");

    if (!token) {
      return setUser(null);
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    decodedToken.exp < currentTime
      ? (Cookies.remove("jwt_token"), setUser(null))
      : setUser(decodedToken);
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
            <>
            <Logout setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>
            <h1 className="text-white px-2 py-1">
              {user.username.charAt(0).toUpperCase() +
                user.username.slice(1)}
            </h1>
            </>
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 rounded-md text-white py-2">
          {user ? (
            <>
            <h1 className="text-white px-2 py-1">
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </h1>
            <Logout setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>
            </>
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
