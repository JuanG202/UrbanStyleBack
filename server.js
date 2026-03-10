require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes = require("./routes/productRoutes");

const app = express();

// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://urban-style-sigma.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// AUMENTAR LIMITE DEL BODY (evita PayloadTooLargeError)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// carpeta de imágenes
if (process.env.UPLOAD_PATH) {
  app.use("/uploads", express.static(process.env.UPLOAD_PATH));
}

// conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// ruta de prueba
app.get("/api", (req, res) => {
  res.json({ message: "API Urban Style funcionando" });
});

// rutas
app.use("/api/products", productRoutes);

// servidor local
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

module.exports = app;