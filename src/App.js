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
import StockPage from "./page/Stock/StockPage";
import PaymentsPage from "./page/Payments/PaymentsPage";
import AccountsReceivablePage from "./page/AccountsReceivable/AccountsReceivablePage";
import AccontingPage from "./page/Accounting/AccountingPage";
import TaxPage from "./page/Tax/TaxPage";
import SalesDataPage from "./page/Sale/SalesDataPage";
import SettingsPage from "./page/Settings/SettingsPage";
import SettingFormPage from "./page/Settings/SettingsFormPage";

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
          <Route path="/dadosVendas" element={<ProtectedRoute element={<SalesDataPage />} />} />
          <Route path="/entradaProdutos" element={<ProtectedRoute element={<EnterProductPage />} />} />
          <Route path="/listaEntradaProdutos" element={<ProtectedRoute element={<EnterProductList />} />} />
          <Route path="/detalhes-entrada" element={<ProtectedRoute  element={<EnterProductDetailsPage />}  />}/>
          <Route path="/estoque" element={<ProtectedRoute  element={<StockPage />}  />}/>
          <Route path="/pagar" element={<ProtectedRoute  element={<PaymentsPage />}  />}/>
          <Route path="/receber" element={<ProtectedRoute  element={<AccountsReceivablePage />}  />}/>
          <Route path="/contabil" element={<ProtectedRoute  element={<AccontingPage />}  />}/>
          <Route path="/fiscal" element={<ProtectedRoute  element={<TaxPage />}  />}/>
          <Route path="/configuracoes" element={<ProtectedRoute  element={<SettingsPage />}  />}/>
          <Route path="/formConfiguracoes" element={<ProtectedRoute  element={<SettingFormPage />}  />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
