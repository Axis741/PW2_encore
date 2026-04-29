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

import { useState, useEffect } from 'react'
import Logo from '../assets/titulo-encore.png'
import '../style/sArtistas.css'
import { crearArtista, getArtistas } from '../../../services/artistasService';

function Artistas(){

    const [showModal, setShowModal] = useState(false);

    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState(null);

    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        const fetchArtistas = async () => {
            const res = await getArtistas();
            setArtistas(res.data);
        };

        fetchArtistas();
    }, []);

    const handleGuardar = async (e) => {
        e.preventDefault();

        // const nuevoArtista = {
        //     nombre: nombre,
        //     imagen: preview
        // };
        const nuevoArtista = new FormData();
        nuevoArtista.append("nombre", nombre);
        nuevoArtista.append("imagen", imagen);

        const res = await crearArtista(nuevoArtista);
        console.log(res);

        setArtistas(prev => [...prev, res.data]);

        setNombre("");
        setPreview("");
        setImagen(null);

        setShowModal(false);
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

        <button className="btn_Add" onClick={() => setShowModal(true)}>+</button>

        {showModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <button className='btnClose' onClick={() => setShowModal(false)}>
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
                            <input type="file" name="imagen" accept="image/*" onChange={handleImageChange} required />
                        </div>

                        <div className="image-preview">
                            {preview && <img src={preview} alt='preview'></img>}
                        </div>

                        <button type="submit" className="btn-save">Guardar Artista</button>
                    </form>
                </div>
            </div>
        )}
        </>
    )
}

export default Artistas