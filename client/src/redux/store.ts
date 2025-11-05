import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; //  Importe o reducer
import taskReducer from "./taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, //  Adicione o reducer aqui
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;