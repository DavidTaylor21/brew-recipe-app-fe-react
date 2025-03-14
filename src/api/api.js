import axios from "axios";

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      "https://brew-recipe-app-be.onrender.com/users/login",
      userData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Axios Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const registerUser = async (userCredentials) => {
  try {
    const response = await axios.post(
      "https://brew-recipe-app-be.onrender.com/users/register",
      userCredentials
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRecipes = async (filters) => {
  try {
    const response = await axios.get("https://brew-recipe-app-be.onrender.com/recipes", {
      params: filters, 
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};


export const addRecipe = async (recipe, token) => {
  try {
    const response = await axios.post("https://brew-recipe-app-be.onrender.com/recipes", recipe, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getGrinders = async () => {
  try {
    const response = await axios.get("https://brew-recipe-app-be.onrender.com/grinders");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
