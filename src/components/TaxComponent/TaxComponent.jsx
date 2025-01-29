import React, { useState } from "react";


import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TaxComponent() {
  const [fiscalData, setFiscalData] = useState([
    { id: 1, number: "NF-1001", client: "Cliente A", date: "2025-01-10", amount: 1500.0, icms: 180, iss: 75, pis: 20, cofins: 50 },
    { id: 2, number: "NF-1002", client: "Cliente B", date: "2025-01-15", amount: 3200.0, icms: 384, iss: 160, pis: 42, cofins: 95 },
  ]);

  const totalFaturamento = fiscalData.reduce((acc, nf) => acc + nf.amount, 0);
  const totalICMS = fiscalData.reduce((acc, nf) => acc + nf.icms, 0);
  const totalISS = fiscalData.reduce((acc, nf) => acc + nf.iss, 0);
  const totalPIS = fiscalData.reduce((acc, nf) => acc + nf.pis, 0);
  const totalCOFINS = fiscalData.reduce((acc, nf) => acc + nf.cofins, 0);
  const totalImpostos = totalICMS + totalISS + totalPIS + totalCOFINS;

  const chartData = {
    labels: ["ICMS", "ISS", "PIS", "COFINS"],
    datasets: [
      {
        label: "Impostos (R$)",
        data: [totalICMS, totalISS, totalPIS, totalCOFINS],
        backgroundColor: ["#ff5733", "#ffc107", "#28a745", "#17a2b8"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📑 Painel Fiscal</h2>

      {/* Resumo Fiscal */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📄 Notas Emitidas</h5>
              <h3>{fiscalData.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-body">
              <h5 className="card-title">💰 Total de Impostos</h5>
              <h3>R$ {totalImpostos.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📈 Faturamento Total</h5>
              <h3>R$ {totalFaturamento.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Impostos */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">📊 Impostos Arrecadados</h5>
        <Bar data={chartData} />
      </div>

      {/* Tabela de Notas Fiscais */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">📋 Notas Fiscais Emitidas</h5>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Nº Nota</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Valor Total (R$)</th>
              <th>ICMS</th>
              <th>ISS</th>
              <th>PIS</th>
              <th>COFINS</th>
            </tr>
          </thead>
          <tbody>
            {fiscalData.map((nf) => (
              <tr key={nf.id}>
                <td>{nf.number}</td>
                <td>{nf.client}</td>
                <td>{nf.date}</td>
                <td>{nf.amount.toFixed(2)}</td>
                <td>{nf.icms.toFixed(2)}</td>
                <td>{nf.iss.toFixed(2)}</td>
                <td>{nf.pis.toFixed(2)}</td>
                <td>{nf.cofins.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaxComponent;
