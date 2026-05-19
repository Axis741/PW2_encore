// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Home</title>
//     <link rel="stylesheet" href="estilos/sArtistas.css">
//     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
//     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
// </head>
// <body>

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { verificarSesion } from '../../../services/usuariosService';
import Logo from '../assets/titulo-encore.png'
import '../style/sArtistas.css'
import { crearArtista, deleteArtista, getArtistas, updateArtista } from '../../../services/artistasService';

function Artistas(){

    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState(null);

    const [artistas, setArtistas] = useState([]);

    const [mensajeVisible, setMensajeVisible] = useState("");
    const fileInputRef = useRef(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        if(mensajeVisible){
            const timer = setTimeout(() => {
                setMensajeVisible("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    },[mensajeVisible]);

    const fetchArtistas = async () => {
        const res = await getArtistas();
        if(res?.success){
            setArtistas(res.data);
        }
    };

    useEffect(() => {
        fetchArtistas();
    }, []);

    //mostrar modal de opciones Admin
    const [showAdminOptions, setShowAdminOptions] = useState(false);

    const toggleAdminOptions = async () => {
        const res = await verificarSesion();

        if(!res?.success){
            navigate("/login", {
                state: {
                    mensaje: "Debe iniciar sesión primero."
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

    //declaracion de modals de agregar, actualizar y eliminar
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [artistaSeleccionado, setArtistaSeleccionado] = useState("");

    const handleSeleccionarArtista = (idArtista) => {
        setArtistaSeleccionado(idArtista);

        const artista = artistas.find(
            (e) => e._id === idArtista
        );

        if(artista){
            setNombre(artista.nombre);
            setPreview(`http://localhost:8080/uploads/${artista.foto}`);
        }
    };

     //limpiar datos
    const limpiarDatos = () => {

        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }

        setPreview("");
        setArtistaSeleccionado("");
        //setIdArtista("");
        setNombre("");
        setImagen(null);

        setShowModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);

    };

    const handleGuardar = async (e) => {
        e.preventDefault();

        const nuevoArtista = new FormData();
        nuevoArtista.append("nombre", nombre);
        nuevoArtista.append("imagen", imagen);

        const res = await crearArtista(nuevoArtista);
        console.log(res);

        if(res?.success){
            setMensajeVisible("Artista agregado correctamente");
            setArtistas(prev => [...prev, res.data]);

            limpiarDatos();

            fetchArtistas();
        }else{
            setMensajeVisible(res?.message);
        }
        
    }

    const handleActualizarArtista = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("nombre", nombre);

        if(imagen){
            formData.append("imagen", imagen);
        }

        const res = await updateArtista(artistaSeleccionado, formData);

        if(res?.success){
            setShowEditModal(false);

            limpiarDatos();

            setMensajeVisible("Artista Actualizado correctamente");


            fetchArtistas();
        }else{
            setMensajeVisible(res?.message);
        }
    };

    const handleEliminarArtista = async (e) => {
        e.preventDefault();

        const res = await deleteArtista(artistaSeleccionado);

        if(res?.success){
            setShowDeleteModal(false);

            limpiarDatos();

            setMensajeVisible("Artista eliminado correctamente");

            fetchArtistas();
        }else{
            setMensajeVisible(res?.message);
        }
    };

    const [preview, setPreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file.size);
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

        {mensajeVisible && <p className='mensajeNotify'>{mensajeVisible}</p>}

        <section className="search-section">
            <div className="search-box">
                <input type="text" placeholder="Buscar..."/>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </section>

        <main className="artists">
            {artistas.map((artista) => (
                <a href="#" className="artist-card" key={artista._id}>
                    <img 
                        src={`http://localhost:8080/uploads/${artista.foto}`} 
                        alt={artista.nombre}
                    />
                    <p>{artista.nombre}</p>
                </a>
            ))}
        </main>

        {/* <button className="btn_Add" onClick={verificarAdmin}>+</button> */}

        <div className='adminContainer'>
            <button className="btn_Add" onClick={toggleAdminOptions}><i class="fa-solid fa-gear"></i></button>

            {showAdminOptions && (

                <div className="adminOptions">

                    <button className="adminOptionBtn" onClick={() => { setShowModal(true); setShowAdminOptions(false); }}>
                        <i className="fa-solid fa-plus"></i>Agregar Artista
                    </button>

                    <button className="adminOptionBtn" onClick={() => {setShowEditModal(true); setShowAdminOptions(false); }}>
                        <i className="fa-solid fa-pen"></i>
                        Actualizar Artista
                    </button>

                    <button className="adminOptionBtn delete" onClick={() => {setShowDeleteModal(true); setShowAdminOptions(false); }} >
                        <i className="fa-solid fa-trash"></i>
                        Eliminar Artista
                    </button>

                </div>
            )}

        </div>

        {showModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <button className='btnClose' onClick={limpiarDatos}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <h1>Agregar Artista</h1>

                    <form onSubmit={handleGuardar}>
                        <div className="input-group">
                            <label>Nombre del artista / banda</label>
                            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </div>

                        <div className="input-group">
                            <label>Imagen</label>
                            <input type="file" name="imagen" accept="image/*" onChange={handleImageChange} ref={fileInputRef} required />
                        </div>

                        <div className="image-preview">
                            {preview && <img src={preview} alt='preview'></img>}
                        </div>

                        <button type="submit" className="btn-save">Guardar Artista</button>
                    </form>
                </div>
            </div>
        )}

        {showEditModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <button className='btnClose' onClick={limpiarDatos}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <h1>Editar Artista</h1>

                    <form onSubmit={handleActualizarArtista}>
                        <div className="input-group">
                            <label>Seleccionar Artista</label>
                            <select
                                value={artistaSeleccionado}
                                onChange={(e) =>
                                    handleSeleccionarArtista(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Selecciona un artista
                                </option>
                                {artistas.map((artista) => (

                                    <option
                                        key={artista._id}
                                        value={artista._id}
                                    >
                                        {artista.nombre}
                                    </option>

                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Nombre</label>
                            <input type="text" placeholder="Ej. Taylor Swift" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                        </div>

                        <div className="input-group">
                            <label>Imagen</label>
                            <input type="file" name="imagen" accept="image/*" onChange={handleImageChange} ref={fileInputRef}/>
                        </div>

                        <div className="image-preview">
                            {preview && <img src={preview} alt='preview'></img>}
                        </div>

                        <button type="submit" className="btn-save">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        )}

        {showDeleteModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <button className='btnClose' onClick={limpiarDatos}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <h1>Eliminar Artista</h1>

                    <form onSubmit={handleEliminarArtista}>
                        <div className="input-group">
                            <label>Seleccionar Artista</label>
                            <select
                                value={artistaSeleccionado}
                                onChange={(e) =>
                                    handleSeleccionarArtista(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Selecciona un artista
                                </option>
                                {artistas.map((artista) => (

                                    <option
                                        key={artista._id}
                                        value={artista._id}
                                    >
                                        {artista.nombre}
                                    </option>

                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn-save">Eliminar Evento</button>
                    </form>
                </div>
            </div>
        )}
        </>
    )
}

export default Artistas