import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificarSesion } from '../../../services/usuariosService';
import Logo from '../assets/titulo-encore.png'
import '../style/sAdmin.css'
import { crearProducto } from '../../../services/productosService';
import {getArtistas} from '../../../services/artistasService';

function Admin(){
    const[producto, setProducto] = useState("");
    const[precio, setPrecio] = useState("");
    const[idArtista, setArtista] = useState("");
    const[tipo, setTipo] = useState("");
    const[descripcion, setDescripcion] = useState("");
    const[tallas, setTallas] = useState([]);
    const[imagen, setImagen] = useState("");

    const[mensajeVisible, setMensajeVisible] = useState("");
    const[campoError, setCampoError] = useState("");

    const[artistas, setArtistas] = useState([]);

    const fileInputeRef = useRef(null);

    useEffect(()=>{
        if(mensajeVisible){
            const timer = setTimeout(()=>{
                setMensajeVisible("");
            },2000);
            return()=>clearTimeout(timer);
        }
    },[mensajeVisible]);

    useEffect(() => {
        const fetchArtistas = async () => {
            const res = await getArtistas();
            setArtistas(res.data);
        };
        fetchArtistas();
    }, []);

    const handleTallas = (e) =>{
        const {value, checked} = e.target;
        if(checked){
            setTallas([...tallas, value]);
        }else{
            setTallas(tallas.filter((talla)=> talla != value));
        }
    };

    const handleGuardar=async(e)=>{
        e.preventDefault();

        const nuevoProducto = new FormData();
        nuevoProducto.append("producto", producto);
        nuevoProducto.append("precio", precio);
        nuevoProducto.append("id_artista", idArtista);
        nuevoProducto.append("tipo", tipo);
        nuevoProducto.append("tallas", JSON.stringify(tallas));
        nuevoProducto.append("descripcion", descripcion);
        nuevoProducto.append("imagen", imagen);

        const res = await crearProducto(nuevoProducto);
        console.log(res);

        if(res?.success){
            setProducto("");
            setPrecio("");
            setArtista("");
            setTipo("");
            setTallas([]);
            setDescripcion("");
            setImagen(null);

            if (fileInputeRef.current){
                fileInputeRef.current.value = "";
            }

        }
        //else{
        //     setMensajeVisible(res?.message);
        //     if(res?.message === " ")
        // }
    }

    const navigate = useNavigate();

    useEffect(() => {

        const revisarSesion = async () => {

            const res = await verificarSesion();

            if(!res?.success){

                navigate("/login", {
                    state: {
                        mensaje: "Debe iniciar sesión primero."
                    }
                });

            }else if(!res.user.isAdmin){
                navigate("/", {
                    state: {
                        mensaje: "No tiene acceso a esta sección."
                    }
                });
            }else{
                setUsuarioInfo(res.user);

            }


        };

        revisarSesion();

    }, []);

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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
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

            <div class="icons">
                <a href="/admin"><i className="fa-solid fa-gear"></i></a>
                <a href="/perfil"><i className="fa-solid fa-user"></i></a>
                <a href="/carrito"><i className="fa-solid fa-cart-shopping"></i></a>
            </div>
        </header>

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

                    <div class="input-group tallas-group" id="tallasGroup">
                        <label>Tallas disponibles</label>

                        <div class="tallas">
                            <label><input type="checkbox"value="S" checked={tallas.includes("S")} onChange={handleTallas}/> S</label>
                            <label><input type="checkbox" value="M" checked={tallas.includes("M")} onChange={handleTallas}/> M</label>
                            <label><input type="checkbox" value="L" checked={tallas.includes("L")} onChange={handleTallas}/> L</label>
                            <label><input type="checkbox" value="XL" checked={tallas.includes("XL")} onChange={handleTallas}/> XL</label>
                        </div>
                    </div>

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

        
        </>

        
    )
}

/* <script>
    const input = document.getElementById("imageInput");
    const preview = document.getElementById("preview");
    const tipo = document.getElementById("tipoProducto");
    const tallasGroup = document.getElementById("tallasGroup");

    input.addEventListener("change", () => {
        const file = input.files[0];
        if(file){
            preview.src = URL.createObjectURL(file);
            preview.style.display = "block";
        }
    });
</script> */

export default Admin