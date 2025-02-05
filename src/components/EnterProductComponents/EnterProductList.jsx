import React, { useEffect, useState } from "react";
import axios from "axios";

function EnterProductComponent() {
    const URL_API = "http://localhost:3099/api/enter-product/";
    const [entries, setEntries] = useState([]);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        productId: "",
        invoiceNumber: "",
        entryDate: "",
        supplier: "",
        transporter: "",
        price: "",
        quantity: "",
        tax: "",
        totalValue: ""
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchEntries();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3099/api/products/");
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const fetchEntries = async () => {
        try {
            const response = await axios.get(URL_API);
            // Formata a data para exibir corretamente sem a hora
            const formattedEntries = response.data.map(entry => ({
                ...entry,
                entryDate: entry.entryDate ? entry.entryDate.split("T")[0] : ""
            }));
            setEntries(formattedEntries);
        } catch (error) {
            console.error("Erro ao buscar entradas de produtos:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const calculateTotal = () => {
        const price = parseFloat(formData.price) || 0;
        const quantity = parseFloat(formData.quantity) || 0;
        const tax = parseFloat(formData.tax) || 0;
        setFormData((prev) => ({ ...prev, totalValue: (price * quantity + tax).toFixed(2) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Garante que a data será enviada apenas como YYYY-MM-DD
            const formattedData = {
                ...formData,
                entryDate: formData.entryDate ? formData.entryDate.split("T")[0] : ""
            };

            if (editingId) {
                await axios.put(`${URL_API}/${editingId}`, formattedData);
                setEditingId(null);
            } else {
                await axios.post(URL_API, formattedData);
            }
            setFormData({ productId: "", invoiceNumber: "", supplier: "", transporter: "", price: "", quantity: "", tax: "", totalValue: "", entryDate: "" });
            fetchEntries();
        } catch (error) {
            console.error("Erro ao salvar entrada de produto", error);
        }
    };

    const handleEdit = (entry) => {
        setFormData(entry);
        setEditingId(entry.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta entrada?")) {
            try {
                await axios.delete(`${URL_API}/${id}`);
                fetchEntries();
            } catch (error) {
                console.error("Erro ao deletar entrada", error);
            }
        }
    };

    return (
        <div className="enterProductComponent">
            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">{editingId ? "Editar" : "Cadastrar"} Entrada de Produto</h4>
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
                                <label>Nota Fiscal</label>
                                <input type="text" name="invoiceNumber" className="form-control" value={formData.invoiceNumber} onChange={handleChange} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Data de entrada</label>
                                <input type="date" name="entryDate" className="form-control" value={formData.entryDate} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label>Fornecedor</label>
                                <input type="text" name="supplier" className="form-control" value={formData.supplier} onChange={handleChange} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Transportadora</label>
                                <input type="text" name="transporter" className="form-control" value={formData.transporter} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label>Preço Unitário (R$)</label>
                                <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} onBlur={calculateTotal} required />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Quantidade</label>
                                <input type="number" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} onBlur={calculateTotal} required />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Taxas</label>
                                <input type="number" name="tax" className="form-control" value={formData.tax} onChange={handleChange} onBlur={calculateTotal}  />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">{editingId ? "Atualizar" : "Cadastrar"}</button>
                    </form>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Entradas de Produtos</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Nota Fiscal</th>
                                    <th>Entrada</th>
                                    <th>Fornecedor</th>
                                    <th>Transportadora</th>
                                    <th>Preço Unitário (R$)</th>
                                    <th>Quantidade</th>
                                    <th>Taxas Extras (R$)</th>
                                    <th>Valor Total (R$)</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((entry) => (
                                    <tr key={entry.id}>
                                        <td>{products.find(p => p.id === entry.productId)?.name || "Desconhecido"}</td>
                                        <td>{entry.invoiceNumber}</td>
                                        <td>{entry.entryDate}</td>
                                        <td>{entry.supplier}</td>
                                        <td>{entry.transporter}</td>
                                        <td>R$ {parseFloat(entry.price).toFixed(2)}</td>
                                        <td>{entry.quantity}</td>
                                        <td>R$ {parseFloat(entry.tax).toFixed(2)}</td>
                                        <td>R$ {parseFloat(entry.totalValue).toFixed(2)}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(entry)}>Editar</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(entry.id)}>Deletar</button>
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

export default EnterProductComponent;
