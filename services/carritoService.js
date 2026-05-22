// GET ALL CARTS
export const getCarritos = async () => {
    try {
        const res = await fetch('http://localhost:8080/api/carrito');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error al traer carritos:', error);
    }
};


// GET CART BY USER
export const getCarritoByUsuario = async (id_usuario) => {
    try {
        const res = await fetch(`http://localhost:8080/api/carrito/${id_usuario}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error al traer carrito del usuario:', error);
    }
};


// CREATE CART
export const crearCarrito = async (carritoData) => {
    try {
        const res = await fetch('http://localhost:8080/api/carrito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carritoData)
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Error al crear carrito:', error);
    }
};


// ADD ITEM TO CART
export const agregarItemCarrito = async (id_usuario, itemData) => {
    try {
        const res = await fetch(`http://localhost:8080/api/carrito/${id_usuario}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Error al agregar item al carrito:', error);
    }
};


// UPDATE ITEM QUANTITY
export const actualizarCantidadItem = async (
    id_usuario,
    id_variante,
    cantidad
) => {
    try {
        const res = await fetch(
            `http://localhost:8080/api/carrito/${id_usuario}/items/${id_variante}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cantidad })
            }
        );

        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
    }
};


// DELETE ITEM FROM CART
export const eliminarItemCarrito = async (
    id_usuario,
    id_variante
) => {
    try {
        const res = await fetch(
            `http://localhost:8080/api/carrito/${id_usuario}/items/${id_variante}`,
            {
                method: 'DELETE'
            }
        );

        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Error al eliminar item del carrito:', error);
    }
};


// CLEAR CART
export const vaciarCarrito = async (id_usuario) => {
    try {
        const res = await fetch(
            `http://localhost:8080/api/carrito/${id_usuario}`,
            {
                method: 'DELETE'
            }
        );

        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Error al vaciar carrito:', error);
    }
};