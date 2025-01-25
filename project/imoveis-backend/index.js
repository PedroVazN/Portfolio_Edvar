import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import propertyRoutes from './src/routes/propertyRoutes.js';
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Usar rotas
app.use('/api', propertyRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});