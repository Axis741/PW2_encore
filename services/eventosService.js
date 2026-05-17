// CREAR EVENTO
export const crearEvento = async (formData) => {

    try{

        const res = await fetch(
            "http://localhost:8080/api/eventos",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await res.json();
        return data;

    }catch(error){
        console.error(error);
    }

};

// GET EVENTOS
export const getEventos = async () => {

    try{

        const res = await fetch(
            "http://localhost:8080/api/eventos"
        );

        const data = await res.json();
        return data;

    }catch(error){
        console.error(error);
    }

};