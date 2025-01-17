import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
    });

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
            const response = await axios.post("http://127.0.0.1:8001/api/v1/users/register", formData);
        alert(response.data.message || "Registro exitoso. Ahora puedes iniciar sesión.");
        } catch (error) {
        alert(error.response?.data?.detail || "Error al registrarte");
        }
    };

    return (
        <div>
        <h2>Registro</h2>
        <form onSubmit={handleRegister}>
            <input
            type="text"
            name="first_name"
            placeholder="Nombre"
            value={formData.first_name}
            onChange={handleChange}
            />
            <input
            type="text"
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name}
            onChange={handleChange}
            />
            <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            />
            <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            />
            <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            />
            <button type="submit">Registrarse</button>
        </form>
        </div>
    );
};

export default Register;
