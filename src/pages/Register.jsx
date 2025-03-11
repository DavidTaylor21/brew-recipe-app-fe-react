import { useState } from "react";
import { registerUser } from "../api/api";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const createdAt = new Date().toISOString();
      const response = await registerUser({
        ...form,
        createdAt,
      });
      if (response) {
        Cookies.set("jwt_token", response.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      }
      navigate("/");
    } catch (err) {
      err.response
        ? setError(err.response.data.msg)
        : setError("An error occured, please try again");
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
            <input
              type="username"
              name="username"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              value={form.username}
              placeholder="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              value={form.email}
              placeholder="email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              value={form.password}
              placeholder="password"
              onChange={handleChange}
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
