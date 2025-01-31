import React, { useState, useEffect } from "react";
import axios from "axios";

function UserComponent() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3099/api/users/");
            setUsers(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3099/api/users/register", formData);
            fetchUsers();
            setFormData({ name: "", email: "", password: "" });
            alert("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar usuário", error);
            alert("Erro ao cadastrar usuário");
        }
    };

    return (
        <div className="userComponent">
            <div className="page-titles">
                <ol className="breadcrumb">
                    <li>
                        <h5 className="bc-title">Gerenciar Usuários</h5>
                    </li>
                    <li className="breadcrumb-item active">
                        <a href="/">Gerenciar Usuários</a>
                    </li>
                </ol>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">Cadastrar Usuário</h4>
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Senha</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Usuários Cadastrados</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2">
                                                Editar
                                            </button>
                                            <button className="btn btn-danger btn-sm">
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            Nenhum usuário cadastrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserComponent;
