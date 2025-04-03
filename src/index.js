import express from 'express';
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 3000;

// Middleware para poder leer JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

// Empezamos a utilizar las rutas de productos
app.use("/api/products", productRoutes);
app.use("/api/users", productRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
