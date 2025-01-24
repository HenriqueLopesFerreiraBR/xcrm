import React, { useState } from "react";

function EmployeerComponent() {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        contact: "",
        department: "",
        location: "",
        status: "Ativo",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setEmployees([...employees, { ...formData, id: Date.now() }]);
        setFormData({
            name: "",
            position: "",
            contact: "",
            department: "",
            location: "",
            status: "Ativo",
        });
    };

    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
    };

    const handleEditEmployee = (id) => {
        const employeeToEdit = employees.find((employee) => employee.id === id);
        setFormData(employeeToEdit);
        setEmployees(employees.filter((employee) => employee.id !== id));
    };

    return (
        <div className="employeerComponent">
            <div className="page-titles">
                <ol className="breadcrumb">
                    <li>
                        <h5 className="bc-title">Gerenciar Funcionário</h5>
                    </li>
                    <li className="breadcrumb-item active">
                        <a href="/">Gerenciar Funcionário</a>
                    </li>
                </ol>
            </div>

            {/* Formulário de Cadastro */}
            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">Cadastrar Funcionário</h4>
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
                                <label>Cargo</label>
                                <input
                                    type="text"
                                    name="position"
                                    className="form-control"
                                    value={formData.position}
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
                                <label>Departamento</label>
                                <input
                                    type="text"
                                    name="department"
                                    className="form-control"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    required
                                />
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

            {/* Tabela de Funcionários */}
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Funcionários Cadastrados</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Cargo</th>
                                    <th>Contato</th>
                                    <th>Departamento</th>
                                    <th>Localização</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.position}</td>
                                        <td>{employee.contact}</td>
                                        <td>{employee.department}</td>
                                        <td>{employee.location}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    employee.status === "Ativo"
                                                        ? "badge-success"
                                                        : "badge-danger"
                                                }`}
                                            >
                                                {employee.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    handleEditEmployee(
                                                        employee.id
                                                    )
                                                }
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDeleteEmployee(
                                                        employee.id
                                                    )
                                                }
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {employees.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            Nenhum funcionário cadastrado.
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

export default EmployeerComponent;
