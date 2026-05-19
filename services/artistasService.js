// POST - CREAR ARTISTAS

export const crearArtista = async (formData) => {
  try {
    const res = await fetch('http://localhost:8080/api/artistas', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al crear artista:', error);
  }
};

// GET - TRAER ARTISTAS

export const getArtistas = async () => {
  try{
    const res = await fetch('http://localhost:8080/api/artistas');
    const data = await res.json();
    return data;
  }catch(error){
    console.error('Error al traer artista:', error);
  }
}

//ACTUALLIZAR ARTISTA
export const updateArtista = async (id, formData) => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/artistas/${id}`,
      {
        method: "PUT",
        body: formData
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

//ELIMINAR ARTISTA
export const deleteArtista = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/artistas/${id}`,
      {
        method: "DELETE"
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};