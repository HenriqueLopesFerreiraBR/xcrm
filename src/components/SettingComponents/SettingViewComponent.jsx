import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingViewComponent = () => {
    const navigate = useNavigate();
    const [dados, setDados] = useState({
        nome: "X-Tech",
        email: "henrique@xtech.com",
        telefone: "(11) 99999-9999",
        endereco: "Rua Exemplo, 123, São Paulo - SP",
        cnpj: "00.000.000/0001-00",
        responsavel: "Henrique Lopes Ferreira",
        setor: "Diretoria",
        plano: "Premium"
    });

    return (
        <div className="container mt-4">
            <h2>Configurações</h2>
            <div className="card p-4">
                <h4>Dados da Empresa</h4>
                <ul className="list-group">
                    <li className="list-group-item"><strong>Nome:</strong> {dados.nome}</li>
                    <li className="list-group-item"><strong>Email:</strong> {dados.email}</li>
                    <li className="list-group-item"><strong>Telefone:</strong> {dados.telefone}</li>
                    <li className="list-group-item"><strong>Endereço:</strong> {dados.endereco}</li>
                    <li className="list-group-item"><strong>CNPJ:</strong> {dados.cnpj}</li>
                    <li className="list-group-item"><strong>Responsável:</strong> {dados.responsavel}</li>
                    <li className="list-group-item"><strong>Setor:</strong> {dados.setor}</li>
                    <li className="list-group-item"><strong>Plano:</strong> {dados.plano}</li>
                </ul>
                <button className="btn btn-primary mt-3" onClick={() => navigate("/formConfiguracoes")}>Editar</button>
            </div>
        </div>
    );
};

export default SettingViewComponent;