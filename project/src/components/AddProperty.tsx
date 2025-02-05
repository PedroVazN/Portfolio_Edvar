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
    mobilia: '',
    aceitaPet: '',
    condominio: '',
    images: Array(50).fill(''),
  });

  const [password, setPassword] = useState(''); // Estado para armazenar a senha digitada
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

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

    // Verifica se a senha está correta
    if (password !== '122412') {
      setError('Senha incorreta. Tente novamente.');
      return; // Impede o envio do formulário
    }

    try {
      const response = await fetch('https://backendimoveis.vercel.app/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
        mode: 'cors',
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        onAddProperty(property);
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
          mobilia: '',
          aceitaPet: '',
          condominio: '',
          images: Array(50).fill(''),
        });
        setError(''); // Limpa a mensagem de erro
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
        {/* Campo de senha */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha de Acesso
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Campos do formulário de imóvel */}
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
            name="condominio"
            placeholder="Condomínio"
            value={property.condominio}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="aceitaPet"
            placeholder="Aceita Pet"
            value={property.aceitaPet}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="mobilia"
            placeholder="Mobilia"
            value={property.mobilia}
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
          <h3 className="font-bold text-lg mb-2">Imagens (máx: 50)</h3>
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