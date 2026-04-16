// <!DOCTYPE html>
// <html lang="es">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>Eventos</title>
// <link rel="stylesheet" href="estilos/sEventos.css">
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
// </head>
// <body>

import { useState } from 'react';
import Logo from '../assets/titulo-encore.png'
import '../style/sEventos.css'

function Eventos(){
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

        
        </>
    )
}

export default Eventos

/* <script>
        const cards = document.querySelectorAll('.event-card');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                card.classNameList.toggle('active');
            });
        });
        </script> */
