import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createTask, reset } from "../redux/taskSlice";
import "../styles/TaskModal.scss";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("normal");
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { isError, message } = useSelector((state: RootState) => state.task);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setLocalError("Por favor, adicione um título para a tarefa.");
      return;
    }

    // Envia com TODOS os campos, incluindo priority
    dispatch(
      createTask({
        title,
        description,
        deadline,
        priority,
      })
    );

    // Limpa o formulário e fecha o modal
    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("normal");
    setLocalError("");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("normal");
    setLocalError("");
    if (isError) dispatch(reset());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={handleClose}></div>

      {/* Modal */}
      <div className="modal-container">
        <div className="modal-header">
          <h2>ADICIONAR TAREFA</h2>
          <button className="modal-close" onClick={handleClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-field">
            <label htmlFor="title">Título da Tarefa</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (localError) setLocalError("");
                if (isError) dispatch(reset());
              }}
              placeholder="Digite o título..."
              autoFocus
            />
          </div>

          {/* Descrição */}
          <div className="form-field">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicione uma descrição..."
              rows={3}
            />
          </div>

          {/* Linha com Status e Data */}
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="status">Status da Tarefa</label>
              <select id="status" disabled>
                <option value="todo">A FAZER</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="deadline">Data da Tarefa</label>
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          {/* Nível de Prioridade */}
          <div className="form-field">
            <label htmlFor="priority">Nível de Prioridade</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">BAIXA</option>
              <option value="normal">NORMAL</option>
              <option value="high">ALTA</option>
            </select>
          </div>

          {/* Mensagem de Erro */}
          {(isError || localError) && (
            <div className="modal-error">
              <p>{localError ? localError : message}</p>
            </div>
          )}

          {/* Botões */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskModal;
