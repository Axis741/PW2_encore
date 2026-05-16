import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { verificarSesion, updateUsuario } from '../../../services/usuariosService';
import Logo from '../assets/titulo-encore.png'
import '../style/sEditarPerfil.css'

function EditarPerfil(){

    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const [usuarioInfo, setUsuarioInfo] = useState({});

    const [nuevoPassword, setNuevoPassword] = useState("");
    const [imagen, setImagen] = useState(null);

    const [mensajeVisible, setMensajeVisible] = useState("");
    const [campoError, setCampoError] = useState("");

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

    useEffect(() => {
        if(mensajeVisible){
            const timer = setTimeout(() => {
                setMensajeVisible("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    },[mensajeVisible]);
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setPreview(URL.createObjectURL(file));
            setImagen(file);
        }
    };

    const handleGuardarInfo = async () => {
        console.log(usuarioInfo);
        console.log(usuarioInfo.id || usuarioInfo._id);
        const formData = new FormData();

        formData.append("nombre", usuarioInfo.nombre);
        formData.append("usuario", usuarioInfo.usuario);
        formData.append("fecha_nac", usuarioInfo.fecha_nac);

        if(nuevoPassword.trim() !== ""){
            formData.append("contrasena", nuevoPassword);
        }

        if(imagen){
            formData.append("imagen", imagen);
        }

        const res = await updateUsuario(
            usuarioInfo.id || usuarioInfo._id,
            formData
        );

        if(res?.success){
            setMensajeVisible("Perfil actualizado");
            setNuevoPassword("");
            setUsuarioInfo(res.data);
            setCampoError("");
        }else{
            setMensajeVisible(res?.message);

            if(res?.message === "El usuario ya existe"){
                setCampoError("usuario");
            }else if(res?.message === "La contraseña debe tener minimo 8 caracteres, una mayúscula, un número y un carácter especial"){
                setCampoError("contrasena");
            }
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

        <section className="profile-container">

            <div className="profile-card">

                <div className="profile-left">
                    <h2>Editar imagen</h2>
                    <input type="file" accept="image/*" onChange={handleImageChange}/>

                    <div className="image-preview">
                        <img src={preview ? preview : `http://localhost:8080/uploads/${usuarioInfo?.imagen}`} alt='preview'></img>
                    </div>
                </div>

                <div className="profile-right">
                    <h3>Editar Información</h3>

                    <div className="info-item">
                        <span>Nombre</span>
                        <input type='text' value={usuarioInfo?.nombre || ""} onChange={(e) => setUsuarioInfo({...usuarioInfo, nombre: e.target.value})}></input>
                    </div>

                    <div className="info-item">
                        <span>Usuario</span>
                        <input type='text' value={usuarioInfo?.usuario || ""} onChange={(e) => {setUsuarioInfo({...usuarioInfo, usuario: e.target.value}); setCampoError("");}} className={campoError === "usuario" ? "inputError": ""}></input>
                    </div>

                    <div className="info-item">
                        <span>Fecha de Nacimiento</span>
                        <input type='date' value={usuarioInfo.fecha_nac?.split("T")[0] || ""} onChange={(e) => setUsuarioInfo({...usuarioInfo, fecha_nac: e.target.value})}></input>
                    </div>

                    <div className="info-item">
                        <span>Contraseña</span>
                        <input type='password' placeholder='Nueva Contraseña'  value={nuevoPassword} onChange={(e) => {setNuevoPassword(e.target.value); setCampoError("");}} className={campoError === "contrasena" ? "inputError": ""}></input>
                    </div>

                    <div className="buttons">
                        <button type="button" className="edit" onClick={handleGuardarInfo}>Guardar cambios</button>
                        <button className="btnRegresar" onClick={() => navigate("/perfil")}>Regresar</button>
                    </div>

                </div>

            </div>

        </section>
        </>
    )
}

export default EditarPerfil