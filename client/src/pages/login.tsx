import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // Importe o Link
import { login, reset } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store";
import "../styles/LoginRegister.scss"; // <-- IMPORTAÇÃO DO NOVO ESTILO

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || user) {
      navigate("/"); // Redireciona para o Dashboard
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <h2>Carregando...</h2>; // Você pode substituir por um componente Spinner
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Painel do Formulário (Lado Direito) */}
        <div className="form-panel">
          <div className="form-heading">
            <h1>Entrar</h1>
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="E-mail"
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Senha"
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn-submit">
                Entrar
              </button>
            </div>
          </form>
        </div>

        {/* Painel Lateral Colorido (Lado Esquerdo) */}
        <div className="auth-panel">
          <h1>Olá, Seja Bem Vindo!</h1>
          <p>
            Ainda não tem uma conta? Cadastre-se e comece a organizar suas
            tarefas!
          </p>
          {/* O Link do React Router funciona como um <a> */}
          <Link to="/register">
            <button className="btn-panel">Cadastrar-se</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
