// client/src/pages/Login.tsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, reset } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store";
import "../styles/LoginRegister.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  // --- ESTA É A LÓGICA CORRIGIDA ---
  useEffect(() => {
    // Não precisamos do alert() aqui

    // Se o login der certo, navegue
    if (isSuccess || user) {
      navigate("/");
    }

    // Agora, o reset() só acontece quando o componente "morre" (quando saímos da pág)
    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, navigate, dispatch]); // Removido 'isError' e 'message' das dependências
  // --- FIM DA CORREÇÃO ---

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // --- ADICIONADO ---
    // Se o usuário começar a digitar, limpe os erros antigos
    if (isError) {
      dispatch(reset());
    }
    // --- FIM DA ADIÇÃO ---
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
    return <h2>Carregando...</h2>;
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
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
            <div className="form-group password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                placeholder="Senha"
                onChange={onChange}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </span>
            </div>
            {isError && (
              <div className="form-error-message">
                <p>{message}</p>
              </div>
            )}
            <div className="form-group">
              <button type="submit" className="btn-submit">
                Entrar
              </button>
            </div>
          </form>
        </div>
        <div className="auth-panel">
          <h1>Olá, Amigo!</h1>
          <p>
            Ainda não tem uma conta? Cadastre-se e comece a organizar suas
            tarefas!
          </p>
          <Link to="/register">
            <button className="btn-panel">Cadastrar-se</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
