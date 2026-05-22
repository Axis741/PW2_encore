// <!DOCTYPE html>
// <html lang="es">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>Iniciar Sesión</title>

// <link rel="stylesheet" href="estilos/sLogin.css">
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

// </head>
// <body>
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/titulo-encore.png'
import '../style/sLogin.css'
import { loginUsuarios } from '../../../services/usuariosService';
import { useEffect } from 'react';

function Login(){

    const [usuario, setUsuario] = useState("");
    const[contrasena, setContrasena] = useState("");
    const [mensajeVisible, setMensajeVisible] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    
    const mensaje = location.state?.mensaje;

    useEffect(() => {
        if(mensaje){
            setMensajeVisible(mensaje);
        }
    },[mensaje]);

    useEffect(() => {
        if(mensajeVisible){
            const timer = setTimeout(() => {
                setMensajeVisible("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    },[mensajeVisible]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await loginUsuarios({
            usuario,
            contrasena
        });

        if(res?.success){
            // localStorage.setItem("usuario", JSON.stringify(res.data));
            navigate("/");
        }else{
            setMensajeVisible(res?.message);
        }
    };

    return(
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
        <header>
            <div class="logo">
                <img src={Logo} alt="Encore Merch Logo"/>
            </div>

            <nav className="navegar">
                <a href="/">MERCH</a>
                <a href="/eventos">EVENTOS</a>
                <a href="/artistas">ARTISTAS/BANDAS</a>
            </nav>
        </header>
        <div class="login-container">

            {mensajeVisible && <p className='mensajeNotify'>{mensajeVisible}</p>}

            <div class="login-card">
                <h1>Bienvenido</h1>
                <p>Inicia sesión para continuar</p>

                <form onSubmit={handleLogin}>
                    <div class="input-group">
                        <i class="fa-solid fa-circle-user"></i>
                        <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required/>
                    </div>

                    <div class="input-group">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required/>
                    </div>

                    <button type="submit" class="btnInicioS">Iniciar Sesión</button>

                    <div class="extra-links">
                        <a href="/registro">Crear cuenta</a>
                    </div>
                </form>
            </div>

        </div>
        </>
    )
}

export default Login