import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getTasks, deleteTask, updateTask, reset } from "../redux/taskSlice";
import "../styles/TaskWidget.scss";

interface Task {
  _id: string;
  title: string;
  description?: string;
  deadline?: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = () => {
    dispatch(deleteTask(task._id));
  };
  const onToggle = () => {
    dispatch(
      updateTask({ taskId: task._id, taskData: { completed: !task.completed } })
    );
  };

  // Formata a data
  const formattedDeadline = task.deadline
    ? new Date(task.deadline).toLocaleDateString("pt-BR", { timeZone: "UTC" })
    : "";

  return (
    <div className="task-item">
      <div>
        <h4
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#888" : "#333",
          }}
        >
          {task.title}
        </h4>
        <div className="task-details">
          {task.description && <p>{task.description}</p>}
          {task.deadline && <span>Prazo: {formattedDeadline}</span>}
        </div>
      </div>

      <div className="task-item-buttons">
        <button
          onClick={onToggle}
          className={task.completed ? "btn-uncomplete" : "btn-complete"}
        >
          {task.completed ? "Refazer" : "Concluir"}
        </button>
        <button onClick={onDelete} className="btn-delete">
          Deletar
        </button>
      </div>
    </div>
  );
};

// --- Componente da LISTA de Tarefas ---
const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, isLoading, isError, message } = useSelector(
    (state: RootState) => state.task
  );

  useEffect(() => {
    if (isError) alert(message);
    dispatch(getTasks());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  // Filtra as tarefas em duas listas
  const pendingTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  if (isLoading) {
    return <h2>Carregando tarefas...</h2>;
  }

  return (
    <div className="task-list">
      <h3 className="task-list-heading">Tarefas Pendentes</h3>
      {pendingTasks.length > 0 ? (
        <div>
          {pendingTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="task-list-empty">
            <p>Você não tem tarefas pendentes.</p>
          </div>
        )
      )}

      <h3 className="task-list-heading">Tarefas Concluídas</h3>
      {completedTasks.length > 0 ? (
        <div>
          {completedTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="task-list-empty">
            <p>Nenhuma tarefa concluída ainda.</p>
          </div>
        )
      )}
    </div>
  );
};

export default TaskList;
