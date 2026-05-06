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
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/titulo-encore.png'
import '../style/sPerfil.css'

function Perfil(){
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

    const calcularEdad = (fecha) => {
        const hoy = new Date();
        const nacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    };

    const logOut = () => {
        localStorage.removeItem("usuario");
        navigate("/login");
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
                    <img src={`http://localhost:8080/uploads/${usuarioInfo?.imagen}`} alt="Foto de perfil"/>
                    <h2>{usuarioInfo?.nombre}</h2>
                    <p>@{usuarioInfo?.usuario}</p>
                </div>

                <div class="profile-right">
                    <h3>Información Personal</h3>

                    <div class="info-item">
                        <span>Usuario</span>
                        <p>{usuarioInfo?.usuario}</p>
                    </div>

                    <div class="info-item">
                        <span>Edad</span>
                        <p>{calcularEdad(usuarioInfo?.fecha_nac)}</p>
                    </div>

                    <div class="info-item">
                        <span>Contraseña</span>
                        <p>.............</p>
                    </div>

                    <div class="buttons">
                        <button class="edit" onClick={() => navigate("/EditarPerfil")}>Editar Perfil</button>
                        <button class="logout" onClick={logOut}>Cerrar Sesión</button>
                    </div>

                </div>

            </div>

        </section>
        </>
    )
}

export default Perfil