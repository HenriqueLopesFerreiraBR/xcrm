import React, { useState } from "react";

function ProductComponent() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
        status: "Disponível",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setProducts([...products, { ...formData, id: Date.now() }]);
        setFormData({
            name: "",
            category: "",
            price: "",
            quantity: "",
            description: "",
            status: "Disponível",
        });
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleEditProduct = (id) => {
        const productToEdit = products.find((product) => product.id === id);
        setFormData(productToEdit);
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div className="productComponent">
            <div className="page-titles">
                <ol className="breadcrumb">
                    <li>
                        <h5 className="bc-title">Gerenciar Produto</h5>
                    </li>
                    <li className="breadcrumb-item active">
                        <a href="/">Gerenciar Produto</a>
                    </li>
                </ol>
            </div>

            {/* Formulário de Cadastro */}
            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">Cadastrar Produto</h4>
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label>Nome do Produto</label>
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
                                <label>Categoria</label>
                                <input
                                    type="text"
                                    name="category"
                                    className="form-control"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Preço</label>
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
                                <label>Descrição</label>
                                <input
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    value={formData.description}
                                    onChange={handleInputChange}
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
                                    <option value="Disponível">Disponível</option>
                                    <option value="Indisponível">Indisponível</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>

            {/* Tabela de Produtos */}
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Produtos Cadastrados</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Categoria</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Descrição</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>R$ {parseFloat(product.price).toFixed(2)}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    product.status === "Disponível"
                                                        ? "badge-success"
                                                        : "badge-danger"
                                                }`}
                                            >
                                                {product.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEditProduct(product.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            Nenhum produto cadastrado.
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

export default ProductComponent;
