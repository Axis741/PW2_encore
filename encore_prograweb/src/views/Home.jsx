import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/titulo-encore.png'
import '../style/sHome.css'
import { getProductos, crearProducto } from '../../../services/productosService';
import {getArtistas} from '../../../services/artistasService';
import { verificarSesion } from '../../../services/usuariosService';
//import { verificarSesion } from '../../../controllers/users_controller';

function Home() {
    const[producto, setProducto] = useState("");
    const[precio, setPrecio] = useState("");
    const[idArtista, setArtista] = useState("");
    const[tipo, setTipo] = useState("");
    const[descripcion, setDescripcion] = useState("");
    const[tallas, setTallas] = useState([]);
    const [stockTallas, setStockTallas] = useState({});
    const [stock, setStock] = useState("");
    const[imagen, setImagen] = useState("");

    const[artistas, setArtistas] = useState([]);

    const [mensajeVisible, setMensajeVisible] = useState("");
    const [productos, setProductos] = useState([]);

     const fileInputeRef = useRef(null);
    
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

        //filtro por artista
        const artistaFiltro = location.state?.artistaFiltro;

        //Aqui le cambie para el filtro --  ASEGURATE DE BORRAR ESTE COMENTARIO DESPUES
        useEffect(() => {
            const fetchProductos = async() => {
                const res = await getProductos();

                if(res?.success){
                    let productosFiltrados = res.data;

                    if(artistaFiltro){
                        productosFiltrados = res.data.filter(
                            (producto) => producto.id_artista?._id === artistaFiltro
                        );
                    }
                    setProductos(productosFiltrados);
                }
            };

            fetchProductos();
        }, [artistaFiltro]);

         useEffect(() => {
        const fetchArtistas = async () => {
            const res = await getArtistas();
            setArtistas(res.data);
        };
        fetchArtistas();
    }, []);

    useEffect(() => {
        if(tipo !== "ropa"){
            setTallas([]);
            setStockTallas({});
        }
    }, [tipo]);

    const handleTallas = (e) =>{
        const {value, checked} = e.target;
        if(checked){
            setTallas([...tallas, value]);
        }else{
            setTallas(tallas.filter((t)=> t != value));
        }
    };

    const handleStockTalla = (talla, value) =>{
        setStockTallas(prev => ({
            ...prev,
            [talla]: value
        }));
    };

    //MODAL DE OPCIONES
    const [showAdminOptions, setShowAdminOptions] = useState(false);
    const toggleAdminOptions = async() => {
        const res = await verificarSesion();

        if(!res?.success){
            navigate("/login", {
                state: {
                    mensaje: "Debe Iniciar sesión primero."
                }
            });
            return;
        }
        if(!res.user.isAdmin){
            setMensajeVisible("No tiene permiso para acceder");
            return;
        }
        setShowAdminOptions(!showAdminOptions);
    };

    //DECLARAR MODAL
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModale, setShowDeleteModal] = useState(false);

    const limpiarDatos = () =>{
        if (fileInputeRef.current){
            fileInputeRef.current.value = "";
        }

        setProducto("");
        setPrecio("");
        setArtista("");
        setTipo("");
        setTallas([]);
        setDescripcion("");
        setImagen(null);

        setShowModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
    }

    const handleGuardar=async(e)=>{
        e.preventDefault();

        const variantes = tallas.map((talla) => ({
            talla,
            stock: stockTallas[talla] || 0
        }));

        console.log("TALLAS:", tallas);

        console.log(
            "VARIANTES:",
            variantes
        );

        const nuevoProducto = new FormData();
        nuevoProducto.append("producto", producto);
        nuevoProducto.append("precio", precio);
        nuevoProducto.append("id_artista", idArtista);
        nuevoProducto.append("tipo", tipo);
        //nuevoProducto.append("talla", JSON.stringify(tallas));
        if(tipo === "ropa"){
            nuevoProducto.append("variantes", JSON.stringify(variantes));
        }
        nuevoProducto.append("stock", stock);
        nuevoProducto.append("descripcion", descripcion);
        nuevoProducto.append("imagen", imagen);

        const res = await crearProducto(nuevoProducto);
        console.log(res);

        if(res?.success){
            setMensajeVisible("Producto agregado correctamente");
            setArtistas(prev => [...prev, res.data]);

            limpiarDatos();
            fetchProductos();
        }else{
            setMensajeVisible(res?.message);
        }
    }

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
            {productos.map((producto) => (
                <div className='card' key={producto._id} onClick={() => navigate(`/producto/${producto._id}`)}>
                    <img src={`http://localhost:8080/uploads/${producto.img_producto}`} alt={producto.nombre_producto}/>
                </div>
                // <a href="/producto" className="card"><img src={`http://localhost:8080/uploads/${producto.img_producto}`} alt={producto.nombre_producto}/></a>
            ))}
        </main>

        <div className='adminContainer'>
            <button className='btn_Add' onClick={toggleAdminOptions}><i class='fa-solid fa-gear'></i></button>
            {showAdminOptions && (
                <div className='adminOptions'>
                    <button className='adminOptionsBtn' onClick={() => {setShowModal(true); setShowAdminOptions(false); }}>
                        <i className='fa-solid fa-plus'></i>Subir Producto
                    </button>

                    <button className='adminOptionsBtn' onClick={() => {setShowEditModal(true); setShowAdminOptions(false); }}>
                        <i className='fa-solid fa-pen'></i>Actualizar Producto
                    </button>

                    <button className='adminOptionsBtn' onClick={() => {setShowDeleteModal(true); setShowAdminOptions(false); }}>
                        <i className='fa-solid fa-trash'></i>Eliminar Producto
                    </button>
                </div>
            )}
        </div>

    {showModal && (

        <section class="admin-container">

            <div class="admin-card">

                <h1>Subir Producto</h1>

                <form id="productForm" onSubmit={handleGuardar}>

                    <div class="input-group">
                        <label>Nombre del producto</label>
                        <input type="text" placeholder="Ej. Playera BTS" value={producto} onChange={(e) => setProducto(e.target.value)} required/>
                    </div>

                    <div class="input-group">
                        <label>Precio</label>
                        <input type="number" placeholder="$ MXN" value={precio} onChange={(e) => setPrecio(e.target.value)} required/>
                    </div>

                    <div class="input-group">
                        <label>Artista / Banda</label>
                        <select value={idArtista} onChange={(e) => setArtista(e.target.value)} required>
                            <option value="">Selecciona un artista</option>
                            {artistas.map((artista) => (
                                <option key={artista._id} value={artista._id}>{artista.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div class="input-group">
                        <label>Tipo de producto</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                            <option value="">Selecciona el tipo</option>
                            <option value="ropa">Ropa</option>
                            <option value="accesorios">Accesorios</option>
                            <option value="discos">Discos</option>
                            <option value="lightstick">Lightstick</option>
                            <option value="otro">Otro</option>
                        </select>
                        {/* <input type="text" placeholder="Ej. Hoddie" value={tipo} onChange={(e) => setTipo(e.target.value)} required/> */}
                    </div>

                    <div class="input-group">
                        <label>Descripción</label>
                        <textarea placeholder="Describe el producto..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
                    </div>
                    {tipo !== "ropa" && (
                        <div className="input-group">
                            <label>Stock disponible</label>
                            <input type="number" placeholder="Cantidad disponible" min="0" value={stock} onChange={(e) => setStock(e.target.value)} required/>
                        </div>
                    )}

                    {tipo === "ropa" && (

                        <div className="input-group tallas-group">
                            <label>Tallas disponibles</label>
                            <div className="tallas">
                                {["S", "M", "L", "XL"].map((talla) => (
                                    <div key={talla} className="talla-item">
                                        <label className="talla-checkbox">
                                            <input type="checkbox" value={talla} checked={tallas.includes(talla)} onChange={handleTallas}/>
                                            {talla}
                                        </label>
                                        {tallas.includes(talla) && (
                                            <input type="number" min="0" placeholder={`Stock ${talla}`} className="stock-talla-input" value={stockTallas[talla] || ""}
                                                onChange={(e) =>
                                                    handleStockTalla(talla, e.target.value)
                                                }
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div class="input-group">
                        <label>Imagen del producto</label>
                        <input type="file" name="imagen" accept="image/*" onChange={handleImageChange} ref={fileInputeRef} required/>
                    </div>

                    <div class="image-preview">
                        {preview && <img src={preview} alt='preview'></img>}
                    </div>

                    <button type="submit" className="btn_subir">Subir Producto</button>

                </form>

            </div>

        </section>
    )}
    
    </>
    )
}

export default Home
    
    
// </body>
// </html>