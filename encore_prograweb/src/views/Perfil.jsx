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

import Logo from '../assets/titulo-encore.png'
import '../style/sPerfil.css'

function Perfil(){
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
                    <img src="https://i.pravatar.cc/300" alt="Foto de perfil"/>
                    <h2>Ana López</h2>
                    <p>@analovesmusic</p>
                </div>

                <div class="profile-right">
                    <h3>Información Personal</h3>

                    <div class="info-item">
                        <span>Usuario</span>
                        <p>AnaLovesMusic</p>
                    </div>

                    <div class="info-item">
                        <span>Edad</span>
                        <p>24</p>
                    </div>

                    <div class="info-item">
                        <span>Contraseña</span>
                        <p>.............</p>
                    </div>

                    <div class="buttons">
                        <button class="edit">Editar Perfil</button>
                        <a href="/login" class="logout">Cerrar Sesión</a>
                    </div>

                </div>

            </div>

        </section>
        </>
    )
}

export default Perfil