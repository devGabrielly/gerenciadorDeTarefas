import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/"; //URL base da API

const register = async (userData: any) => {
  // Função de registro do usuário
  const response = await axios.post(API_URL + "register", userData);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: any) => {
  // Função de login do usuário
  const response = await axios.post(API_URL + "login", userData);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user"); // Função de logout do usuário
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
