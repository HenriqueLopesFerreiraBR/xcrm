import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Accounting() {
  const [accountsReceivable, setAccountsReceivable] = useState([
    { id: 1, client: "Cliente A", dueDate: "2025-02-10", amount: 1200.0, status: "Pendente" },
    { id: 2, client: "Cliente B", dueDate: "2025-02-15", amount: 800.5, status: "Recebido" },
  ]);

  const [accountsPayable, setAccountsPayable] = useState([
    { id: 1, supplier: "Fornecedor X", dueDate: "2025-02-12", amount: 500.0, status: "Pendente" },
    { id: 2, supplier: "Fornecedor Y", dueDate: "2025-02-18", amount: 900.0, status: "Pago" },
  ]);

  const totalReceitas = accountsReceivable.reduce((acc, curr) => acc + (curr.status === "Recebido" ? curr.amount : 0), 0);
  const totalDespesas = accountsPayable.reduce((acc, curr) => acc + (curr.status === "Pago" ? curr.amount : 0), 0);
  const saldoTotal = totalReceitas - totalDespesas;

  const chartData = {
    labels: ["Receitas", "Despesas"],
    datasets: [
      {
        label: "Fluxo de Caixa",
        data: [totalReceitas, totalDespesas],
        backgroundColor: ["#28a745", "#dc3545"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 Painel Contábil</h2>

      {/* Resumo Financeiro */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title">💰 Total Recebido</h5>
              <h3>R$ {totalReceitas.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📉 Total Pago</h5>
              <h3>R$ {totalDespesas.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`card text-white shadow-sm ${saldoTotal >= 0 ? "bg-primary" : "bg-warning"}`}>
            <div className="card-body">
              <h5 className="card-title">🔹 Saldo Total</h5>
              <h3>R$ {saldoTotal.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Fluxo de Caixa */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">📈 Fluxo de Caixa</h5>
        <Bar data={chartData} />
      </div>

      {/* Tabela de Contas a Receber */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">💰 Contas a Receber</h5>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Vencimento</th>
              <th>Valor (R$)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {accountsReceivable.map((acc) => (
              <tr key={acc.id}>
                <td>{acc.id}</td>
                <td>{acc.client}</td>
                <td>{acc.dueDate}</td>
                <td>{acc.amount.toFixed(2)}</td>
                <td>
                  <span className={`badge ${acc.status === "Recebido" ? "bg-success" : "bg-warning"}`}>
                    {acc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabela de Contas a Pagar */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">📉 Contas a Pagar</h5>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Fornecedor</th>
              <th>Vencimento</th>
              <th>Valor (R$)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {accountsPayable.map((acc) => (
              <tr key={acc.id}>
                <td>{acc.id}</td>
                <td>{acc.supplier}</td>
                <td>{acc.dueDate}</td>
                <td>{acc.amount.toFixed(2)}</td>
                <td>
                  <span className={`badge ${acc.status === "Pago" ? "bg-success" : "bg-danger"}`}>
                    {acc.status}
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

export default Accounting;
