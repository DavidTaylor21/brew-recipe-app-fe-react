import React, { useState } from "react";
import Cookies from "js-cookie";
import { addRecipe } from "../api/api";
import { jwtDecode } from "jwt-decode";

const AddRecipeForm = ({ onAddRecipe}) => {
  const [form, setForm] = useState({
    title: "",
    brewMethod: "",
    steps: "",
    grinder: "",
    coffee: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt_token");
    const decodedToken = jwtDecode(token);

    addRecipe(form, token);
    onAddRecipe({...form, username :decodedToken.username})
    
    setForm({
        title: "",
        brewMethod: "",
        steps: "",
        grinder: "",
        coffee: "",
      })
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Add a New Recipe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg text-gray-700">Title</label>
          <input
            type="text"
            value={form.title}
            name="title"
            onChange={handleChange}
            placeholder="Enter recipe title"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-gray-700">Brew Method</label>
          <input
            type="text"
            value={form.brewMethod}
            name="brewMethod"
            onChange={handleChange}
            placeholder="Enter brew method"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-gray-700">Steps</label>
          <textarea
            value={form.steps}
            onChange={handleChange}
            name="steps"
            placeholder="Enter recipe steps"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-gray-700">Coffee Name</label>
          <input
            type="text"
            value={form.coffee}
            name="coffee"
            onChange={handleChange}
            placeholder="Enter coffee name"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-gray-700">Grinder Name</label>
          <input
            type="text"
            value={form.grinder}
            onChange={handleChange}
            name="grinder"
            placeholder="Enter grinder name"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 focus:outline-none"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
