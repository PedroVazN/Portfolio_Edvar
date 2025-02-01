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


// Listar imóveis com filtros
export const getProperties = async (req, res) => {
  try {
    const { type, neighborhood, bedrooms, bathrooms } = req.query;

    // Construir o objeto de filtro
    const filter = {};
    if (type) filter.type = type;
    if (neighborhood) {
      // Filtra por bairro dentro do campo "location" usando regex
      filter.location = { $regex: neighborhood, $options: 'i' }; // Case-insensitive
    }
    if (bedrooms) filter.bedrooms = parseInt(bedrooms); // Converte para número
    if (bathrooms) filter.bathrooms = parseInt(bathrooms); // Converte para número

    // Buscar imóveis com base nos filtros
    const properties = await Property.find(filter);
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