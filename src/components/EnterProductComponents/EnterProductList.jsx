import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductEntryList() {
    const [entries, setEntries] = useState([
        {
            id: 1,
            productName: "Produto A",
            category: "Categoria 1",
            quantity: 10,
            totalValue: 200,
        },
        {
            id: 2,
            productName: "Produto B",
            category: "Categoria 2",
            quantity: 5,
            totalValue: 150,
        },
    ]);

    const navigate = useNavigate();

    const handleNewEntry = () => {
        navigate("/entradaProdutos");
    };

    // const handleViewDetails = (entry) => {
    //     alert(
    //         `Detalhes da entrada:\n\nProduto: ${entry.productName}\nCategoria: ${entry.category}\nQuantidade: ${entry.quantity}\nValor Total: R$ ${parseFloat(
    //             entry.totalValue
    //         ).toFixed(2)}`
    //     );
    // };

    const handleViewDetails = (entry) => {
        navigate("/detalhes-entrada", { state: { entry } });
    };

    return (
        <div className="productEntryList">
            <div className="page-header">
                <h5 className="bc-title">Entradas de Produtos</h5>
                <button
                    className="btn btn-primary"
                    onClick={handleNewEntry}
                    style={{ marginBottom: "20px" }}
                >
                    Nova Entrada
                </button>
            </div>

            {/* Tabela de Entradas */}
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Lista de Entradas</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nome do Produto</th>
                                    <th>Categoria</th>
                                    <th>Quantidade</th>
                                    <th>Valor Total</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((entry) => (
                                    <tr key={entry.id}>
                                        <td>{entry.productName}</td>
                                        <td>{entry.category}</td>
                                        <td>{entry.quantity}</td>
                                        <td>R$ {parseFloat(entry.totalValue).toFixed(2)}</td>
                                        <td>
                                            <button
                                                className="btn btn-info btn-sm"
                                                onClick={() => handleViewDetails(entry)}
                                            >
                                                Detalhe
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {entries.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            Nenhuma entrada cadastrada.
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

export default ProductEntryList;
