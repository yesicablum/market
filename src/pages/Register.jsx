import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserSession } from "../services/sessionService";
import { registerUser } from "../services/marketService";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({ usuario: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await registerUser(form);
      if (!response.ok) {
        throw new Error("Error al registrar. Intenta con otro nombre de usuario.");
      }

      const data = await response.json();
      console.log("Registro exitoso:", data);

      loginUserSession();
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registrarse</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>usuario:</label>
          <input
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" disabled={loading} className="register-button">
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="secondary-button"
          >
            Ya tengo cuenta
          </button>
          <div className="login-home-link">
          <a href="/home">Volver a la página principal</a>
        </div>
        </div>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default Register;
