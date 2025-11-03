// (O Cérebro da Autenticação)

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/authService"; // Serviço para chamadas de API

// Tenta pegar o usuário do localStorage (se ele já logou antes)
const user = JSON.parse(localStorage.getItem("user") || "null");

interface AuthState {
  user: any | null; // Informações do usuário logado
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AuthState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk( // Para registro
  "auth/register", // Nome da ação
  async (user: any, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk( // Para login
  "auth/login", 
  async (user: any, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk( // Para logout
  "auth/logout",
  async () => {
    await authService.logout();
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Ação de 'reset' para limpar os estados de erro/sucesso
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Lógica para quando o login estiver pendente, completo ou rejeitado
    // builder.addCase(login.pending, (state) => { ... })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
