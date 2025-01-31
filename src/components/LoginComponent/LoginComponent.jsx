import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3099/api/users/login/", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            alert("Login bem-sucedido!");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao tentar fazer login. Verifique suas credenciais e tente novamente.");
        } finally {
            setLoading(false);
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
                                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                        {loading ? "Entrando..." : "Entrar"}
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
