import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { getTasks, reset } from "../redux/taskSlice";
import "../styles/MyTasks.scss";

import TaskItem from "../components/TaskItem";
import TaskModal from "../components/TaskModal";

const MyTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const { inProgressTasks, pendingTasks, completedTasks } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inProgress: any[] = [];
    const pending: any[] = [];
    const completed: any[] = [];

    tasks.forEach((task) => {
      if (task.completed) {
        completed.push(task);
      } else if (task.deadline) {
        const deadlineDate = new Date(task.deadline);
        if (deadlineDate >= today) {
          inProgress.push(task);
        } else {
          pending.push(task);
        }
      } else {
        pending.push(task);
      }
    });

    return {
      inProgressTasks: inProgress,
      pendingTasks: pending,
      completedTasks: completed,
    };
  }, [tasks]);

  return (
    <div className="tasks-page-container">
      <div className="tasks-header">
        <h1>Minhas tarefas</h1>
        <button
          className="btn-create-task"
          onClick={() => setIsModalOpen(true)}
        >
          + Criar Tarefa
        </button>
      </div>

      <div className="board-view">
        <div className="task-column">
          <div className="column-title">
            <h3>Tarefas pendentes</h3>
            <span>{pendingTasks.length}</span>
          </div>
          {isLoading ? (
            <p>A carregar...</p>
          ) : (
            pendingTasks.map((task) => <TaskItem key={task._id} task={task} />)
          )}
        </div>

        <div className="task-column">
          <div className="column-title">
            <h3>Tarefas em andamento</h3>
            <span>{inProgressTasks.length}</span>
          </div>
          {isLoading ? (
            <p>A carregar...</p>
          ) : (
            inProgressTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          )}
        </div>

        <div className="task-column">
          <div className="column-title">
            <h3>Tarefas completadas</h3>
            <span>{completedTasks.length}</span>
          </div>
          {isLoading ? (
            <p>A carregar...</p>
          ) : (
            completedTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          )}
        </div>
      </div>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MyTasks;
