import { getRecipes } from "../api/api";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AddRecipeForm from "../components/AddRecipeForm";
import FilterBar from "../components/FilterBar";
import Loading from "../components/Loading";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipes = async (filters = {}) => {
    setIsLoading(true);
    try {
      setRecipes([]);
      const { recipes } = await getRecipes(filters);
      setRecipes(recipes);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError("Unable to get recipes");
    }
  };

  useEffect(() => {
    setIsLoggedIn(Cookies.get("jwt_token") ? true : false);
    fetchRecipes();
  }, []);

  const toggleForm = () => {
    console.log("toggle")
    setShowForm((prevShowForm) => (prevShowForm ? false : isLoggedIn));
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

  const handleFilter = (filters) => {
    fetchRecipes(filters);
  };

  return (
    <>
      <NavBar setIsLoggedIn={setIsLoggedIn} />
      <div className="text-center mb-8 mt-8">
        {isLoggedIn ? (
          <>{showForm && <AddRecipeForm onAddRecipe={handleAddRecipe} toggleForm={toggleForm}/>}</>
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
          <>
            <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto w-full">
              <FilterBar onFilter={handleFilter} />
              {!showForm && (
                <button
                  onClick={toggleForm}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300"
                >
                  Add New Recipe
                </button>
              )}
            </div>

            {showForm && (
              <AddRecipeForm
                onSubmit={handleAddRecipe}
                toggleForm={toggleForm}
              />
            )}

            {isLoading || recipes.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                {isLoading ? (
                  <Loading />
                ) : (
                  <p className="text-gray-600 text-lg">No recipes found.</p>
                )}
              </div>
            ) : (
              recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
