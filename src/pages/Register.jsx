import { useState } from "react";
import { registerUser } from "../api/api";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const createdAt = new Date().toISOString();
      const response = await registerUser({
        username,
        email,
        password,
        createdAt,
      });
      if (response) {
        Cookies.set("jwt_token", response.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      }
      console.log("User registered successfully");
      navigate("/");
    } catch (err) {
      err.response.data.msg
        ? setError(err.response.data.msg)
        : setError("An error occurec, please try again");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-md max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Register
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="username"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <Link
          to="/login"
          className="text-gray-700 mt-4 block text-center mx-auto"
        >
          Already have an account? Click here to login
        </Link>
      </div>
    </div>
  );
};

export default Register;
