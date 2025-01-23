import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  suites: { type: Number },
  vagas: { type: Number },
  iptu: { type: Number },
  codigo: { type: Number, required: true },
  description: { type: String, required: true },
  saleOrRent: { type: String, enum: ['Venda', 'Locação'], required: true },
  images: { type: [String], required: true },
  latitude: { type: Number },
  longitude: { type: Number },
});

const Property = mongoose.model('Property', PropertySchema);

export default Property;
