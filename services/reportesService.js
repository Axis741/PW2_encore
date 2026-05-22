export const getTotalesTablas = async() => {
    try {
        const res = await fetch(
            "http://localhost:8080/api/reportes/totalesTablas",
        );

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

//VENTAS GENERALES POR TIPO
export const getVentasGeneral = async() => {
    try {
        const res = await fetch(
            "http://localhost:8080/api/reportes/ventasGeneral"
        );

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

//VENTAS GENERALES POR ARTISTA
export const getVentasPorArtista = async() => {
    try {
        const res = await fetch(
            "http://localhost:8080/api/reportes/ventasPorArtista"
        );

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};