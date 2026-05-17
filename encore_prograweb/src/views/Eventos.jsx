import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArtistas } from '../../../services/artistasService';
import { verificarSesion } from '../../../services/usuariosService';
import Logo from '../assets/titulo-encore.png'
import '../style/sEventos.css'

function Eventos(){
    const [artistas, setArtistas] = useState([]);
    const [idArtista, setIdArtista] = useState("");

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

    //mostrar modal de agregar eventos
    const [showModal, setShowModal] = useState(false);

    const verificarAdmin = () => {
        const revisarSesion = async () => {
            const res = await verificarSesion();

            if(!res?.success){
                navigate("/login", {
                    state: {
                        mensaje: "Debe iniciar sesión primero."
                    }
                });
            }else{
                if(res.user.isAdmin){
                    setShowModal(true);
                }else{
                    setMensajeVisible("No tiene permiso para acceder a esta sección");
                }
            }
        };

        revisarSesion();
    }

    const [preview, setPreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file.size);
        if(file){
            setPreview(URL.createObjectURL(file));
            //setImagen(file);
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
            <div className={`event-card coldplay ${activeCard === 0 ? 'active':''}`} style={{ backgroundImage: "url('https://i.scdn.co/image/ab6761610000e5eb1ba8fc5f5c73e7e9313cc6eb')" }} onClick={() => toggleCard(0)}>
                <div className="event-info">
                    <h3>COLDPLAY</h3>
                    <h1>COLDPLAY WORLD TOUR</h1>
                    <p>Haz click para ver fechas</p>
                </div>

                <div className="event-dates">
                    <h2>Fechas del Tour</h2>
                    <ul>
                        <li>🇺🇸 USA - 15 Marzo 2026</li>
                        <li>🇲🇽 México - 22 Marzo 2026</li>
                        <li>🇧🇷 Brasil - 30 Marzo 2026</li>
                        <li>🇫🇷 Francia - 12 Abril 2026</li>
                        <li>🇯🇵 Japón - 20 Abril 2026</li>
                    </ul>
                </div>
            </div>
            <div className={`event-card bts ${activeCard === 1 ? 'active' : ''}`} style={{ backgroundImage: "url('https://www.eluniversal.com.mx/resizer/v2/TS5M67OSANHTVB5HKLKQ4R2XLA.jpg?auth=1de1c7b2b3e4a343c48f3f4f8b15093944c676454c9a8d028c4f31e7c666cd68&smart=true&height=666')" }} onClick={() => toggleCard(1)}>
                <div className="event-info">
                    <h3>BTS</h3>
                    <h1>BTS WORLD TOUR</h1>
                    <p>Haz click para ver fechas</p>
                </div>

                <div className="event-dates">
                    <h2>Fechas del Tour</h2>
                    <ul>
                        <li>🇰🇷 Corea - 10 Febrero 2026</li>
                        <li>🇹🇭 Tailandia - 18 Febrero 2026</li>
                        <li>🇸🇬 Singapur - 25 Febrero 2026</li>
                        <li>🇩🇪 Alemania - 15 Marzo 2026</li>
                    </ul>
                </div>
            </div>

        </section>

        <button className="btn_Add" onClick={verificarAdmin}>+</button>

        {showModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <button className='btnClose' onClick={() => {setShowModal(false); if(fileInputRef) fileInputRef.current.value = ""; setPreview(""); }}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <h1>Agregar Evento</h1>

                    <form>
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
                            <input type="text" placeholder="Ej. Coldplay World Tour" required />
                        </div>

                        <div className="input-group">
                            <label>Fechas</label>
                            <textarea placeholder='MX Monterrey - 15 de Junio 2026' required/>
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
        
        </>
    )
}

export default Eventos