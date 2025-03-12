import { getRecipes } from "../api/api";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AddRecipeForm from "../components/AddRecipeForm";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Cookies.get("jwt_token") ? true : false);

    const fetchRecipes = async () => {
      try {
        setRecipes([]);
        const recipes = await getRecipes();
        if (recipes) setRecipes(recipes.recipes);
      } catch (err) {
        setError("Unable to get recipes");
      }
    };

    fetchRecipes();
  }, []);

  const toggleForm = () => {
    if (isLoggedIn) {
      setShowForm((prevShowForm) => !prevShowForm);
    }
  };

  const handleAddRecipe = (newRecipe) => {
    const newRecipeFormatted = {
      title: newRecipe.title,
      brewMethod: newRecipe.brewMethod,
      steps: newRecipe.steps,
      coffee: { name: newRecipe.coffee },
      user: { username: newRecipe.username },
      grinder: { name: newRecipe.grinder },
    };
    setRecipes((prevRecipes) => [...prevRecipes, newRecipeFormatted]);
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <>
      <NavBar setIsLoggedIn={setIsLoggedIn}/>
      <div className="text-center mb-8 mt-8">
        {isLoggedIn ? (
          <>
            <button
              onClick={toggleForm}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300"
            >
              {showForm ? "Cancel" : "Add New Recipe"}
            </button>
            {showForm && <AddRecipeForm onAddRecipe={handleAddRecipe} />}
          </>
        ) : (
          <p className="text-lg text-gray-800">
            Please{" "}
            <a href="/login" className="text-blue-600">
              log in
            </a>{" "}
            to add a recipe.
          </p>
        )}
      </div>

      <div className="container mx-auto mt-10 px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          All Recipes
        </h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
