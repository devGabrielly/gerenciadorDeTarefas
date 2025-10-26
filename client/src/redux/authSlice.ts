// (O Cérebro da Autenticação)

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// Precisaremos de um serviço para fazer as chamadas de API, criaremos depois

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

// (Aqui é onde vamos adicionar as funções createAsyncThunk para login e registro)
// (Por enquanto, vamos focar na estrutura)

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
