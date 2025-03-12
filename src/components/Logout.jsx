import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = ({setUser, setIsLoggedIn}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/"); 
    setUser(null)
    setIsLoggedIn(false)
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default Logout;
