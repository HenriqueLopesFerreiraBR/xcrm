import React, { useState, useEffect } from "react";

function InventoryControl() {
  const [stock, setStock] = useState([]);

  // Simula o carregamento de dados do estoque
  useEffect(() => {
    async function fetchStock() {
      // Substitua esta chamada por um fetch para a API real
      const fakeStock = [
        { id: 1, name: "Dexametazona", quantity: 50, unitPrice: 10.0 },
        { id: 2, name: "Prostat", quantity: 30, unitPrice: 15.5 },
        { id: 3, name: "Cafelexina", quantity: 20, unitPrice: 7.25 },
      ];
      setStock(fakeStock);
    }

    fetchStock();
  }, []);

  // Função para editar um produto (placeholder)
  const handleEdit = (id) => {
    alert(`Editar produto com ID: ${id}`);
  };

  // Função para remover um produto
  const handleRemove = (id) => {
    if (window.confirm("Tem certeza que deseja remover este produto?")) {
      setStock(stock.filter((item) => item.id !== id));
    }
  };

  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Controle de Estoque</h2>

      {/* Botão para adicionar novos produtos */}
      <div className="mb-4 text-end">
        <a       href="/entradaProdutos"><button
          className="btn btn-primary"
          onClick={() => alert("Redirecionar para página de novo produto")}
        >
     Novo Produto
        </button></a>
      </div>

      {/* Tabela de controle de estoque */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário (R$)</th>
            <th>Valor Total (R$)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice.toFixed(2)}</td>
              <td>{(item.quantity * item.unitPrice).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(item.id)}
                >
                  Editar
                </button>
                {/* <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(item.id)}
                >
                  Remover
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mensagem caso o estoque esteja vazio */}
      {stock.length === 0 && (
        <div className="alert alert-warning text-center">
          Nenhum produto em estoque.
        </div>
      )}
    </div>
  );
}

export default InventoryControl;
