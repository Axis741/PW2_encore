// CONFIRMAR ORDEN
export const confirmarOrden = async(id_usuario) => {
    try{

        const res = await fetch(
            'http://localhost:8080/api/ordenes/ordenes/confirmar',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    id_usuario
                })
            }
        );

        const data = await res.json();

        return data;

    }catch(error){

        console.error(
            'Error al confirmar orden:',
            error
        );

    }
};


// GET ORDENES POR USUARIO
export const getOrdenesByUsuario = async(id_usuario) => {

    try{

        const res = await fetch(
            `http://localhost:8080/api/ordenes/ordenes/usuario/${id_usuario}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        );

        const data = await res.json();

        return data;

    }catch(error){

        console.error(
            'Error al obtener órdenes:',
            error
        );

    }

};