import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

// Páginas
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import MyTasks from "./pages/MyTasks";

function App() {
  return (
    <>
           {" "}
      <Router>
               {" "}
        <div>
                   {" "}
          <Routes>
                       {" "}
            {/* Rotas Públicas (Login/Registo não têm a barra lateral) */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />       
               {" "}
            {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
                       {" "}
            {/* Rotas Protegidas (Todas usam o Layout como "pai") */}           {" "}
            <Route path="/" element={<Layout />}>
              {/* A rota "index" (/) renderiza o Dashboard DENTRO do Layout */}
                V            <Route index element={<Dashboard />} />
              {/* A rota "/tasks" renderiza o MyTasks DENTRO do Layout */}
                            <Route path="/tasks" element={<MyTasks />} />
              {/* A rota "/settings" renderiza o Settings DENTRO do Layout */} 
                         {" "}
              {/* <Route path='/settings' element={<Settings />} /> */}         
               {" "}
            </Route>
                     {" "}
          </Routes>
                 {" "}
        </div>
             {" "}
      </Router>
         {" "}
    </>
  );
}

export default App;
