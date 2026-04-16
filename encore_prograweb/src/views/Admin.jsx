// <!DOCTYPE html>
// <html lang="es">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>Admin - Subir Producto</title>

// <link rel="stylesheet" href="estilos/sAdmin.css">
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

// </head>
// <body>
import { useState, useEffect } from 'react';
import Logo from '../assets/titulo-encore.png'
import '../style/sAdmin.css'

function Admin(){
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
    return(
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
        <header>
            <div class="logo">
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

                <form id="productForm">

                    <div class="input-group">
                        <label>Nombre del producto</label>
                        <input type="text" placeholder="Ej. Playera BTS" required/>
                    </div>

                    <div class="input-group">
                        <label>Precio</label>
                        <input type="number" placeholder="$ MXN" required/>
                    </div>

                    <div class="input-group">
                        <label>Artista / Banda</label>
                        <input type="text" placeholder="Ej. BTS" required/>
                    </div>

                    <div class="input-group">
                        <label>Tipo de producto</label>
                        <input type="text" placeholder="Ej. Hoddie" required/>
                    </div>

                    <div class="input-group">
                        <label>Descripción</label>
                        <textarea placeholder="Describe el producto..." required></textarea>
                    </div>

                    <div class="input-group tallas-group" id="tallasGroup">
                        <label>Tallas disponibles</label>

                        <div class="tallas">
                            <label><input type="checkbox" value="S"/> S</label>
                            <label><input type="checkbox" value="M"/> M</label>
                            <label><input type="checkbox" value="L"/> L</label>
                            <label><input type="checkbox" value="XL"/> XL</label>
                        </div>
                    </div>

                    <div class="input-group">
                        <label>Imagen del producto</label>
                        <input type="file" id="imageInput" accept="image/*" required/>
                    </div>

                    <div class="image-preview">
                        <img id="preview" src="" alt=""/>
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