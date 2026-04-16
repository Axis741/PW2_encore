// <!DOCTYPE html>
// <html lang="es">
// <head>
//     <meta charset="UTF-8">
//     <title>Carrito</title>
//     <link rel="stylesheet" href="estilos/sCart.css">
//     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
//     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
// </head>
// <body>

import Logo from '../assets/titulo-encore.png'
import '../style/sCart.css'

function Carrito(){
    return(
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
        <header>
            <div class="logo">
                <img src={Logo} alt="Logo"/>
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

        <main class="cart-container">

            <h1 class="cart-title">
                <i class="fa-solid fa-cart-shopping"></i>
                CARRITO DE COMPRAS
            </h1>

            <div class="cart-content">

                <div class="cart-items">

                    <div class="cart-item">
                        <img src="https://shop.imaginedragonsmusic.com/cdn/shop/files/PRODUCT_IMDR_ECOMM_25_FIREINTHESEHILLS_HOODIE_ADULT_B.png?v=1763060643&width=1080" alt="Producto"/>

                        <div class="item-info">
                            <h3>System Of A Down</h3>
                            <p>T Shirt - Toxicity</p>
                            <p><strong>Status:</strong> In Stock</p>
                            <p><strong>Delivery:</strong> Arrives in 3-5 days</p>
                        </div>

                        <div class="item-quantity">
                            <button>-</button>
                            <span>2</span>
                            <button>+</button>
                        </div>

                        <div class="item-price">
                            $35.69
                        </div>
                    </div>

                    <div class="cart-item">
                        <img src="https://shop.conangray.com/cdn/shop/files/black-tee.png?v=1712610927" alt="Producto"/>

                        <div class="item-info">
                            <h3>Pink Floyd</h3>
                            <p>DSOTM 1973 Tour Shirt</p>
                            <p><strong>Status:</strong> In Stock</p>
                            <p><strong>Delivery:</strong> Arrives in 3-5 days</p>
                        </div>

                        <div class="item-quantity">
                            <button>-</button>
                            <span>1</span>
                            <button>+</button>
                        </div>

                        <div class="item-price">
                            $45.00
                        </div>
                    </div>

                </div>

                <div class="cart-summary">
                    <h3>Subtotal <span>$98.33</span></h3>
                    <p>Shipping calculated at checkout</p>

                    <button class="checkout-btn">
                        Checkout
                    </button>

                </div>

            </div>

        </main>
        </>
    )
}

export default Carrito