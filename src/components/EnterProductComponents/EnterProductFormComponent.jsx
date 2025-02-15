import React, { useEffect, useState } from "react";
import axios from "axios";

function EnterProductForm() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    invoiceNumber: "",
    supplier: "",
    transporter: "",
    price: "",
    quantity: "",
    tax: "",
    totalValue: "",
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3099/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    const price = parseFloat(formData.price) || 0;
    const quantity = parseFloat(formData.quantity) || 0;
    const tax = parseFloat(formData.tax) || 0;
    const totalValue = price * quantity + tax;
    setFormData((prev) => ({
      ...prev,
      totalValue: totalValue.toFixed(2),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3099/api/enter-product/", formData);
      alert("Entrada de produto cadastrada com sucesso!");
      setFormData({
        productId: "",
        invoiceNumber: "",
        supplier: "",
        transporter: "",
        price: "",
        quantity: "",
        tax: "",
        totalValue: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar entrada de produto:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cadastro de Entrada de Produtos</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="mb-3">
          <label htmlFor="productId" className="form-label">Produto</label>
          <select id="productId" name="productId" value={formData.productId} onChange={handleChange} className="form-select" required>
            <option value="">Selecione um produto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="invoiceNumber" className="form-label">Nota Fiscal (NF)</label>
          <input type="text" id="invoiceNumber" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} className="form-control"  />
        </div>

        <div className="mb-3">
          <label htmlFor="supplier" className="form-label">Fornecedor</label>
          <input type="text" id="supplier" name="supplier" value={formData.supplier} onChange={handleChange} className="form-control"  />
        </div>

        <div className="mb-3">
          <label htmlFor="transporter" className="form-label">Transportadora</label>
          <input type="text" id="transporter" name="transporter" value={formData.transporter} onChange={handleChange} className="form-control"  />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Preço Unitário (R$)</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} onBlur={calculateTotal} className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantidade</label>
          <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} onBlur={calculateTotal} className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="tax" className="form-label">Imposto (R$)</label>
          <input type="number" id="tax" name="tax" value={formData.tax} onChange={handleChange} onBlur={calculateTotal} className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="totalValue" className="form-label">Valor Total (R$)</label>
          <input type="text" id="totalValue" name="totalValue" value={formData.totalValue} readOnly className="form-control" />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Cadastrar Entrada</button>
        </div>
      </form>
    </div>
  );
}

export default EnterProductForm;
