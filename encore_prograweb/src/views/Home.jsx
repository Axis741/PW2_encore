// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8"/>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//     <title>Home</title>
//     <link rel="stylesheet" href="estilos/sHome.css"/>
//     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
//     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
// </head>
// <body>
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/titulo-encore.png'
import '../style/sHome.css'

function Home() {
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
    return(
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
        <header>
        <div className="logo">
            <img src={Logo} alt="Encore Merch Logo"/>
        </div>

        <nav>
            <a href="/">MERCH</a>
            <a href="/eventos">EVENTOS</a>
            <a href="/artistas">ARTISTAS/BANDAS</a>
        </nav>

        <div className="icons">
            <a href="/admin"><i className="fa-solid fa-gear"></i></a>
            <a href="/perfil"><i className="fa-solid fa-user"></i></a>
            <a href="/carrito"><i className="fa-solid fa-cart-shopping"></i></a>
        </div>
    </header>
    
    <section className="search-section">
        <div className="search-box">
            <input type="text" placeholder="Buscar..."/>
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>
    </section>

    {mensajeVisible && <p className='mensajeNotify'>{mensajeVisible}</p>}

    <main className="products">

        <a href="/producto" className="card"><img src="https://shop.imaginedragonsmusic.com/cdn/shop/files/PRODUCT_IMDR_ECOMM_25_FIREINTHESEHILLS_HOODIE_ADULT_B.png?v=1763060643&width=1080" alt="Producto"/></a>
        <a href="/producto" className="card"><img src="https://shopuk.imaginedragonsmusic.com/cdn/shop/files/2_a26d0dbf-2c13-471e-bf0d-0184c70bfcd4.webp?v=1745408643&width=800" alt="Producto"/></a>
        <a href="/producto" className="card"><img src="https://shop.conangray.com/cdn/shop/files/FHnecklace_v2.png?v=1762887087&width=1000" alt="Producto"/></a>
        <a href="/producto" className="card"><img src="https://i.etsystatic.com/56695329/r/il/275e9e/6858822765/il_fullxfull.6858822765_nbg2.jpg" alt="Producto"/></a>
        <a href="/producto" className="card"><img src="https://shop.conangray.com/cdn/shop/files/black-tee.png?v=1712610927" alt="Producto"/></a>
        <a href="/producto" className="card"><img src="https://m.media-amazon.com/images/I/5109wfssB+L._AC_UF894,1000_QL80_.jpg" alt="Producto"/></a>
        <a href="/producto" className="card"><img src="https://thecircle.de/cdn/shop/files/Conan-Gray_Kid-Krow-Embroidered-Hoodie_Hoodies_s514756_o6694780_a539386_v13142515.0874bfe6.png?v=1742403552" alt="Producto"/></a>
        <a href="/producto" className="card"><img src="https://store.sabrinacarpenter.com/cdn/shop/files/PRODUCT_SC_VDAY_MOCK_01.png?v=1771001104&width=1100" alt="Producto"/></a>

    </main>
    
    </>
    )
}

export default Home
    
    
// </body>
// </html>