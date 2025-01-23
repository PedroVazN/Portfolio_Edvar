import React, { useState } from 'react';


const AddProperty = ({ onAddProperty }: { onAddProperty: (property: any) => void }) => {
  const [property, setProperty] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    suites: '',
    vagas: '',
    iptu: '',
    codigo: '',
    description: '',
    saleOrRent: '',
    latitude: '',
    longitude: '',
    images: Array(30).fill(''),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...property.images];
    newImages[index] = value;
    setProperty({ ...property, images: newImages });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://backendedvar.netlify.app/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Mensagem de sucesso
        onAddProperty(property); // Adiciona ao estado do pai
        setProperty({
          title: '',
          location: '',
          price: '',
          bedrooms: '',
          bathrooms: '',
          area: '',
          suites: '',
          vagas: '',
          iptu: '',
          codigo: '',
          description: '',
          saleOrRent: '',
          latitude: '',
          longitude: '',
          images: Array(30).fill(''),
        });
      } else {
        alert('Erro ao cadastrar imóvel.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar ao servidor.');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Cadastrar Novo Imóvel</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={property.title}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Localização"
            value={property.location}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Preço"
            value={property.price}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Quartos"
            value={property.bedrooms}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Banheiros"
            value={property.bathrooms}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="number"
            name="suites"
            placeholder="Suítes"
            value={property.suites}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="number"
            name="vagas"
            placeholder="Vagas"
            value={property.vagas}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="area"
            placeholder="Área (m²)"
            value={property.area}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="iptu"
            placeholder="IPTU"
            value={property.iptu}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="codigo"
            placeholder="Código"
            value={property.codigo}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={property.latitude}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={property.longitude}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="saleOrRent"
            placeholder="Venda ou Locação"
            value={property.saleOrRent}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Descrição"
          value={property.description}
          onChange={handleChange}
          className="input-field h-32"
          required
        />

        <div>
          <h3 className="font-bold text-lg mb-2">Imagens (máx: 30)</h3>
          {property.images.map((image, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Imagem ${index + 1}`}
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="input-field"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Cadastrar Imóvel
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
