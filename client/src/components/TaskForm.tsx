import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createTask, reset } from "../redux/taskSlice";
import "../styles/TaskWidget.scss";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [localError, setLocalError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { isError, message } = useSelector((state: RootState) => state.task);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      setLocalError("Por favor, adicione um título para a tarefa.");
      return;
    }

    dispatch(createTask({ title, description, deadline }));
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isError) dispatch(reset());
    if (localError) setLocalError("");
    setTitle(e.target.value);
  };
  const onDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isError) dispatch(reset());
    if (localError) setLocalError("");
    setDescription(e.target.value);
  };
  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isError) dispatch(reset());
    if (localError) setLocalError("");
    setDeadline(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="task-form">
      <div className="form-group">
        <input
          type="text"
          name="title"
          value={title}
          onChange={onTitleChange}
          placeholder="Título da nova tarefa..."
        />
      </div>

      <div className="form-group">
        <textarea
          name="description"
          value={description}
          onChange={onDescChange}
          placeholder="Adicione uma descrição..."
          rows={3}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <input
            type="date"
            name="deadline"
            value={deadline}
            onChange={onDateChange}
          />
        </div>
        <div className="form-group">
          <button className="btn-submit" type="submit">
            Adicionar Tarefa
          </button>
        </div>
      </div>
      {(isError || localError) && (
        <div
          className="form-error-message"
          style={{
            color: "red",
            fontSize: "0.9rem",
            textAlign: "left",
            marginBottom: "1rem",
            marginTop: "-0.5rem",
          }}
        >
          <p>{localError ? localError : message}</p>
        </div>
      )}
    </form>
  );
};

export default TaskForm;
