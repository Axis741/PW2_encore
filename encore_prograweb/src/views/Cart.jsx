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
import { getCarritoByUsuario, actualizarCantidadItem, eliminarItemCarrito } from '../../../services/carritoService';
import { confirmarOrden } from '../../../services/ordenesService';
import Logo from '../assets/titulo-encore.png'
import '../style/sCart.css'

function Carrito(){
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [usuarioInfo, setUsuarioInfo] = useState(null);
    const [carrito, setCarrito] = useState(null);
    const [loading, setLoading] = useState(true);
    const [procesandoPago, setProcesandoPago] = useState(false);

    const [mensajeVisible, setMensajeVisible] = useState("");

    useEffect(() => {
        if(mensajeVisible){
            const timer = setTimeout(() => {
                setMensajeVisible("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    },[mensajeVisible]);

    const fetchCarrito = async (userId) => {

        const carritoRes = await getCarritoByUsuario(userId);

        if(carritoRes?.success){
            setCarrito(carritoRes.data);
        }

    };

    useEffect(() => {

        const revisarSesion = async () => {

            const res = await verificarSesion();

            if(!res?.success){

                navigate("/login", {
                    state: {
                        mensaje: "Debe iniciar sesión primero."
                    }
                });

                return;
            }

            setUsuarioInfo(res.user);

            await fetchCarrito(res.user.id);

            setLoading(false);

        };

        revisarSesion();

    }, []);

    const actualizarCantidad = async (
        id_variante,
        nuevaCantidad
    ) => {

        if(nuevaCantidad < 1) return;

        const res = await actualizarCantidadItem(
            usuarioInfo.id,
            id_variante,
            nuevaCantidad
        );

        if(res?.success){
            setLoading(true);
            await fetchCarrito(usuarioInfo.id);
            setLoading(false);
        }
    };

    const eliminarProducto = async (id_variante) => {

        const res = await eliminarItemCarrito(
            usuarioInfo.id,
            id_variante
        );

        if(res?.success){
            setLoading(true);
            await fetchCarrito(usuarioInfo.id);
            setLoading(false);
        }
    };

    const handlePagar = async (e) => {

        e.preventDefault();

        try{

            setProcesandoPago(true);

            const res = await confirmarOrden(
                usuarioInfo.id
            );

            if(res?.success){

                setMensajeVisible("Compra realizada correctamente");

                setShowModal(false);

                await fetchCarrito(usuarioInfo.id);

            }else{
                setMensajeVisible(res?.message || "Error al procesar la compra");
            }

        }catch(error){

            console.error(error);
            setMensajeVisible("Error al procesar el pago");
            
        }finally{

            setProcesandoPago(false);

        }

    };

    const subtotal = carrito?.items?.reduce(
        (acc, item) => {

            const precio =
                item.id_variante?.id_producto?.precio || 0;

            return acc + (precio * item.cantidad);

        },
        0
    );

    if(loading){
        return <h1>Cargando carrito...</h1>;
    }

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

        {mensajeVisible && <p className='mensajeNotify'>{mensajeVisible}</p>}

        <main class="cart-container">

            <h1 class="cart-title">
                <i class="fa-solid fa-cart-shopping"></i>
                CARRITO DE COMPRAS
            </h1>

            <div className="cart-content">

                <div className="cart-items">

                    {carrito?.items?.length > 0 ? (

                        carrito.items.map((item) => {

                            const producto = item.id_variante?.id_producto;

                            return(

                                <div className="cart-item" key={item._id}>

                                    <img
                                        src={`http://localhost:8080/uploads/${producto.img_producto}`}
                                        alt={producto.nombre_producto}
                                    />

                                    <div className="item-info">

                                        <p>
                                            {producto.nombre_producto}
                                        </p>

                                        {item.id_variante?.talla && (
                                            <p>
                                                <strong>Talla:</strong>
                                                {" "}
                                                {item.id_variante.talla}
                                            </p>
                                        )}

                                        <p>
                                            <strong>Status:</strong>
                                            {" "}
                                            In Stock
                                        </p>

                                        <p>
                                            <strong>Delivery:</strong>
                                            {" "}
                                            Arrives in 3-5 days
                                        </p>

                                    </div>

                                    <div className="item-quantity">

                                        <button
                                            onClick={() =>
                                                actualizarCantidad(
                                                    item.id_variante._id,
                                                    item.cantidad - 1
                                                )
                                            }
                                        >
                                            -
                                        </button>

                                        <span>{item.cantidad}</span>

                                        <button
                                            onClick={() =>
                                                actualizarCantidad(
                                                    item.id_variante._id,
                                                    item.cantidad + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                    <div className="item-price">

                                        $
                                        {(
                                            producto.precio *
                                            item.cantidad
                                        ).toFixed(2)}

                                        <button
                                            className="btn-delete"
                                            onClick={() =>
                                                eliminarProducto(
                                                    item.id_variante._id
                                                )
                                            }
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>

                                    </div>

                                </div>
                            );
                        })

                    ) : (
                        <h2>Tu carrito está vacío</h2>
                    )}

                </div>

                <div className="cart-summary">

                    <h3>
                        Subtotal
                        <span>
                            ${subtotal?.toFixed(2)}
                        </span>
                    </h3>

                    <p>Shipping calculated at checkout</p>

                    <button
                        className="checkout-btn"
                        disabled={!carrito?.items?.length}
                        onClick={() => setShowModal(true)}
                    >
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

                    <form onSubmit={handlePagar}>

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

                        <button
                            type="submit"
                            className="btn-save"
                            disabled={procesandoPago}
                        >
                            {
                                procesandoPago
                                    ? "Procesando..."
                                    : "Pagar"
                            }
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