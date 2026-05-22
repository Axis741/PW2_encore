import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArtistas } from '../../../services/artistasService';
import { verificarSesion } from '../../../services/usuariosService';
import { crearEvento, getEventos, updateEvento, deleteEvento } from '../../../services/eventosService';
import Logo from '../assets/titulo-encore.png'
import '../style/sEventos.css'

function Eventos(){
    const [artistas, setArtistas] = useState([]);
    const [idArtista, setIdArtista] = useState("");
    const [tour, setTour] = useState("");
    const [presentaciones, setPresentaciones] = useState("");
    const [imagen, setImagen] = useState(null);

    const [eventos, setEventos] = useState([]);

    const navigate = useNavigate();

    const [mensajeVisible, setMensajeVisible] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if(mensajeVisible){
            const timer = setTimeout(() => {
                setMensajeVisible("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    },[mensajeVisible]);

    //cargar artistas al combobox del modal
    useEffect(() => {
        const cargarArtistas = async () => {

            const res = await getArtistas();
            if(res?.success){
                setArtistas(res.data);
            }
        };
        cargarArtistas();
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

    //mostrar modals
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
 
    const [eventoSeleccionado, setEventoSeleccionado] = useState("");

    const handleSeleccionarEvento = (idEvento) => {
        setEventoSeleccionado(idEvento);

        const evento = eventos.find(
            (e) => e._id === idEvento
        );

        if(evento){
            setTour(evento.tour);
            setPresentaciones(evento.presentaciones);
            setIdArtista(evento.id_artista?._id);

            setPreview(`http://localhost:8080/uploads/${evento.imagen}`);
        }
    };

    //limpiar datos
    const limpiarDatos = () => {

        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }

        setPreview("");
        setEventoSeleccionado("");
        setIdArtista("");
        setTour("");
        setPresentaciones("");
        setImagen(null);

        setShowModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);

    };

    //guardar eventos
    const cargarEventos = async () => {
        const res = await getEventos();

        if(res?.success){
            setEventos(res.data);
        }
    };

    useEffect(() => {
        cargarEventos();
    }, []);

    const handleGuardarEvento = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("id_artista", idArtista);
        formData.append("tour", tour);
        formData.append("presentaciones", presentaciones);
        formData.append("imagen", imagen);

        const res = await crearEvento(formData);

        if(res?.success){
            setMensajeVisible("Evento aregado correctamente");
            setShowModal(false);

            limpiarDatos();

            cargarEventos();
        }else{
            setMensajeVisible(res?.message);
        }
    }

    const handleActualizarEvento = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("id_artista", idArtista);
        formData.append("tour", tour);
        formData.append("presentaciones", presentaciones);

        if(imagen){
            formData.append("imagen", imagen);
        }

        const res = await updateEvento(eventoSeleccionado, formData);

        if(res?.success){
            setMensajeVisible("Evento Actualizado");
            setShowEditModal(false);

            limpiarDatos();

            cargarEventos();
        }else{
            setMensajeVisible(res?.message);
        }
    };

    const handleEliminarEvento = async (e) => {
        e.preventDefault();

        const res = await deleteEvento(eventoSeleccionado);

        if(res?.success){
            setMensajeVisible("Evento Eliminado");
            setShowDeleteModal(false);

            limpiarDatos();

            cargarEventos();
        }else{
            setMensajeVisible(res?.message);
        }
    };

    //preview imagen
    const [preview, setPreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file.size);
        if(file){
            setPreview(URL.createObjectURL(file));
            setImagen(file);
        }
    };

    const [activeCard, setActiveCard] = useState(null);
    const toggleCard = (index) => {
        setActiveCard(activeCard === index ? null : index);
    }
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

        <section className="events-container">

            {eventos.map((evento, index) => (
                <div
                    key={evento._id}
                    className={`event-card ${activeCard === index ? 'active' : ''}`}
                    style={{
                        backgroundImage: `url(http://localhost:8080/uploads/${evento.imagen})`
                    }}
                    onClick={() => toggleCard(index)}
                >
                    <div className="event-info">
                        <h3>{evento.id_artista?.nombre}</h3>
                        <h1>{evento.tour}</h1>
                        <p>Haz click para ver fechas</p>
                    </div>

                    <div className="event-dates">
                        <h2>Fechas del Tour</h2>

                        <ul>
                            {evento.presentaciones
                                .split("\n")
                                .map((fecha, i) => (
                                    <li key={i}>{fecha}</li>
                            ))}
                        </ul>

                    </div>
                </div>
            ))}

        </section>

        <div className='adminContainer'>
            <button className="btn_Add" onClick={toggleAdminOptions}><i class="fa-solid fa-gear"></i></button>

            {showAdminOptions && (

                <div className="adminOptions">

                    <button className="adminOptionBtn" onClick={() => { setShowModal(true); setShowAdminOptions(false); }}>
                        <i className="fa-solid fa-plus"></i>Agregar Evento
                    </button>

                    <button className="adminOptionBtn" onClick={() => { setShowEditModal(true); setShowAdminOptions(false); }}>
                        <i className="fa-solid fa-pen"></i>
                        Actualizar Evento
                    </button>

                    <button className="adminOptionBtn delete" onClick={() => { setShowDeleteModal(true); setShowAdminOptions(false); }}>
                        <i className="fa-solid fa-trash"></i>
                        Eliminar Evento
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

                    <h1>Agregar Evento</h1>

                    <form onSubmit={handleGuardarEvento}>
                        <div className="input-group">
                            <label>Artista / Banda</label>
                            <select
                                value={idArtista}
                                onChange={(e) => setIdArtista(e.target.value)}
                                required
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
                            <label>Nombre del Tour</label>
                            <input type="text" placeholder="Ej. Coldplay World Tour" value={tour} onChange={(e) => setTour(e.target.value)} required />
                        </div>

                        <div className="input-group">
                            <label>Fechas</label>
                            <textarea placeholder='MX Monterrey - 15 de Junio 2026' value={presentaciones} onChange={(e) => setPresentaciones(e.target.value)} required/>
                        </div>

                        <div className="input-group">
                            <label>Imagen</label>
                            <input type="file" name="imagen" accept="image/*" onChange={handleImageChange} ref={fileInputRef} required />
                        </div>

                        <div className="image-preview">
                            {preview && <img src={preview} alt='preview'></img>}
                        </div>

                        <button type="submit" className="btn-save">Guardar Evento</button>
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

                    <h1>Editar Evento</h1>

                    <form onSubmit={handleActualizarEvento}>
                        <div className="input-group">
                            <label>Seleccionar Evento</label>
                            <select
                                value={eventoSeleccionado}
                                onChange={(e) =>
                                    handleSeleccionarEvento(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Selecciona un tour
                                </option>
                                {eventos.map((evento) => (

                                    <option
                                        key={evento._id}
                                        value={evento._id}
                                    >
                                        {evento.tour}
                                    </option>

                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Artista / Banda</label>

                            <select
                                value={idArtista}
                                onChange={(e) =>
                                    setIdArtista(e.target.value)
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
                            <label>Nombre del Tour</label>
                            <input type="text" placeholder="Ej. Coldplay World Tour" value={tour} onChange={(e) => setTour(e.target.value)}/>
                        </div>

                        <div className="input-group">
                            <label>Fechas</label>
                            <textarea placeholder='MX Monterrey - 15 de Junio 2026' value={presentaciones} onChange={(e) => setPresentaciones(e.target.value)}/>
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

                    <h1>Eliminar Evento</h1>

                    <form onSubmit={handleEliminarEvento}>
                        <div className="input-group">
                            <label>Seleccionar Evento</label>
                            <select
                                value={eventoSeleccionado}
                                onChange={(e) =>
                                    handleSeleccionarEvento(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Selecciona un tour
                                </option>
                                {eventos.map((evento) => (

                                    <option
                                        key={evento._id}
                                        value={evento._id}
                                    >
                                        {evento.tour}
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

export default Eventos