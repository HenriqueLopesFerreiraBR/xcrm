import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductComponent() {
    const URL_API = `http://localhost:3099/api/products/`;

    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        weightKg: ""
    });
    const [editingId, setEditingId] = useState(null);
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(URL_API);
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${URL_API}/${editingId}`, formData);
                setEditingId(null);
            } else {
                await axios.post(URL_API, formData);
            }
            setFormData({ name: "", description: "", price: "", weightKg: "" });
            fetchProducts();
        } catch (error) {
            console.error("Erro ao salvar produto", error);
            alert(`${error.response.data.message}`);
        }
    };

    const handleEditProduct = (product) => {
        setFormData(product);
        setEditingId(product.id);
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            try {
                await axios.delete(`${URL_API}/${id}`);
                fetchProducts();
            } catch (error) {
                console.error("Erro ao deletar produto", error);
            }
        }
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "asc") {
            return a[sortField] > b[sortField] ? 1 : -1;
        } else {
            return a[sortField] < b[sortField] ? 1 : -1;
        }
    });

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
            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">{editingId ? "Editar" : "Cadastrar"} Produto</h4>
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label>Nome do Produto</label>
                                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Descrição</label>
                                <input type="text" name="description" className="form-control" value={formData.description} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Preço</label>
                                <input type="number" name="price" className="form-control" value={formData.price} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Peso (Kg)</label>
                                <input type="number" name="weightKg" className="form-control" value={formData.weightKg} onChange={handleInputChange} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {editingId ? "Atualizar" : "Cadastrar"}
                        </button>
                    </form>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Produtos Cadastrados</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                                        ID {sortField === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                    </th>
                                    <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                                        Nome {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                    </th>
                                    <th>Descrição</th>
                                    <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
                                        Preço {sortField === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                    </th>
                                    <th onClick={() => handleSort("weightKg")} style={{ cursor: "pointer" }}>
                                        Peso (Kg) {sortField === "weightKg" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                    </th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>R$ {parseFloat(product.price).toFixed(2)}</td>
                                        <td>{product.weightKg}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditProduct(product)}>
                                                Editar
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center">
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
