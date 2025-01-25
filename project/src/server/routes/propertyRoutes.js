import express from 'express';
import { createProperty, getProperties, getPropertyById } from '../controllers/propertyController.js';
const router = express.Router();

router.post('/properties', createProperty);
router.get('/properties', getProperties);
router.get('/properties/:id', getPropertyById);

export default router;

// src/server/controllers/propertyController.js
import Property from '../models/Property.js';

export const createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json({ message: 'Imóvel cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar imóvel', error });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar imóveis', error });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Imóvel não encontrado' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar imóvel', error });
  }
};
