import Property from '../models/Property.js';

// Cadastrar novo imóvel
export const createProperty = async (req, res) => {
  console.log(req.body); // Verifica o que está sendo enviado no corpo da requisição
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json({ message: 'Imóvel cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro:', error); // Log do erro
    res.status(500).json({ message: 'Erro ao cadastrar imóvel', error });
  }
};


// Listar imóveis 
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar imóveis', error });
  }
};

// Buscar imóvel por ID
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