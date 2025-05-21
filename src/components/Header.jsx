import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, logoutUser } from '../services/sessionService';
import { downloadReport } from '../services/marketService';
import './Header.css';


function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn());
    }, []);

    const handleLogout = () => {
        logoutUser();
        setIsLoggedIn(false);
        navigate('/login');
    };
    const handleDownload = async () => {
        try {
            const blob = await downloadReport();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "reporte.xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el reporte:", error);
            alert("No se pudo descargar el reporte.");
        }
    };
    return (
        // dentro del return de Header
        
            <div className="header-container">
                <div className="logo" onClick={() => navigate('/dashboard')}>Market App</div>
                {isLoggedIn ? (
                    <div className="nav-buttons">
                        <button onClick={() => navigate('/home')} className="btn btn-white">Inicio</button>
                        <button onClick={() => navigate('/dashboard')} className="btn btn-white">Dashboard</button>
                        <button onClick={handleDownload} className="btn btn-blue">Descargar reporte</button>
                        <button onClick={handleLogout} className="btn btn-red">Cerrar sesión</button>
                    </div>
                ) : (
                    <div className="nav-buttons">
                        <button onClick={() => navigate('/login')} className="btn btn-white">Iniciar sesión</button>
                        <button onClick={() => navigate('/register')} className="btn btn-blue">Registrarse</button>
                    </div>
                )}
            </div>
        

    );
}
export default Header;