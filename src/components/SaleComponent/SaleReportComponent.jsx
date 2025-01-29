import React, { useState } from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SaleReportComponent() {
  const [salesData, setSalesData] = useState([
    { id: 1, client: "Uni Hospitalar", date: "2025-01-10", amount: 1500.0, status: "Pago" },
    { id: 2, client: "Euro Farma", date: "2025-01-15", amount: 3200.0, status: "Pendente" },
    { id: 3, client: "Cliente C", date: "2025-01-20", amount: 2500.0, status: "Pago" },
  ]);

  const totalVendas = salesData.length;
  const totalReceita = salesData.reduce((acc, sale) => acc + sale.amount, 0);

  const chartData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Vendas (R$)",
        data: [8000, 7500, 9200, 8700, 10200, 9700],
        backgroundColor: "#007bff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🛒 Painel de Vendas</h2>

      {/* Botão de Nova Venda */}
      <div className="mb-4">
        <a href="/vendas"><button className="btn btn-success">➕ Nova Venda</button></a>
      </div>

      {/* Resumo de Vendas */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card text-white bg-primary shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📊 Total de Vendas</h5>
              <h3>{totalVendas}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title">💰 Receita Total</h5>
              <h3>R$ {totalReceita.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Vendas Mensais */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">📈 Vendas Mensais</h5>
        <Bar data={chartData} />
      </div>

      {/* Tabela de Vendas */}
      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">📋 Histórico de Vendas</h5>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Cliente</th>
              <th>Data</th>
              <th>Valor (R$)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.client}</td>
                <td>{sale.date}</td>
                <td>{sale.amount.toFixed(2)}</td>
                <td>
                  <span className={`badge ${sale.status === "Pago" ? "bg-success" : "bg-warning"}`}>
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SaleReportComponent;
