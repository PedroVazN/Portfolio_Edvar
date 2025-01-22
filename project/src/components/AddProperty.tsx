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
    description: '',
    saleOrRent: '',
    images: Array(30).fill(''), // 30 espaços para imagens (links)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...property.images];
    newImages[index] = value;
    setProperty({ ...property, images: newImages });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddProperty({ ...property, id: Date.now() }); // Envia para o componente pai
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
      description: '',
      saleOrRent: '',
      images: Array(30).fill(''),
    });
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6">Cadastrar Novo Imóvel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Título" value={property.title} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Localização" value={property.location} onChange={handleChange} required />
        <input type="text" name="price" placeholder="Preço" value={property.price} onChange={handleChange} required />
        <input type="number" name="bedrooms" placeholder="Quartos" value={property.bedrooms} onChange={handleChange} required />
        <input type="number" name="bathrooms" placeholder="Banheiros" value={property.bathrooms} onChange={handleChange} required />
        <input type="number" name="suites" placeholder="Suítes" value={property.suites} onChange={handleChange} />
        <input type="number" name="vagas" placeholder="Vagas" value={property.vagas} onChange={handleChange} />
        <input type="text" name="area" placeholder="Área (m²)" value={property.area} onChange={handleChange} required />
        <input type="text" name="iptu" placeholder="IPTU" value={property.iptu} onChange={handleChange} />
        <input type="text" name="saleOrRent" placeholder="Venda ou Locação" value={property.saleOrRent} onChange={handleChange} required />
        <textarea name="description" placeholder="Descrição" value={property.description} onChange={handleChange} required />

        <h3 className="font-bold">Imagens (máx: 30)</h3>
        {property.images.map((image, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Imagem ${index + 1}`}
            value={image}
            onChange={(e) => handleImageChange(index, e.target.value)}
          />
        ))}

        <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-md">Cadastrar</button>
      </form>
    </div>
  );
};

export default AddProperty;
