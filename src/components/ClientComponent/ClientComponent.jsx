import React, { useState, useEffect } from "react";
import axios from "axios";

function ClientComponent() {
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cnpj: "",
        phone: "",
        address: "",
        active: "Ativo",
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await axios.get("http://localhost:3099/api/clients/");
            setClients(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:3099/api/clients/${editingId}`, formData);
                setEditingId(null);
            } else {
                await axios.post("http://localhost:3099/api/clients/", formData);
            }
            fetchClients();
            setFormData({ name: "", email: "", cnpj: "", phone: "", address: "", status: "Ativo" });
            alert("Cliente salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar cliente", error);
            alert(error.response?.data?.message || "Erro desconhecido.");
        }
    };

    const handleDeleteClient = async (id) => {
        try {
            await axios.delete(`http://localhost:3099/api/clients/${id}`);
            fetchClients();
            alert("Cliente deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar cliente", error);
            alert("Erro ao deletar cliente.");
        }
    };

    const handleEditClient = (id) => {
        const clientToEdit = clients.find((client) => client.id === id);
        if (clientToEdit) {
            setFormData(clientToEdit);
            setEditingId(id);
        }
    };

    return (
        <div className="ClientComponent">
            <div className="page-titles">
                <ol className="breadcrumb">
                    <li>
                        <h5 className="bc-title">Gerenciar Clientes</h5>
                    </li>
                    <li className="breadcrumb-item active">
                        <a href="/">Gerenciar Clientes</a>
                    </li>
                </ol>
            </div>

            {/* Formulário de Cadastro/Edição */}
            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">{editingId ? "Editar Cliente" : "Cadastrar Cliente"}</h4>
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label>Nome do Cliente</label>
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
                                <label>CPF/CNPJ</label>
                                <input
                                    type="text"
                                    name="cnpj"
                                    className="form-control"
                                    value={formData.cnpj}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Telefone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Endereço</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Status</label>
                                <select
                                    name="active"
                                    className="form-control"
                                    value={formData.active}
                                    onChange={handleInputChange}
                                >
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {editingId ? "Salvar Alterações" : "Cadastrar"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Tabela de Clientes */}
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Clientes Cadastrados</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>CPF/CNPJ</th>
                                    <th>Telefone</th>
                                    <th>Endereço</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.id}>
                                        <td>{client.id}</td>
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.cnpj}</td>
                                        <td>{client.phone}</td>
                                        <td>{client.address}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    client.active === "Ativo"
                                                        ? "bg-success"
                                                        : "bg-danger"
                                                }`}
                                            >
                                                {client.active}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEditClient(client.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteClient(client.id)}
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {clients.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            Nenhum cliente cadastrado.
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

export default ClientComponent;
