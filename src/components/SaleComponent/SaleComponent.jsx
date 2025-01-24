import React, { useState } from "react";

function SaleComponent() {
    const [sales, setSales] = useState([]); // Lista de vendas realizadas
    const [searchTerm, setSearchTerm] = useState(""); // Termo de pesquisa
    const [currentSale, setCurrentSale] = useState({
        client: "",
        items: [],
        paymentMethod: "",
        saleDate: "",
    }); // Dados do pedido atual
    const [itemData, setItemData] = useState({
        description: "",
        unitPrice: "",
        quantity: "",
    }); // Dados do item atual

    // Manipula os inputs do cliente, data e forma de pagamento
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentSale({ ...currentSale, [name]: value });
    };

    // Manipula os inputs dos itens
    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setItemData({ ...itemData, [name]: value });
    };

    // Adiciona o item ao pedido atual
    const handleAddItem = () => {
        const newItem = {
            ...itemData,
            totalPrice: parseFloat(itemData.unitPrice) * parseInt(itemData.quantity),
        };
        setCurrentSale({
            ...currentSale,
            items: [...currentSale.items, newItem],
        });
        setItemData({
            description: "",
            unitPrice: "",
            quantity: "",
        });
    };

    // Finaliza o pedido e adiciona à lista de vendas realizadas
    const handleSubmitSale = (e) => {
        e.preventDefault();
        const totalSaleValue = currentSale.items.reduce(
            (acc, item) => acc + item.totalPrice,
            0
        );
        const newSale = { ...currentSale, totalSaleValue, id: Date.now() };
        setSales([...sales, newSale]);
        setCurrentSale({
            client: "",
            items: [],
            paymentMethod: "",
            saleDate: "",
        });
    };

    // Filtra vendas pelo termo de pesquisa
    const filteredSales = sales.filter((sale) =>
        sale.client.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="SaleComponent">
            <div className="page-titles">
                <h5>Gerenciamento de Vendas</h5>
            </div>

            {/* Barra de Pesquisa */}
            <div className="search-bar mb-4">
                <input
                    type="text"
                    placeholder="Pesquisar por cliente..."
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Formulário de Cadastro de Venda */}
            <div className="card mb-4">
                <div className="card-body">
                    <h4>Criar Pedido de Venda</h4>
                    <form onSubmit={handleSubmitSale}>
                        <div className="mb-3">
                            <label>Cliente</label>
                            <input
                                type="text"
                                name="client"
                                className="form-control"
                                value={currentSale.client}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Data da Venda</label>
                            <input
                                type="date"
                                name="saleDate"
                                className="form-control"
                                value={currentSale.saleDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Forma de Pagamento</label>
                            <select
                                name="paymentMethod"
                                className="form-control"
                                value={currentSale.paymentMethod}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Cartão de Crédito">
                                    Cartão de Crédito
                                </option>
                                <option value="Cartão de Débito">
                                    Cartão de Débito
                                </option>
                                <option value="Pix">Pix</option>
                            </select>
                        </div>

                        {/* Adicionar Itens ao Pedido */}
                        <div className="item-section">
                            <h5>Adicionar Itens</h5>
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Descrição</label>
                                    <input
                                        type="text"
                                        name="description"
                                        className="form-control"
                                        value={itemData.description}
                                        onChange={handleItemChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label>Preço Unitário</label>
                                    <input
                                        type="number"
                                        name="unitPrice"
                                        className="form-control"
                                        value={itemData.unitPrice}
                                        onChange={handleItemChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label>Quantidade</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        className="form-control"
                                        value={itemData.quantity}
                                        onChange={handleItemChange}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-secondary mt-3"
                                onClick={handleAddItem}
                            >
                                Adicionar Item
                            </button>
                        </div>

                        {/* Exibir Itens Adicionados */}
                        {currentSale.items.length > 0 && (
                            <div className="mt-4">
                                <h5>Itens do Pedido</h5>
                                <ul>
                                    {currentSale.items.map((item, index) => (
                                        <li key={index}>
                                            {item.description} - R$ {item.unitPrice} x{" "}
                                            {item.quantity} = R${" "}
                                            {item.totalPrice.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary mt-4">
                            Finalizar Venda
                        </button>
                    </form>
                </div>
            </div>

            {/* Tabela de Vendas */}
            <div className="card">
                <div className="card-body">
                    <h4>Vendas Realizadas</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Data da Venda</th>
                                    <th>Forma de Pagamento</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSales.length > 0 ? (
                                    filteredSales.map((sale) => (
                                        <tr key={sale.id}>
                                            <td>{sale.client}</td>
                                            <td>{sale.saleDate}</td>
                                            <td>{sale.paymentMethod}</td>
                                            <td>R$ {sale.totalSaleValue.toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            Nenhuma venda encontrada.
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

export default SaleComponent;
