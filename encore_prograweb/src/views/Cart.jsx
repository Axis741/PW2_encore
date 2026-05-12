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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificarSesion } from '../../../services/usuariosService';
import Logo from '../assets/titulo-encore.png'
import '../style/sCart.css'

function Carrito(){
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

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

    }, []);
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

                    <button class="checkout-btn" onClick={() => setShowModal(true)}>
                        Proceder al Pago
                    </button>

                </div>

            </div>

            {showModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <button className='btnClose' onClick={() => setShowModal(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <h1>Pago con Tarjeta</h1>

                    <form>

                        <div className="input-group">
                            <label>Número de tarjeta</label>
                            <input 
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Nombre del titular</label>
                            <input 
                                type="text"
                                placeholder="Como aparece en la tarjeta"
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="input-group">
                                <label>Fecha de expiración</label>
                                <input 
                                    type="text"
                                    placeholder="MM/AA"
                                    maxLength="5"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>CVV</label>
                                <input 
                                    type="password"
                                    placeholder="123"
                                    maxLength="3"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-save">
                            Pagar
                        </button>
                    </form>
                </div>
            </div>
        )}

        </main>
        </>
    )
}

export default Carrito