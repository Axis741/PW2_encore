//POST
export const crearProducto = async(formData) => {
    try{
        const res = await fetch('http://localhost:8080/api/producto', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        return data;
    } catch (error){
        console.error('Error al crear producto:', error);
    }
};

//GET
export const getProductos = async() =>{
    const res = await fetch('http://localhost:8080/api/producto');
    const data = await res.json();
    return data;
}

//GET BY ID
export const getProductosById = async(id) => {
    try{
        const res = await fetch(`http://localhost:8080/api/producto/${id}`);
        const data = await res.json();
        return data;
    }catch(error){
        console.error('Error al traer producto por id:', error);
    }
}

export const getVariantesById = async(id) => {
    try{
        const res = await fetch(`http://localhost:8080/api/producto/variantes/${id}`);
        const data = await res.json();
        return data;
    }catch(error){
        console.error('Error al traer variantes por id:', error);
    }
}