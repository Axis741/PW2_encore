import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificarSesion } from '../../../services/usuariosService';
import { getTotalesTablas, getVentasGeneral, getVentasPorArtista } from '../../../services/reportesService';
import Logo from '../assets/titulo-encore.png'
import '../style/sAdmin.css'

function Admin(){

    const navigate = useNavigate();

    const [totales, setTotales] = useState({
        totalArtistas: 0,
        totalProductos: 0,
        totalVentas: 0,
        totalIngresos: 0
    });

    const [ventasGenerales, setVentasGenerales] = useState([]);
    const [ventasArtistas, setVentasArtistas] = useState([]);

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
            }

        };

        revisarSesion();

    }, []);

    const fetchTotalesTablas = async () => {
        const res = await getTotalesTablas();

        if(res?.success){
            setTotales(res.data);
        }
    };

    const fetchVentasGenerales = async () => {
        const res = await getVentasGeneral();
        if(res?.success){
            setVentasGenerales(res.data);
        }
    };

    const fetchVentasPorArtista = async () => {
        const res = await getVentasPorArtista();
        if(res?.success){
            setVentasArtistas(res.data);
        }
    };

    useEffect(() => {
        fetchTotalesTablas();
        fetchVentasGenerales();
        fetchVentasPorArtista();
    }, []);

    const ropa = ventasGenerales.find((v) => v.tipo === "ropa");
    const accesorios = ventasGenerales.find((v) => v.tipo === "accesorios");
    const discos = ventasGenerales.find((v) => v.tipo === "discos");
    const lightstick = ventasGenerales.find((v) => v.tipo === "lightstick");
    const otro = ventasGenerales.find((v) => v.tipo === "otro");

    console.log(ventasGenerales);

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

            <div className="icons">
                <a href="/admin"><i className="fa-solid fa-gear"></i></a>
                <a href="/perfil"><i className="fa-solid fa-user"></i></a>
                <a href="/carrito"><i className="fa-solid fa-cart-shopping"></i></a>
            </div>
        </header>

        <section className="dashboardContainer">

            <div className="dashboardHeader">
                <div className='dashboardSpaceH'>
                    <h1>Reportes</h1>
                    <p>Estadísticas generales de Encore Merch</p>
                </div>
            </div>

            <div className="statsCards">

                <div className="glassCard">
                    <div className="cardIcon purple">
                        <i className="fa-solid fa-dollar-sign"></i>
                    </div>

                    <div>
                        <h2>${totales.totalIngresos}</h2>
                        <span>Ingresos Totales</span>
                    </div>
                </div>

                <div className="glassCard">
                    <div className="cardIcon blue">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>

                    <div>
                        <h2>{totales.totalVentas}</h2>
                        <span>Ventas</span>
                    </div>
                </div>

                <div className="glassCard">
                    <div className="cardIcon yellow">
                        <i className="fa-solid fa-boxes-stacked"></i>
                    </div>

                    <div>
                        <h2>{totales.totalProductos}</h2>
                        <span>Productos</span>
                    </div>
                </div>

                <div className="glassCard">
                    <div className="cardIcon pink">
                        <i className="fa-solid fa-users"></i>
                    </div>

                    <div>
                        <h2>{totales.totalArtistas}</h2>
                        <span>Artistas</span>
                    </div>
                </div>

            </div>

            <div className="dashboardGrid">

                <div className="chartCard">

                    <div className="cardHeader">
                        <h2>Ventas Generales</h2>
                    </div>

                <div className="chartWrapper">

                        <div className="chartScale">
                            <span>100%</span>
                            <span>75%</span>
                            <span>50%</span>
                            <span>25%</span>
                            <span>0%</span>
                        </div>

                        <div className="fakeChart">

                            <div className="barContainer">
                                <div className='barArea'>
                                    <span className="barValue">${ropa?.valorVendido || 0}</span>
                                    <div className="bar" style={{height: `${ropa?.porcentaje || 0}%`}}></div>
                                </div>
                                <span className="barLabel">Ropa</span>
                            </div>

                            <div className="barContainer">
                                <div className='barArea'>
                                    <span className="barValue">${accesorios?.valorVendido || 0}</span>
                                    <div className="bar" style={{height: `${accesorios?.porcentaje || 0}%`}}></div>
                                </div>
                                <span className="barLabel">Accesorios</span>
                            </div>

                            <div className="barContainer">
                                <div className='barArea'>
                                    <span className="barValue">${discos?.valorVendido || 0}</span>
                                    <div className="bar" style={{height: `${discos?.porcentaje || 0}%`}}></div>
                                </div>
                                <span className="barLabel">Discos</span>
                            </div>

                            <div className="barContainer">
                                <div className='barArea'>
                                    <span className="barValue">${lightstick?.valorVendido || 0}</span>
                                    <div className="bar" style={{height: `${lightstick?.porcentaje || 0}%`}}></div>
                                </div>
                                <span className="barLabel">Lightstick</span>
                            </div>

                            <div className="barContainer">
                                <div className='barArea'>
                                    <span className="barValue">${otro?.valorVendido || 0}</span>
                                    <div className="bar" style={{height: `${otro?.porcentaje || 0}%`}}></div>
                                </div>
                                <span className="barLabel">Otro</span>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="topArtistsCard">

                    <h2>Ventas p/ Artistas</h2>

                    {
                        ventasArtistas.map((artista) => (

                            <div
                                className="topArtist"
                                key={artista._id}
                            >
                               <img
                                    src={`http://localhost:8080/uploads/${artista.imagenArtista}`}
                                    alt=""
                                />

                                <div>
                                    <h3>{artista.nombreArtista}</h3>
                                    <p>${artista.totalVentas} vendidos</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

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