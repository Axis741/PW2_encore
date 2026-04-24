export const crearArtista = async (artista) => {
  try {
    const res = await fetch('http://localhost:8080/api/artistas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(artista)
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al crear artista:', error);
  }
};