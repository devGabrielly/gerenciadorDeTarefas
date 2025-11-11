import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { reset as authReset } from "../redux/authSlice";
import "../styles/Dashboard.scss";

import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(authReset());
    }
  }, [user, navigate, dispatch]);

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      {" "}
      <aside className="sidebar">
        <div className="sidebar-logo">OrganizaJá</div>
        <ul className="sidebar-nav">
          {" "}
          <li>
            {" "}
            <NavLink to="/" end>
              <span>DASHBOARD</span>{" "}
            </NavLink>{" "}
          </li>{" "}
          <li>
            {" "}
            <NavLink to="/tasks">
              <span>TAREFAS</span>{" "}
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/settings">
              <span>CONFIGURAÇÕES</span>{" "}
            </NavLink>{" "}
          </li>{" "}
        </ul>
        <ul className="sidebar-footer"></ul>{" "}
      </aside>{" "}
      <main className="main-content">
        <Header />{" "}
        <div className="main-widget">
          <h3>Minhas Tarefas</h3>
          <TaskForm />
          <TaskList />{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
};

export default Dashboard;
