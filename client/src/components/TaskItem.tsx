import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deleteTask, updateTask } from "../redux/taskSlice";
import "../styles/TaskWidget.scss";
import "../styles/MyTasks.scss";

interface Task {
  _id: string;
  title: string;
  description?: string;
  deadline?: string;
  completed: boolean;
  priority?: string;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(task.description || "");

  const onDelete = () => {
    dispatch(deleteTask(task._id));
  };

  const onToggle = () => {
    dispatch(
      updateTask({ taskId: task._id, taskData: { completed: !task.completed } })
    );
  };

  const handleSaveDescription = () => {
    dispatch(
      updateTask({
        taskId: task._id,
        taskData: { description: description },
      })
    );
    setIsEditingDescription(false);
  };

  const handleCancelEdit = () => {
    setDescription(task.description || "");
    setIsEditingDescription(false);
  };

  const formattedDeadline = task.deadline
    ? new Date(task.deadline).toLocaleDateString("pt-BR", { timeZone: "UTC" })
    : "";

  const getPriorityInfo = () => {
    const priority = task.priority || "normal";
    const priorityMap: Record<string, { text: string; class: string }> = {
      high: { text: "ALTA PRIORIDADE", class: "high" },
      normal: { text: "PRIORIDADE NORMAL", class: "normal" },
      low: { text: "BAIXA PRIORIDADE", class: "low" },
    };
    return priorityMap[priority] || priorityMap.normal;
  };

  const priorityInfo = getPriorityInfo();

  return (
    <div className="task-card">
      <div className="card-header">
        <span className={`priority ${priorityInfo.class}`}>
          {priorityInfo.text}
        </span>
      </div>

      <h4 className="card-title">{task.title}</h4>

      {task.deadline && <p className="card-date">{formattedDeadline}</p>}

      {task.description && !isEditingDescription && (
        <div className="card-description">
          <p>{task.description}</p>
        </div>
      )}

      {isEditingDescription && (
        <div className="card-description-edit">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Adicione uma descrição..."
            rows={3}
            autoFocus
          />
          <div className="edit-buttons">
            <button onClick={handleSaveDescription} className="btn-save">
              Salvar
            </button>
            <button onClick={handleCancelEdit} className="btn-cancel-edit">
              Cancelar
            </button>
          </div>
        </div>
      )}

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

      <div className="card-footer">
        <span
          className="add-subtask"
          onClick={() => setIsEditingDescription(true)}
        >
          {task.description ? "✏️ Editar Descrição" : "+ Adicionar Descrição"}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
