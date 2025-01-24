import express from 'express';
import { createProperty, getProperties, getPropertyById } from '../controllers/propertyController.js';
const router = express.Router();
// Rota para adicionar imóvel
router.post('/properties', createProperty);
// Rota para listar imóveis
router.get('/properties', getProperties);
// Rota para buscar imóvel por ID
router.get('/properties/:id', getPropertyById);
export default router;