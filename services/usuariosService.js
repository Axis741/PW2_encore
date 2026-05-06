// POST - CREAR USUARIOS

export const crearUsuarios = async (formData) => {
  try {
    const res = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
};

// LOGIN

export const loginUsuarios = async (usuarioData) => {
  try{
    const res = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioData)
    });

    return await res.json();
  }catch(error){
    console.error('Error en login:', error);
  }
};