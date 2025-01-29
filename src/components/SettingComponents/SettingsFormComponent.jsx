import React, { useState } from "react";

function SettingFormComponent() {
    const [formData, setFormData] = useState({
        nomeUsuario: "",
        email: "",
        senha: "",
        telefone: "",
        endereco: "",
        cnpj: "",
        razaoSocial: "",
        nomeFantasia: "",
        inscricaoEstadual: "",
        telefoneEmpresa: "",
        emailEmpresa: "",
        enderecoEmpresa: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert("Configurações salvas com sucesso!");
    };

    return (
        <div className="container mt-4">
            <h2>Configurações</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="card mb-4">
                    <div className="card-header">Dados do Usuário</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Nome</label>
                                <input type="text" name="nomeUsuario" className="form-control" value={formData.nomeUsuario} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Senha</label>
                                <input type="password" name="senha" className="form-control" value={formData.senha} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Telefone</label>
                                <input type="text" name="telefone" className="form-control" value={formData.telefone} onChange={handleInputChange} required />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-header">Dados da Empresa</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>CNPJ</label>
                                <input type="text" name="cnpj" className="form-control" value={formData.cnpj} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Razão Social</label>
                                <input type="text" name="razaoSocial" className="form-control" value={formData.razaoSocial} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Nome Fantasia</label>
                                <input type="text" name="nomeFantasia" className="form-control" value={formData.nomeFantasia} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Inscrição Estadual</label>
                                <input type="text" name="inscricaoEstadual" className="form-control" value={formData.inscricaoEstadual} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Telefone</label>
                                <input type="text" name="telefoneEmpresa" className="form-control" value={formData.telefoneEmpresa} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Email</label>
                                <input type="email" name="emailEmpresa" className="form-control" value={formData.emailEmpresa} onChange={handleInputChange} required />
                            </div>
                            <div className="col-12 mb-3">
                                <label>Endereço</label>
                                <input type="text" name="enderecoEmpresa" className="form-control" value={formData.enderecoEmpresa} onChange={handleInputChange} required />
                            </div>
                        </div>
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary">Salvar Configurações</button>
            </form>
        </div>
    );
}

export default SettingFormComponent;
