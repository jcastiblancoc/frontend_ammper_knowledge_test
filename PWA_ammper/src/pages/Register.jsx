import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/forms.css";

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/register", formData);
            alert(response.data.message || "Registro exitoso. Ahora puedes iniciar sesión.");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.detail || "Error al registrarte");
        }
    };

    return (
        <div className="form-container">
            <form className="formulario" onSubmit={handleRegister}>
                <h2>Registro</h2>
                <p>Crea una cuenta para continuar</p>

                <input
                    type="text"
                    name="first_name"
                    placeholder="Nombre"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Apellido"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
