import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Certifique-se de incluir isso

function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook para redirecionar
  
    const handleLogin = (e) => {
      e.preventDefault();
      // Simulando autenticação com credenciais fixas
      if (email === "henrique@gmail.com" && password === "123456") {
        localStorage.setItem("isAuthenticated", "true");
        alert("Login bem-sucedido!");
        navigate("/"); // Redireciona para a página inicial
      } else {
        alert("Credenciais inválidas! Tente novamente.");
      }
    };
  
    return (
      <div className="login-component">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="text-center mb-4">Login</h4>
                  <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                      <label htmlFor="email">E-mail</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Senha</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Entrar
                    </button>
                  </form>
                  <div className="text-center mt-3">
                    <small>
                      Ainda não tem uma conta? <a href="/register">Registre-se</a>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default LoginComponent;
