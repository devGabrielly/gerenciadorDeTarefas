import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks/";

// Função auxiliar para criar o cabeçalho com o token
const getConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// ---  DEFINIÇÃO DAS FUNÇÕES DA API ---

const getTasks = async (token: string) => {
  // Para todas as tarefas do usuário
  const response = await axios.get(API_URL, getConfig(token));
  return response.data;
};

// Define o formato dos dados da nova tarefa
interface TaskData {
  title: string;
  description?: string;
  deadline?: string;
}

// Função de criar (APENAS A VERSÃO NOVA E CORRETA)
const createTask = async (taskData: TaskData, token: string) => {
  // Para criar uma nova tarefa (com todos os campos)
  const response = await axios.post(API_URL, taskData, getConfig(token));
  return response.data;
};

const updateTask = async (taskId: string, taskData: any, token: string) => {
  // Para atualizar uma tarefa
  const response = await axios.put(
    API_URL + taskId,
    taskData,
    getConfig(token)
  );
  return response.data;
};

const deleteTask = async (taskId: string, token: string) => {
  // Para deletar uma tarefa
  const response = await axios.delete(API_URL + taskId, getConfig(token));
  return taskId; // Retorna o ID da tarefa deletada
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
