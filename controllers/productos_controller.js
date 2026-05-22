const productoVariantesModel = require('../models/producto_variantes_model');
const productosModel = require('../models/productos_model');


// @desc    Get all products
// @route   GET /api/v1/productos
// @access  Public
exports.getProductos = async (req, res) => {
  try {
    const productos = await productosModel
      .find()
      .populate('tipo')
      .populate('id_artista');

    res.status(200).json({
      success: true,
      count: productos.length,
      data: productos
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Get single product
// @route   GET /api/v1/productos/:id
// @access  Public
exports.getProductoById = async (req, res) => {
  try {
    const producto = await productosModel
      .findById(req.params.id)
      .populate('id_artista');

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: producto
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVariantesById = async (req, res) => {
  try{
    const producto = await productosModel.findById(req.params.id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    const variante = await productoVariantesModel
      .find({id_producto: req.params.id})
      .populate('id_producto');

      if (!variante) {
        return res.status(404).json({
          success: false,
          message: 'Variante no encontrada'
        });
      }
    res.status(200).json({
      success: true,
      count: variante.length,
      data: variante
    });
  }catch(error){
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/v1/productos
// @access  Public (luego puedes protegerlo con auth)
exports.createProducto = async (req, res) => {
  try {
    const producto = await productosModel.create({
      nombre_producto: req.body.producto,
      precio: req.body.precio,
      id_artista: req.body.id_artista,
      tipo: req.body.tipo,
      descripcion: req.body.descripcion,
      img_producto: req.file ? req.file.filename : null
    });

    let variantesProducto = [];

    if(req.body.tipo === "ropa"){
      const variantes = JSON.parse(req.body.variantes);
        variantesProducto = variantes.map((v) =>({
        id_producto: producto._id,
        talla: v.talla,
        stock: Number(v.stock)
      }));
    }else{
      variantesProducto = [{
        id_producto: producto._id,
        stock: Number(req.body.stock)
      }];
    }
    
    
    await productoVariantesModel.insertMany(variantesProducto);

    res.status(201).json({
      success: true,
      data: {producto, variantes: variantesProducto}
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};


// @desc    Update product
// @route   PUT /api/v1/productos/:id
// @access  Public

const borrarImagen = (file) => {
  if(file){
    const rutaImagen = path.join(
      __dirname,
      "../uploads",
      file.filename
    );

    fs.unlink(rutaImagen, (err) => {
      if(err){
        console.error("Error al borrar imagen:", err);
      }
    });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const {id} = req.params;
    
    const productoActual = await productosModel.findById(id);

    if(!productoActual){
      borrarImagen(req.file);

      return res.status(400).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    const datosActualizados ={
      nombre_producto: req.body.producto,
      precio: req.body.precio,
      id_artista: req.body.id_artista,
      tipo: req.body.tipo,
      descripcion: req.body.descripcion
    };

    if(req.file){
      if(productoActual.imagen){
        const rutaVieja = path.join(
          __dirname,
          "../uploads",
          productoActual.img_producto
        );

        fs.unlink(rutaVieja, (err) => {
          if(err){
            console.log(err);
          }
        });
      }
      datosActualizados.img_producto = req.file.filename;
    }

    const productoActualizado = await productosModel.findByIdAndUpdate(
      id,
      datosActualizados,
      {
        new: true,
        runValidators: true
      }
    );

    await productoVariantesModel.deleteMany({
      id_producto: id
    });

    let variantesProducto = [];

    if(req.body.tipo === "ropa"){
      const variantes = JSON.parse(req.body.variantes);
        variantesProducto = variantes.map((v) =>({
        id_producto: id,
        talla: v.talla,
        stock: Number(v.stock)
      }));
    }else{
      variantesProducto = [{
        id_producto: id,
        talla: null,
        stock: Number(req.body.stock)
      }];
    }

    await productoVariantesModel.insertMany(
      variantesProducto
    );

    res.status(200).json({
      success: true,
      data: productoActualizado
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// @desc    Delete product
// @route   DELETE /api/v1/productos/:id
// @access  Public
exports.deleteProducto = async (req, res) => {
  try {
    const {id} = req.params;

    await productoVariantesModel.deleteMany({
      id_producto: id
    });
    
    const productoEliminado = await productosModel.findByIdAndDelete(
      id,
      { estado: "eliminado" },
      {new: true}
    );

    if (!productoEliminado) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    return res.status(200).json({
      success: true,
      message: "Producto eliminado"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get products by artist
// @route   GET /api/v1/productos/artista/:id
exports.getProductosByArtista = async (req, res) => {
  try {
    const productos = await productosModel.find({
      id_artista: req.params.id
    });

    res.status(200).json({
      success: true,
      count: productos.length,
      data: productos
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};