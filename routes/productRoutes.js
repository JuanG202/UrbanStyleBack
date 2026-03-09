const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");
const upload = require("../middleware/upload");

// obtener productos
router.get("/", productController.getProducts);

// crear producto
router.post("/", upload.single("image"), productController.createProduct);

// actualizar producto
router.put("/:id", upload.single("image"), productController.updateProduct);

// eliminar producto
router.delete("/:id", productController.deleteProduct);

module.exports = router;