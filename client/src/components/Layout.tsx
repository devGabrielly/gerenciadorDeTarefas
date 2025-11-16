import React, { useEffect, Fragment } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logout, reset as authReset } from "../redux/authSlice";
import "../styles/Dashboard.scss";
import { Menu, Transition } from "@headlessui/react";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="search-bar" style={{ visibility: "hidden" }}></div>

      <div className="user-info">
        <Menu as="div">
          <Menu.Button className="user-avatar" title="Clique para abrir o menu">
            {user ? user.name.charAt(0).toUpperCase() : "?"}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="menu-dropdown">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`menu-item ${active ? "active" : ""}`}
                    onClick={onLogout}
                  >
                    Sair
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

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
      {/* BARRA LATERAL */}
      <aside className="sidebar">
        <div className="sidebar-logo">TaskMe</div>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/" end>
              <span>DASHBOARD</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks">
              <span>TAREFAS</span>
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
