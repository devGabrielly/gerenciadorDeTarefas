import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import taskService from "../services/taskService";
import { RootState } from "./store";

interface Task {
  _id: string;
  title: string;
  description?: string;
  deadline?: string;
  completed: boolean;
  priority?: string;
}

interface CreateTaskData {
  title: string;
  description?: string;
  deadline?: string;
  priority?: string;
}

interface UpdateTaskData {
  taskId: string;
  taskData: Partial<Task>;
}

interface TaskState {
  tasks: Task[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: TaskState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createTask = createAsyncThunk<
  Task,
  CreateTaskData,
  { state: RootState }
>("tasks/create", async (taskData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await taskService.createTask(taskData, token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getTasks = createAsyncThunk<Task[], void, { state: RootState }>(
  "tasks/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) {
        return thunkAPI.rejectWithValue(
          "Token não encontrado. Faça o login novamente."
        );
      }
      return await taskService.getTasks(token);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk<
  Task,
  UpdateTaskData,
  { state: RootState }
>("tasks/update", async ({ taskId, taskData }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await taskService.updateTask(taskId, taskData, token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTask = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("tasks/delete", async (taskId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await taskService.deleteTask(taskId, token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tasks = action.payload;
    });

    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tasks.unshift(action.payload);
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    });

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.isLoading = true;
      }
    );

    builder.addMatcher(
      (action): action is PayloadAction<string> =>
        action.type.endsWith("/rejected"),
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }
    );
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
