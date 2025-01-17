import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/banks.css";

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [balanceData, setBalanceData] = useState(null); // Balance, ingresos y egresos
    const [loading, setLoading] = useState(false); // Indicador de carga
    const [error, setError] = useState(null); // Manejo de errores
    const token = localStorage.getItem("token");

    // Obtener cuentas al cargar el componente
    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:8001/api/v1/transactions/banks", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAccounts(response.data.results); // Acceder a 'results' para obtener los bancos
            } catch (error) {
                setError("Error al obtener las cuentas");
            } finally {
                setLoading(false);
            }
        };
        fetchAccounts();
    }, [token]);

    // Obtener balance de un banco específico
    const handleClick = async (bankId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8001/api/v1/transactions/banks/${bankId}/balance`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBalanceData(response.data); // Guardar balance, ingresos y egresos
        } catch (error) {
            setError("Error al obtener el balance del banco");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="accounts-container">
            <h2 className="title">Bancos</h2>

            {/* Mostrar error si ocurre */}
            {error && <p className="error">{error}</p>}

            {/* Mostrar indicador de carga */}
            {loading && <p className="loading">Cargando...</p>}

            {/* Lista de bancos */}
            <ul className="banks-list">
                {accounts.map((account) => (
                    <li key={account.id} className="bank-item">
                        <span className="bank-name">{account.institution}</span>
                        <button
                            className="view-balance-button"
                            onClick={() => handleClick(account.id)}
                        >
                            Ver Balance
                        </button>
                    </li>
                ))}
            </ul>

            {/* Mostrar detalles del balance */}
            {balanceData && (
                <div className="balance-container">
                    <div className="balance-summary">
                        <h1 className="balance-amount">
                            Balance: ${balanceData.balance.toFixed(2)}
                        </h1>
                    </div>
                    <div className="income-expense-details">
                        <p><strong>Ingresos:</strong> ${balanceData.ingresos.toFixed(2)}</p>
                        <p><strong>Egresos:</strong> ${Math.abs(balanceData.egresos).toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Accounts;
