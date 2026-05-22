import { useNavigate, useParams } from 'react-router-dom';
import { verificarSesion } from '../../../services/usuariosService';
import { getProductosById, getVariantesById } from '../../../services/productosService';
import { agregarItemCarrito } from '../../../services/carritoService';
import Logo from '../assets/titulo-encore.png'
import '../style/sProducto.css'
import { useState } from 'react';
import { useEffect } from 'react';

function Producto(){
    const {id} = useParams();
    const [producto, setProducto] = useState(null);
    const [variantes, setVariantes] = useState([]);
    const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [usuarioInfo, setUsuarioInfo] = useState(null);
    const [mensaje, setMensaje] = useState("");

    const navigate = useNavigate();

    const handleAgregarCarrito = async () => {

        const res = await verificarSesion();

        if(!res?.success){
            navigate("/login", {
                state: {
                    mensaje: "Debe iniciar sesión primero."
                }
            });
            return;
        }

        const usuario = res.user;

        // Validar variante
        if(variantes.length > 0 && !varianteSeleccionada){
            setMensaje("Seleccione una talla");
            return;
        }

        // Si el producto no tiene talla
        const varianteFinal =
            varianteSeleccionada || variantes[0];

        const carritoRes = await agregarItemCarrito(
            usuario.id,
            {
                id_variante: varianteFinal._id,
                cantidad
            }
        );

        if(carritoRes?.success){
            setMensaje("Producto agregado al carrito");
        }else{
            setMensaje(carritoRes?.message || "Error");
        }
    };

    useEffect(() => {
        const fetchProducto = async() => {
            const res = await getProductosById(id);
            if(res?.success){
                setProducto(res.data);
            }
        };
        fetchProducto();
    }, [id]);

    useEffect(() => {
        const fetchVariantes = async() => {
            const res = await getVariantesById(id);
            if(res?.success){
                setVariantes(res.data);
            }
        };
        fetchVariantes();
    }, [id]);

    useEffect(() => {
        if(variantes.length === 1){
            setVarianteSeleccionada(variantes[0]);
        }
    }, [variantes]);

    if(!producto){
        return <h1>Cargando...</h1>;
    }

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

    {mensaje && (
        <p className="mensajeNotify">
            {mensaje}
        </p>
    )}

    <main className="product-container">

        <div className="product-image">
            <img src={`http://localhost:8080/uploads/${producto.img_producto}`} alt={producto.nombre_producto}/>
        </div>

        <div className="product-info">
            <h1>{producto.nombre_producto}</h1>
            <h2>$ {producto.precio}</h2>

            <div className="sizes">
                <p>SIZE</p>
                <div className="size-options">
                    {variantes.map((variante) => (
                       <button
                            key={variante._id}
                            onClick={() => setVarianteSeleccionada(variante)}
                            className={
                                varianteSeleccionada?._id === variante._id
                                    ? "selected-size"
                                    : ""
                            }
                        >
                            {variante.talla || "Única"}
                        </button>
                    ))}
                </div>
            </div>

            <p><strong>Status:</strong> In Stock</p>
            <p><strong>Delivery:</strong> Arrives in 3-5 days</p>

            <div className="buy-section">
                <button className="add-cart" onClick={handleAgregarCarrito}>
                    <i className="fa-solid fa-cart-shopping"></i>
                </button>

                <div className="item-quantity">
                    <button
                        onClick={() =>
                            setCantidad((prev) => (prev > 1 ? prev - 1 : 1))
                        }
                    >
                        -
                    </button>

                    <span>{cantidad}</span>

                    <button
                        onClick={() => setCantidad((prev) => prev + 1)}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="description">
                <h3>Product Description</h3>
                <h4>{producto.descripcion}</h4>
                {/* <ul>
                    <li>100% Cotton</li>
                    <li>Crew Neck</li>
                    <li>Machine Wash</li>
                    <li>Regular Fit</li>
                    <li>Screen Print Design</li>
                </ul> */}
            </div>

        </div>

        </main>
        </>
    )
}

export default Producto
