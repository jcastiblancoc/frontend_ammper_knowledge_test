import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../assets/forms.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://127.0.0.1:8001/api/v1/users/login/",
                new URLSearchParams({
                    email,
                    password
                }),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" }}
            );
            localStorage.setItem("token", response.data.access_token);
            navigate("/accounts");
        } catch (error) {
            alert("Error al iniciar sesión: " + error.response?.data?.detail || "Desconocido");
        }
    };


    return (
        <div className="form-container">
        <form className="formulario" onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>
            <p>Accede a tu cuenta</p>
            <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type="submit" disabled={!email || !password}>
            Iniciar Sesión
            </button>
        </form>
        <div className="register-link">
                <Link to="/register">Regístrate aquí</Link>
            </div>
        </div>
    );
};

export default Login;
