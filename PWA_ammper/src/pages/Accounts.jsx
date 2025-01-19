import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/banks.css";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [balanceData, setBalanceData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://f77e-181-237-111-63.ngrok-free.app/api/v1/transactions/banks", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAccounts(response.data.banks);
            } catch (error) {
                setError("Error al obtener las cuentas");
            } finally {
                setLoading(false);
            }
        };
        fetchAccounts();
    }, [token]);

    const handleClick = async (bankId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://f77e-181-237-111-63.ngrok-free.app/api/v1/transactions/banks/${bankId}/balance`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBalanceData(response.data);
        } catch (error) {
            setError("Error al obtener el balance del banco");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="form-container">
            <button className="logout-button" onClick={handleLogout}>Salir</button>
            <h2 className="title">Bancos</h2>

            {error && <p className="error">{error}</p>}

            {loading && <p className="loading">Cargando...</p>}

            <ul className="banks-list">
                {accounts.map((account) => (
                    <li key={account.id} className="bank-item">
                        <span className="bank-name">{account.institution}</span>
                        <button
                            className="formulario button"
                            onClick={() => handleClick(account.id)}
                        >
                            Ver Balance
                        </button>
                    </li>
                ))}
            </ul>

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
