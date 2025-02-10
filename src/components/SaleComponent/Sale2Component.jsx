import React, { useState } from "react";

function Sale2Component() {
    const [products] = useState([
        { id: 1, name: "Ração Premium", price: 50.0 },
        { id: 2, name: "Banho e Tosa", price: 80.0 },
        { id: 3, name: "Brinquedo para Pet", price: 25.0 },
    ]);
    const [clients] = useState([
        { id: 1, name: "Normal"  },
        { id: 2, name: "João"},
        { id: 3, name: "Leila", },
    ]);
    const cart = []
    const [sales, setSales] = useState([]);
    const [formData, setFormData] = useState({
        productId: "",
        customer: "",
        quantity: "",
        total: "",
        status: "Pendente",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProductChange = (e) => {
        const productId = e.target.value;
        const selectedProduct = products.find(p => p.id === parseInt(productId));
        setFormData({ ...formData, productId, price: selectedProduct ? selectedProduct.price : "" });
    };

    const handleClientChange = (e)=>{
        const clientId = e.target.value;
        const selectdClient = clients.find(p => p.id === parseInt(clientId));
        setFormData({...formData, clientId})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const selectedProduct = products.find(p => p.id === parseInt(formData.productId));
        if (!selectedProduct) return;
        const total = (selectedProduct.price * formData.quantity).toFixed(2);
        setSales([...sales, { ...formData, id: Date.now(), productName: selectedProduct.name, total }]);
        setFormData({ productId: "", customer: "", quantity: "", total: "", status: "Pendente" });
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
            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">Registrar Venda</h4>
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label>Produto</label>
                                <select
                                    name="productId"
                                    className="form-control"
                                    value={formData.productId}
                                    onChange={handleProductChange}
                                    required
                                >
                                    <option value="">Selecione um produto</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name} - R$ {product.price.toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Cliente</label>
                                <select
                                    name="clientId"
                                    className="form-control"
                                    value={formData.clientId}
                                    onChange={handleClientChange}
                                    required
                                >
                                    <option value="">Selecione um cliente</option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {client.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Valor</label>
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
                        {/* <button type="submit" className="btn btn-primary">
                            Registrar Venda
                        </button> */}
                        <button type="submit" className="btn btn-primary">
                            <a href="/pedidoVenda">
                                Nova Venda
                            </a>
                        </button>
                    </form>
                </div>
            </div>
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
                                            <span className={`badge ${sale.status === "Concluída" ? "badge-success" : "badge-warning"}`}>
                                                {sale.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditSale(sale.id)}>
                                                Editar
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSale(sale.id)}>
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {sales.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">Nenhuma venda registrada.</td>
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
