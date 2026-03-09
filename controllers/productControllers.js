const Product = require("../models/Product");

// Obtener productos
exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({ message: "Error al obtener productos" });

  }
};


// Crear producto
exports.createProduct = async (req, res) => {
  try {

    const imagePath = req.file
      ? req.file.filename
      : req.body.image; // ← si no hay archivo usa la URL

    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      gender: req.body.gender,
      image: imagePath
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);

  } catch (error) {

    res.status(500).json({ message: "Error al crear producto" });

  }
};


// Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Producto eliminado" });

  } catch (error) {

    res.status(500).json({ message: "Error al eliminar producto" });

  }
};


// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {

    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      gender: req.body.gender
    };

    if (req.file) {

      updateData.image = req.file.filename;

    } else if (req.body.image) {

      updateData.image = req.body.image;

    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json({ message: "Error al actualizar producto" });

  }
};