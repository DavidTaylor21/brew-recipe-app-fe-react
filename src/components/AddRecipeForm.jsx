import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { addRecipe, getGrinders } from "../api/api";
import { jwtDecode } from "jwt-decode";
import Select from "react-select";

const AddRecipeForm = ({ onAddRecipe, toggleForm }) => {
  console.log("toggle form : ",toggleForm)
  const [grinders, setGrinders] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: "",
    brewMethod: "",
    steps: "",
    grinder: null,
    coffee: "",
  });

  useEffect(() => {
    const getGrindersList = async () => {
      try {
        setError(null);
        const grindersData = await getGrinders();
        const grindersArr = grindersData.grinders.map((grinder) => ({
          value: grinder.name,
          label: grinder.name,
        }));
        setGrinders(grindersArr);
      } catch (err) {
        setError(err);
      }
    };
    getGrindersList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt_token");
    const decodedToken = jwtDecode(token);
    const recipeData = {
      ...form,
      grinder: form.grinder.value,
      coffee: form.coffee,
      username: decodedToken.username,
    };

    addRecipe(recipeData, token);
    onAddRecipe({ ...recipeData, username: decodedToken.username });

    setForm({
      title: "",
      brewMethod: "",
      steps: "",
      grinder: null,
      coffee: "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setForm({ ...form, grinder: selectedOption });
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
          <Select
            options={grinders}
            value={form.grinder}
            onChange={handleSelectChange}
            placeholder="Select a grinder..."
            className="mt-2"
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
        <button
          type="button"
          onClick={toggleForm}
          className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-all duration-300"
        >
          Cancel
        </button>
    </div>
  );
};

export default AddRecipeForm;
