// client/src/pages/Register.tsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, reset } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store";
import "../styles/LoginRegister.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const [localError, setLocalError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isError) {
      dispatch(reset());
    }
    if (localError) {
      setLocalError("");
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      setLocalError("As senhas não correspondem. Tente novamente!");
    } else {
      setLocalError("");
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Painel Lateral Colorido (Lado Esquerdo) */}
        <div className="auth-panel">
          <h1>Bem-Vindo!</h1>
          <p>Já possui uma conta? Faça o login para ver suas tarefas.</p>
          <Link to="/login">
            <button className="btn-panel">Entrar</button>
          </Link>
        </div>

        {/* Painel do Formulário (Lado Direito) */}
        <div className="form-panel">
          <div className="form-heading">
            <h1>Criar Conta</h1>
          </div>

          <form onSubmit={onSubmit}>
            {/* Campo Nome */}
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Nome"
                onChange={onChange}
                required
              />
            </div>
            {/* Campo E-mail */}
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
            {/* Campo Senha */}
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
            {/* Campo Confirmação de Senha */}
            <div className="form-group password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirme sua Senha"
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

            {(isError || localError) && (
              <div className="form-error-message">
                <p>{localError ? localError : message}</p>
              </div>
            )}

            <div className="form-group">
              <button type="submit" className="btn-submit">
                Cadastrar-se
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
