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
      credentials: 'include',
      body: JSON.stringify(usuarioData)
    });

    return await res.json();
  }catch(error){
    console.error('Error en login:', error);
  }
};

//VERIFICAR SESION
export const verificarSesion = async () => {
  try{
    const res = await fetch(
      'http://localhost:8080/api/users/session',
      {
        method: 'GET',
        credentials: 'include'
      }
    );

    return await res.json();
  }catch(error){
    console.error('Error al verificar sesion:', error);
  }
};

//ACTUALIZAR USUARIO
export const updateUsuario = async (id, formData) => {
  try{
    const res = await fetch(
      `http://localhost:8080/api/users/${id}`,
      {
        method: "PUT",
        credentials: "include",
        body: formData
      }
    );

    return await res.json();
  }catch(error){
    console.error('Error al actualizar usuario:', error);
  }
};

//LOGOUT
export const logoutUsuario = async () => {

  try{

    const res = await fetch(
      'http://localhost:8080/api/users/logout',
      {
        method: 'POST',
        credentials: 'include'
      }
    );

    return await res.json();

  }catch(error){
    console.error(error);
  }

};