import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Bed, Bath, Home, Car, DotSquare as SquareFootage,
  DollarSign, Phone, MapPin, ChevronLeft, ChevronRight,
  Loader2, Share2, Heart, Calendar, Tag
} from 'lucide-react';


interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  images: string[];
  iptu: number;
  codigo: number;
  suites: number;
  vagas: number;
  saleOrRent: string;
  contact: string;
  latitude: number;
  longitude: number;
}

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${id}`);
        const data = await response.json();
        setProperty(data);

        // Fetch similar properties (mock data for example)
        const similarResponse = await fetch('http://localhost:5000/api/properties');
        const allProperties = await similarResponse.json();
        const similar = allProperties
          .filter((p: Property) => p._id !== id)
          .slice(0, 3);
        setSimilarProperties(similar);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: property?.title,
        text: `Confira este imóvel: ${property?.title} em ${property?.location}`,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Imóvel não encontrado</p>
      </div>
    );
  }

  const validImages = property.images.filter((image) => image.trim() !== '');

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < validImages.length - 1 ? prevIndex + 1 : 0));
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : validImages.length - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li>/</li>
            <li><a href="/properties" className="hover:text-blue-600">Imóveis</a></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{property.title}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <p>{property.location}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
                    } hover:bg-red-500 hover:text-white transition-colors`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={validImages[currentImageIndex]}
                  alt={`Property ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {validImages.length}
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-5 gap-2">
                {validImages.slice(0, 5).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index ? 'border-blue-600' : 'border-transparent'
                      }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-blue-600">
                    R$ {property.price.toLocaleString('pt-BR')}
                  </span>
                  <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Disponível Agora</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      <p >Código: {property.codigo} </p>
                    </div>
                  </div>
                </div>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {property.saleOrRent === 'venda' ? 'Venda' : 'Locação'}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Bed className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Quartos</p>
                    <p className="font-semibold">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Bath className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Banheiros</p>
                    <p className="font-semibold">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Home className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Suítes</p>
                    <p className="font-semibold">{property.suites}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Car className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Vagas</p>
                    <p className="font-semibold">{property.vagas}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <SquareFootage className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Área</p>
                    <p className="font-semibold">{property.area} m²</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">IPTU</p>
                    <p className="font-semibold">R$ {property.iptu.toLocaleString('pt-BR')}/ano</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">Descrição</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6" />
                  <div>
                    <p className="text-sm opacity-90">Interessado? Entre em contato</p>
                    <p className="font-semibold text-lg">{property.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}

          <div className="p-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Localização</h3>
            {/* Map Section */}
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.01}%2C${property.latitude - 0.01}%2C${property.longitude + 0.01}%2C${property.latitude + 0.01}&layer=mapnik`}
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="p-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Imóveis Similares</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProperties.map((similar) => (
                  <div key={similar._id} className="bg-gray-50 rounded-xl overflow-hidden group cursor-pointer">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={similar.images[0]}
                        alt={similar.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white font-semibold text-lg mb-1">{similar.title}</p>
                        <p className="text-white/90 text-sm flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {similar.location}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-blue-600 font-semibold text-lg mb-2">
                        R$ {similar.price.toLocaleString('pt-BR')}
                      </p>
                      <div className="flex items-center justify-between text-gray-600 text-sm">
                        <span className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {similar.bedrooms} Quartos
                        </span>
                        <span className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          {similar.bathrooms} Banheiros
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;