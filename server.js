require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// carpeta de imágenes
if (process.env.UPLOAD_PATH) {
  app.use("/uploads", express.static(process.env.UPLOAD_PATH));
}

// conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

// rutas
app.use("/api/products", productRoutes);

// solo levantar servidor en local
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

// exportar app para Vercel
module.exports = app;