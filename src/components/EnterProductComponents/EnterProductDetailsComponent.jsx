import React from 'react';
import { useNavigate, useLocation } from "react-router-dom"

// import { Container } from './styles';

function EnterProductDetailsComponents() {

    const navigate = useNavigate();
    const location = useLocation();
    const entry = location.state?.entry; // Recebe os dados da entrada via state do React Router

    if (!entry) {
        return (
            <div className="entryDetails">
                <h3>Detalhes da Entrada</h3>
                <p>Erro: Nenhuma entrada selecionada.</p>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Voltar
                </button>
            </div>
        );
    }

  return (
    <div className="details">
        <h3>Detalhes da Entrada</h3>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Informações da Entrada</h4>
                    <div className="detail-item">
                        <strong>Nome do Produto:</strong> {entry.productName}
                    </div>
                    <div className="detail-item">
                        <strong>Categoria:</strong> {entry.category}
                    </div>
                    <div className="detail-item">
                        <strong>Quantidade:</strong> {entry.quantity}
                    </div>
                    <div className="detail-item">
                        <strong>Valor Total:</strong> R$ {parseFloat(entry.totalValue).toFixed(2)}
                    </div>
                </div>
            </div>
            <a href="/listaEntradaProdutos">
                <button className="btn btn-secondary mt-3">
                    Voltar
                </button>
            </a>
    </div>
  );
}

export default EnterProductDetailsComponents;