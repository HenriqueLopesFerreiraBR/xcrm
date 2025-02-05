import React, { useEffect, useState } from "react";
import axios from "axios";

function StockComponent() {
    const URL_API = "http://localhost:3099/api/stock/";
    const [stocks, setStocks] = useState([]);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        productId: "",
        quantity: "",
        location: ""
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchStocks();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3099/api/products/");
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const fetchStocks = async () => {
        try {
            const response = await axios.get(URL_API);
            setStocks(response.data);
        } catch (error) {
            console.error("Erro ao buscar estoques:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${URL_API}/${editingId}`, formData);
                setEditingId(null);
            } else {
                await axios.post(URL_API, formData);
            }
            setFormData({ productId: "", quantity: "", location: "" });
            fetchStocks();
        } catch (error) {
            console.error("Erro ao salvar estoque", error);
        }
    };

    const handleEdit = (stock) => {
        setFormData(stock);
        setEditingId(stock.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este estoque?")) {
            try {
                await axios.delete(`${URL_API}/${id}`);
                fetchStocks();
            } catch (error) {
                console.error("Erro ao deletar estoque", error);
            }
        }
    };

    return (
        <div className="stockComponent">
            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">{editingId ? "Editar" : "Cadastrar"} Estoque</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label>Produto</label>
                                <select name="productId" className="form-control" value={formData.productId} onChange={handleChange} required>
                                    <option value="">Selecione um produto</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Quantidade em Estoque</label>
                                <input type="number" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Localização</label>
                                <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">{editingId ? "Atualizar" : "Cadastrar"}</button>
                    </form>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Estoque</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Localização</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stocks.map((stock) => (
                                    <tr key={stock.id}>
                                        <td>{products.find(p => p.id === stock.productId)?.name || "Desconhecido"}</td>
                                        <td>{stock.quantity}</td>
                                        <td>{stock.location}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(stock)}>Editar</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(stock.id)}>Deletar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StockComponent;
