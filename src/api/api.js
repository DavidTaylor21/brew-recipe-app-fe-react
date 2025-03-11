import axios from "axios";

export const loginUser = async (userCredentials) => {
    try {
        const response = await axios.post("http://localhost:5000/users/login", userCredentials)
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error.response.data)
        console.error(error)
        throw error
    }
}

export const registerUser = async (userCredentials) => {
    try {
        const response = await axios.post("http://localhost:5000/users/register", userCredentials)
        console.log(response.data)
        return response.data
    }
    catch(err){
        console.log(err.response.data)
        console.error(err)
        throw err
    }
}