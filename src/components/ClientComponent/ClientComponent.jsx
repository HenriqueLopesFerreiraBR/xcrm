import React, { useState } from "react";

function ClinetComponent() {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cpf: "",
        phone: "",
        address: "",
        status: "Ativo",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setCustomers([...customers, { ...formData, id: Date.now() }]);
        setFormData({
            name: "",
            email: "",
            cpf: "",
            phone: "",
            address: "",
            status: "Ativo",
        });
    };

    const handleDeleteCustomer = (id) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    const handleEditCustomer = (id) => {
        const customerToEdit = customers.find((customer) => customer.id === id);
        setFormData(customerToEdit);
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    return (
        <div className="ClinetComponent
    ">
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

            {/* Formulário de Cadastro */}
            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">Cadastrar Cliente</h4>
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
                                    name="cpf"
                                    className="form-control"
                                    value={formData.cpf}
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

            {/* Tabela de Clientes */}
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Clientes Cadastrados</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
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
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.cpf}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.address}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    customer.status === "Ativo"
                                                        ? "badge-success"
                                                        : "badge-danger"
                                                }`}
                                            >
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEditCustomer(customer.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteCustomer(customer.id)}
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {customers.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center">
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

export default ClinetComponent;
