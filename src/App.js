import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ClientPage from "./page/Client/ClientPage";
import EmployeerPage from "./page/Employeer/EmployeerPage";
import EnterProductList from "./page/EnterProduct/EnterProductList";
import Home from "./page/Home";
import Login from "./page/Login/LoginPage";
import ProductPage from "./page/Product/ProductPage";
import SalesPage from "./page/Sale/SalesPage";
import UserPage from "./page/Users/UserPage";
import EnterProductDetailsPage from "./page/EnterProduct/EnterProductDetailsPage"
import EnterProductPage from "./page/EnterProduct/EnterProductPage";

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

// Componente para rotas protegidas
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rota pública para a tela de login */}
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas */}
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/usuarios" element={<ProtectedRoute element={<UserPage />} />} />
          <Route path="/clientes" element={<ProtectedRoute element={<ClientPage />} />} />
          <Route path="/funcionarios" element={<ProtectedRoute element={<EmployeerPage />} />} />
          <Route path="/produtos" element={<ProtectedRoute element={<ProductPage />} />} />
          <Route path="/vendas" element={<ProtectedRoute element={<SalesPage />} />} />
          <Route path="/entradaProdutos" element={<ProtectedRoute element={<EnterProductPage />} />} />
          <Route path="/listaEntradaProdutos" element={<ProtectedRoute element={<EnterProductList />} />} />
          <Route path="/detalhes-entrada" element={<ProtectedRoute  element={<EnterProductDetailsPage />}  />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
