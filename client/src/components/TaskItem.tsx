import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deleteTask, updateTask } from "../redux/taskSlice";
import "../styles/TaskWidget.scss";

interface Task {
  _id: string;
  title: string;
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

  //  Lógica para alternar o estado da tarefa
  const onToggle = () => {
    // Envia o estado oposto do atual
    dispatch(
      updateTask({ taskId: task._id, taskData: { completed: !task.completed } })
    );
  };

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

export default TaskItem;
