// <!DOCTYPE html>
// <html lang="es">
// <head>
//     <meta charset="UTF-8">
//     <title>Producto</title>
//     <link rel="stylesheet" href="estilos/sProducto.css">
//     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
//     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
// </head>
// <body>
import { useNavigate } from 'react-router-dom';
import { verificarSesion } from '../../../services/usuariosService';
import Logo from '../assets/titulo-encore.png'
import '../style/sProducto.css'

function Producto(){
    const navigate = useNavigate();

    const handleAgregarCarrito = () => {
        // const usuario = JSON.parse(localStorage.getItem("usuario"));

        // if(!usuario){
        //     navigate("/login", {state: {mensaje: "Debe iniciar sesión primero."}});
        // }
        const revisarSesion = async () => {
            const res = await verificarSesion();

            if(!res?.success){
                navigate("/login", {
                    state: {
                        mensaje: "Debe iniciar sesión primero."
                    }
                });
            }else{
                setUsuarioInfo(res.user);
            }
        };

        revisarSesion();
    };

    return(
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
        <header>
        <div className="logo">
            <img src={Logo} alt="Logo"/>
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

    <main className="product-container">

        <div className="product-image">
            <img src="https://shop.imaginedragonsmusic.com/cdn/shop/files/PRODUCT_IMDR_ECOMM_25_FIREINTHESEHILLS_HOODIE_ADULT_B.png?v=1763060643&width=1080" alt="Tshirt"/>
        </div>

        <div className="product-info">
            <h1>T Shirt - Toxicity</h1>
            <h2>$35.69</h2>

            <div className="sizes">
                <p>SIZE</p>
                <div className="size-options">
                    <button>S</button>
                    <button>M</button>
                    <button>L</button>
                    <button>XL</button>
                    <button>2XL</button>
                </div>
            </div>

            <p><strong>Status:</strong> In Stock</p>
            <p><strong>Delivery:</strong> Arrives in 3-5 days</p>

            <div className="buy-section">
                <button className="add-cart" onClick={handleAgregarCarrito}>
                    <i className="fa-solid fa-cart-shopping"></i>
                </button>

                <div className="item-quantity">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </div>
            </div>

            <div className="description">
                <h3>Product Description</h3>
                <ul>
                    <li>100% Cotton</li>
                    <li>Crew Neck</li>
                    <li>Machine Wash</li>
                    <li>Regular Fit</li>
                    <li>Screen Print Design</li>
                </ul>
            </div>

        </div>

        </main>
        </>
    )
}

export default Producto
