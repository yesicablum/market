import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/marketService';
import { loginUserSession } from '../services/sessionService';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginUser({ usuario, password });
      console.log('Login success:', data);
      loginUserSession();
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>
            Usuario:
            <input
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              required
              autoFocus
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <div className="login-error">{error}</div>}
        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Iniciando...' : 'Entrar'}
        </button>
        <div className="login-register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </div>
        <div className="login-home-link">
          <a href="/home">Volver a la página principal</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
