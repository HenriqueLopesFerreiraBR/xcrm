import React, { useState } from "react";

function Sale2Component() {
    const [sales, setSales] = useState([]);
    const [formData, setFormData] = useState({
        productName: "",
        customer: "",
        price: "",
        quantity: "",
        total: "",
        status: "Pendente",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSales([...sales, { ...formData, id: Date.now(), total: (formData.price * formData.quantity).toFixed(2) }]);
        setFormData({
            productName: "",
            customer: "",
            price: "",
            quantity: "",
            total: "",
            status: "Pendente",
        });
    };

    const handleDeleteSale = (id) => {
        setSales(sales.filter((sale) => sale.id !== id));
    };

    const handleEditSale = (id) => {
        const saleToEdit = sales.find((sale) => sale.id === id);
        setFormData(saleToEdit);
        setSales(sales.filter((sale) => sale.id !== id));
    };

    return (
        <div className="Sale2Component">
            <div className="page-titles">
                <ol className="breadcrumb">
                    <li>
                        <h5 className="bc-title">Gerenciar Vendas</h5>
                    </li>
                    <li className="breadcrumb-item active">
                        <a href="/">Gerenciar Vendas</a>
                    </li>
                </ol>
            </div>

            {/* Formulário de Cadastro */}
            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">Registrar Venda</h4>
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label>Produto</label>
                                <input
                                    type="text"
                                    name="productName"
                                    className="form-control"
                                    value={formData.productName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Cliente</label>
                                <input
                                    type="text"
                                    name="customer"
                                    className="form-control"
                                    value={formData.customer}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Preço Unitário</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Quantidade</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    className="form-control"
                                    value={formData.quantity}
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
                                    <option value="Pendente">Pendente</option>
                                    <option value="Concluída">Concluída</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Registrar Venda
                        </button>
                    </form>
                </div>
            </div>

            {/* Tabela de Vendas */}
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Vendas Registradas</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Cliente</th>
                                    <th>Preço Unitário</th>
                                    <th>Quantidade</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((sale) => (
                                    <tr key={sale.id}>
                                        <td>{sale.productName}</td>
                                        <td>{sale.customer}</td>
                                        <td>R$ {parseFloat(sale.price).toFixed(2)}</td>
                                        <td>{sale.quantity}</td>
                                        <td>R$ {sale.total}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    sale.status === "Concluída" ? "badge-success" : "badge-warning"
                                                }`}
                                            >
                                                {sale.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEditSale(sale.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteSale(sale.id)}
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {sales.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            Nenhuma venda registrada.
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

export default Sale2Component;
