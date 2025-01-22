const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Conectando ao MongoDB Atlas
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/imoveis', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((error) => {
  console.log('Erro ao conectar ao MongoDB', error);
});

app.use(cors());
app.use(express.json());

// Definindo o esquema de Imóvel
const PropertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: String,
  bedrooms: Number,
  bathrooms: Number,
  area: String,
  suites: Number,
  vagas: Number,
  iptu: String,
  description: String,
  saleOrRent: String,
  images: [String],
});

const Property = mongoose.model('Property', PropertySchema);

// Rota para cadastrar um novo imóvel
app.post('/api/properties', async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para buscar todos os imóveis
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
