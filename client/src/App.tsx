// client/src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importe as páginas que acabamos de criar
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            {/* Quando a URL for "/", exiba o Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Quando a URL for "/login", exiba a página de Login */}
            <Route path="/login" element={<Login />} />

            {/* Quando a URL for "/register", exiba a página de Cadastro */}
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
