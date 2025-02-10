import React, { useState } from "react";

function OrderComponent() {
    const [products] = useState([
        { id: 1, name: "Ração Premium", saleValue: 155.0, peso: 20 },
        { id: 2, name: "Banho e Tosa", saleValue: 70.0, peso: 1 },
        { id: 3, name: "Brinquedo para Pet", saleValue: 25.0, peso: 1 },
    ]);
    const [clients] = useState([
        { id: 1, name: "Normal"  },
        { id: 2, name: "João"},
        { id: 3, name: "Leila", },
    ]);
    const [sales, setSales] = useState([]);
    const [formData, setFormData] = useState({
        productId: "",
        clientId: "",
        amountPaid: "",
        quantity: "",
        total: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProductChange = (e) => {
        const productId = e.target.value;
        const selectedProduct = products.find(p => p.id === parseInt(productId));
        setFormData({ ...formData, productId, saleValue: selectedProduct ? selectedProduct.saleValue : "" });
    };

    const handleClientChange = (e) => {
        const clientId = e.target.value;
        setFormData({ ...formData, clientId });
    };

    const calculateQuantity = () => {
        const selectedProduct = products.find(p => p.id === parseInt(formData.productId));
        if (selectedProduct && formData.amountPaid) {
            return (parseFloat(formData.amountPaid) / selectedProduct.saleValue * selectedProduct.peso).toFixed(2);
        }
        return "";
    };

    const calculateTotalSales = () => {
        return sales.reduce((acc, sale) => acc + parseFloat(sale.total), 0).toFixed(2);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const selectedProduct = products.find(p => p.id === parseInt(formData.productId));
        if (!selectedProduct) return;
        const quantity = calculateQuantity();
        const total = (selectedProduct.saleValue * (quantity / selectedProduct.peso)).toFixed(2);
        setSales([...sales, { ...formData, id: Date.now(), productName: selectedProduct.name, quantity, total }]);
        setFormData({ productId: "", clientId: "", amountPaid: "", quantity: "", total: "" });
    };

    const handleFinalizeSale = () => {
        alert(`Venda finalizada! Total: R$ ${calculateTotalSales()}`);
        setSales([]);
    };

    return (
        <div className="OrderComponent">
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
                                            {product.name} - R$ {product.saleValue.toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>Valor Pago</label>
                                <input
                                    type="number"
                                    name="amountPaid"
                                    className="form-control"
                                    value={formData.amountPaid}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Quantidade Calculada (Kg)</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    className="form-control"
                                    value={calculateQuantity()}
                                    readOnly
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Adicionar ao Carrinho
                        </button>
                    </form>
                    <h4 className="mt-4">Carrinho de Vendas</h4>
                    <table className="table">
                        <thead>
                            <tr>

                                <th>Produto</th>
                                <th>Quantidade (Kg)</th>
                                <th>Total (R$)</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map(sale => (
                                <tr key={sale.id}>
                                    <td>{sale.productName}</td>
                                    <td>{sale.quantity}</td>
                                    <td>{sale.total}</td>
                                    <td>
                                            <button className="btn btn-warning btn-sm me-2" >
                                                Editar
                                            </button>
                                            <button className="btn btn-danger btn-sm" >
                                                Deletar
                                            </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h5>Total de Vendas: R$ {calculateTotalSales()}</h5>
                    <button className="btn btn-success mt-3" onClick={handleFinalizeSale}>
                        Finalizar Venda
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderComponent;
