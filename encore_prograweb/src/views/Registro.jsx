// <!DOCTYPE html>
// <html lang="es">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>Crear Cuenta</title>

// <link rel="stylesheet" href="estilos/sRegistro.css">
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

// </head>
// <body>
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/titulo-encore.png'
import '../style/sRegistro.css'
import { crearUsuarios } from '../../../services/usuariosService';

function Registro(){
    //FUNCION REGISTRAR USUARIO
    const [nombre, setNombre] = useState("");
    const [fechaNac, setFechaNac] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [imagen, setImagen] = useState(null);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleGuardar = async (e) => {
        e.preventDefault();

        const nuevoUsuario = new FormData();
        nuevoUsuario.append("nombre", nombre);
        nuevoUsuario.append("fecha_nac", fechaNac);
        nuevoUsuario.append("usuario", usuario);
        nuevoUsuario.append("contrasena", password);
        nuevoUsuario.append("imagen", imagen);

        const res = await crearUsuarios(nuevoUsuario);
        console.log(res);

        setNombre("");
        setFechaNac("");
        setUsuario("");
        setPassword("");
        setPreview("");
        setImagen(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        navigate("/login");
    };

    //PREVIEW IMAGEN DE PERFIL
    const [preview, setPreview] = useState("");
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setPreview(URL.createObjectURL(file));
            setImagen(file);
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
        <div class="register-container">
            <div class="register-card">
                <h1>Crear Cuenta</h1>
                <p>Regístrate para comenzar</p>
                <form onSubmit={handleGuardar}>
                    <div class="input-group">
                        <i class="fa-solid fa-user"></i>
                        <input type="text" placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                    </div>

                    <div class="input-group">
                        <i class="fa-solid fa-calendar-days"></i>
                        <input type="date" name="fechaNacimiento" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} required/>
                    </div>

                    <div class="input-group">
                        <i class="fa-solid fa-circle-user"></i>
                        <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required/>
                    </div>

                    <div class="input-group">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>

                    <div className="input-group">
                        <label>Imagen de Perfil</label>
                        <input type="file" name="imagen" accept="image/*" onChange={handleImageChange} ref={fileInputRef} required />
                    </div>

                    <div className="image-preview">
                        {preview && <img src={preview} alt='preview'></img>}
                    </div>

                    <button href="/login" class="btnCrearC">Crear Cuenta</button>

                    <div class="extra-links">
                        <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Registro