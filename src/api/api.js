import axios from "axios";

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/login",
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
      "http://localhost:3000/users/register",
      userCredentials
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRecipes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/recipes");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addRecipe = async (recipe, token) => {
  try {
    const response = await axios.post("http://localhost:3000/recipes", recipe, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err
  }
};

export const getGrinders = async ()=>{
  try {
    const response = await axios.get("http://localhost:3000/grinders")
    return response.data
  }
  catch(err){
    console.error(err)
    throw err
  }
}
