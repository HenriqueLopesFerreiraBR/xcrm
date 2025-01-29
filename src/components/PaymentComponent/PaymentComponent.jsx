import React, { useState } from "react";

function AccountsPayable() {
    const [accounts, setAccounts] = useState([
        {
            id: 1,
            supplier: "Fornecedor A",
            dueDate: "2025-02-10",
            amount: 500.0,
            status: "Pendente",
        },
        {
            id: 2,
            supplier: "Fornecedor B",
            dueDate: "2025-02-15",
            amount: 1200.5,
            status: "Pendente",
        },
    ]);

    const [newAccount, setNewAccount] = useState({
        supplier: "",
        dueDate: "",
        amount: "",
    });

    // Atualiza o estado do formulário
    const handleInputChange = (e) => {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
    };

    // Adiciona uma nova conta a pagar
    const handleAddAccount = () => {
        if (!newAccount.supplier || !newAccount.dueDate || !newAccount.amount) {
            alert("Preencha todos os campos!");
            return;
        }

        setAccounts([
            ...accounts,
            {
                id: accounts.length + 1,
                ...newAccount,
                amount: parseFloat(newAccount.amount),
                status: "Pendente",
            },
        ]);

        setNewAccount({ supplier: "", dueDate: "", amount: "" });
    };

    // Marca a conta como paga
    const handleMarkAsPaid = (id) => {
        setAccounts(
            accounts.map((acc) =>
                acc.id === id ? { ...acc, status: "Pago" } : acc
            )
        );
    };

    // Remove uma conta
    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta conta?")) {
            setAccounts(accounts.filter((acc) => acc.id !== id));
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">📌 Contas a Pagar</h2>

            {/* Formulário para nova conta */}
            <div className="card p-4 mb-4 shadow-sm">
                <h5 className="mb-3">Adicionar Nova Conta</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Fornecedor</label>
                        <input
                            type="text"
                            className="form-control"
                            name="supplier"
                            value={newAccount.supplier}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Vencimento</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dueDate"
                            value={newAccount.dueDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Valor (R$)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="amount"
                            value={newAccount.amount}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button
                            className="btn btn-success w-100"
                            onClick={handleAddAccount}
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabela de contas */}
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Fornecedor</th>
                        <th>Vencimento</th>
                        <th>Valor (R$)</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Nenhuma conta registrada.
                            </td>
                        </tr>
                    ) : (
                        accounts.map((acc) => (
                            <tr key={acc.id}>
                                <td>{acc.id}</td>
                                <td>{acc.supplier}</td>
                                <td>{acc.dueDate}</td>
                                <td>{acc.amount.toFixed(2)}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            acc.status === "Pago"
                                                ? "bg-success"
                                                : "bg-warning"
                                        }`}
                                    >
                                        {acc.status}
                                    </span>
                                </td>
                                <td>
                                    {acc.status === "Pendente" && (
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() =>
                                                handleMarkAsPaid(acc.id)
                                            }
                                        >
                                            Marcar como Pago
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(acc.id)}
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AccountsPayable;
