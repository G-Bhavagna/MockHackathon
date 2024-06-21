import axios from "axios";


export const registerUser = async (data) => {
  try {
 return axios.post('http://localhost:8080/api/user/register', data);
   
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
}

export const loginUser = async (data) => {
  try {
    return axios.post('http://localhost:8080/api/user/login', data);
  } catch (error) {
    console.error('Error logging in user:', error);
    return null;
  }
}