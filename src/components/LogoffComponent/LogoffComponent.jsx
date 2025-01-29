import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoffComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    if (isAuthenticated !== "true") {
      alert("Você não está logado.");
      navigate("/login");
      return;
    }

    // Limpa todos os dados da sessão
    localStorage.removeItem("isAuthenticated");
    localStorage.clear();
    sessionStorage.clear();
    
    alert("Você foi deslogado com sucesso.");
    navigate("/login");
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h2>Saindo...</h2>
      <p>Você será redirecionado para a página de login.</p>
    </div>
  );
}

export default LogoffComponent;