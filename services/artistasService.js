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