import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import taskService from "../services/taskService";
import { RootState } from "./store";

interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

interface TaskState { // Armazena não apenas o status das tarefas, mas também o status da comunicação com a API.
    tasks: Task[];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState: TaskState = { // Estado inicial, quando o aplicativo for carregado pela primeira vez
    tasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const getTasks = createAsyncThunk<Task[], void, { state: RootState }>( // Obter terafas do usuário
    "tasks/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            if (!token) {
                return thunkAPI.rejectWithValue("Token não encontrado. Faça o login novamente.");
            }
            return await taskService.getTasks(token);
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createTask = createAsyncThunk<Task, { title: string} , { state: RootState }>( // Criar nova tarefa
    "tasks/create",
    async (taskData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.createTask(taskData, token);
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateTask = createAsyncThunk<Task, { taskId: string, taskData: any }, { state: RootState}>( // Atualizar tarefa
    "tasks/update",
    async ({ taskId, taskData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.updateTask(taskId, taskData, token);
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }   
    }
);

export const deleteTask = createAsyncThunk<string, string, { state: RootState }>( // Deletar tarefa
    "tasks/delete",
    async (taskId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.deleteTask(taskId, token);
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);   
        }
    }
);

export const taskSlice = createSlice({ // Criação do slice
    name: "task",
    initialState,
    reducers: { // Limpa o status ao fazer logout
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher( // Padrão para todos
            (action) => action.type.endsWith("/pending"),
            (state) => {
                state.isLoading = true;
            }
        );

        builder.addMatcher(
            (action): action is PayloadAction<string> => action.type.endsWith("/rejected"),
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }
        );

        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.tasks = action.payload; // Armazena a lista de tarefas
        });

        builder.addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.tasks.unshift(action.payload); // Adiciona a nova tarefa à lista
        });

        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.tasks = state.tasks.map(task =>
               task._id === action.payload._id ? action.payload : task
            );
        });

        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.tasks = state.tasks.filter(task =>
                task._id !== action.payload
            );
        });
    }
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;