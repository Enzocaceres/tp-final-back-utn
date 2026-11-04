import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';

// Rutas
import categoryRoutes from './src/routes/categoryRoute.js';
import productRoutes from './src/routes/productRoute.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoints principales
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Conexión a MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});