// <!DOCTYPE html>
// <html lang="es">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>Perfil</title>
// <link rel="stylesheet" href="estilos/sPerfil.css">
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
// </head>
// <body>

import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/titulo-encore.png'
import '../style/sEditarPerfil.css'

function EditarPerfil(){

    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const [usuarioInfo, setUsuarioInfo] = useState("");

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if(!usuario){
            navigate("/login", {state: {mensaje: "Debe iniciar sesión primero."}});
        }else{
            setUsuarioInfo(usuario);
        }
    }, []);
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setPreview(URL.createObjectURL(file));
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

            <nav>
                <a href="/">MERCH</a>
                <a href="/eventos">EVENTOS</a>
                <a href="/artistas">ARTISTAS/BANDAS</a>
            </nav>

            <div class="icons">
                <a href="/admin"><i className="fa-solid fa-gear"></i></a>
                <a href="/perfil"><i className="fa-solid fa-user"></i></a>
                <a href="/carrito"><i className="fa-solid fa-cart-shopping"></i></a>
            </div>
        </header>

        <section class="profile-container">

            <div class="profile-card">

                <div class="profile-left">
                    <h2>Editar imagen</h2>
                    <input type="file" accept="image/*" onChange={handleImageChange} required/>

                    <div class="image-preview">
                        {preview && <img src={preview} alt='preview'></img>}
                    </div>
                </div>

                <div class="profile-right">
                    <h3>Editar Información</h3>

                    <div class="info-item">
                        <span>Usuario</span>
                        <input type='text' value={usuarioInfo?.usuario} onChange={(e) => setUsuarioInfo({...usuarioInfo, usuario: e.target.value})}></input>
                    </div>

                    <div class="info-item">
                        <span>Fecha de Nacimiento</span>
                        <input type='date' value={usuarioInfo.fecha_nac?.split("T")[0]} onChange={(e) => setUsuarioInfo({...usuarioInfo, fecha_nac: e.target.value})}></input>
                    </div>

                    <div class="info-item">
                        <span>Contraseña</span>
                        <input type='password' placeholder='Nueva contraseña'></input>
                    </div>

                    <div class="buttons">
                        <button className="edit">Guardar cambios</button>
                        <button className="btnRegresar" onClick={() => navigate("/perfil")}>Regresar</button>
                    </div>

                </div>

            </div>

        </section>
        </>
    )
}

export default EditarPerfil