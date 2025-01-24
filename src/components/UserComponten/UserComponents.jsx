import React, { useState } from "react";

function UserComponent() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        contact: "",
        gender: "",
        location: "",
        status: "Ativo",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setUsers([...users, { ...formData, id: Date.now() }]);
        setFormData({
            name: "",
            username: "",
            contact: "",
            gender: "",
            location: "",
            status: "Ativo",
        });
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleEditUser = (id) => {
        const userToEdit = users.find((user) => user.id === id);
        setFormData(userToEdit);
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div className="UserComponent">
            <div className="page-titles">
                <ol className="breadcrumb">
                    <li>
                        <h5 className="bc-title">Gerenciar Cliente</h5>
                    </li>
                    <li className="breadcrumb-item active">
                        <a href="/">Gerenciar Cliente</a>
                    </li>
                </ol>
            </div>

            {/* Formulário de Cadastro */}
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
                                <label>Usuário</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Contato</label>
                                <input
                                    type="text"
                                    name="contact"
                                    className="form-control"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Gênero</label>
                                <select
                                    name="gender"
                                    className="form-control"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Selecione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Localização</label>
                                <input
                                    type="text"
                                    name="location"
                                    className="form-control"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Status</label>
                                <select
                                    name="status"
                                    className="form-control"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>

            {/* Tabela de Usuários */}
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Usuários Cadastrados</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Usuário</th>
                                    <th>Contato</th>
                                    <th>Gênero</th>
                                    <th>Localização</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.contact}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.location}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    user.status === "Ativo"
                                                        ? "badge-success"
                                                        : "badge-danger"
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    handleEditUser(user.id)
                                                }
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDeleteUser(user.id)
                                                }
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">
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
