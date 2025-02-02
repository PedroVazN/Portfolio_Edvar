import Property from '../models/Property.js';

// Cadastrar novo imóvel
export const createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json({ message: 'Imóvel cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro ao cadastrar imóvel', error });
  }
};

// Listar imóveis com filtros
export const getProperties = async (req, res) => {
  try {
    const { type, location, bedrooms, bathrooms } = req.query;
    
    // Construir o objeto de filtro
    const filter = {};
    
    if (type) filter.saleOrRent = type.toLowerCase(); // Convertendo para minúsculo para match com enum
    if (location) {
      filter.location = { $regex: location, $options: 'i' }; // Case-insensitive search
    }
    if (bedrooms) {
      if (bedrooms === '5+') {
        filter.bedrooms = { $gte: 5 }; // Greater than or equal to 5
      } else {
        filter.bedrooms = parseInt(bedrooms);
      }
    }
    if (bathrooms) {
      if (bathrooms === '4+') {
        filter.bathrooms = { $gte: 4 }; // Greater than or equal to 4
      } else {
        filter.bathrooms = parseInt(bathrooms);
      }
    }

    const properties = await Property.find(filter);
    res.status(200).json(properties);
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
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