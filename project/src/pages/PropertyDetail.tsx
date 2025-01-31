import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleVisit from '../components/ScheduleVisit';
import {
  Bed, Bath, Home, Car, DotSquare as SquareFootage,
  DollarSign, Phone, MapPin, ChevronLeft, ChevronRight,
  Loader2, Share2, Heart, Calendar, Tag, Building, PawPrint, Sofa, X
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
  codigo: string;
  suites: number;
  vagas: number;
  saleOrRent: string;
  contact: string;
  latitude: number;
  longitude: number;
  condominio: number;
  aceitaPet: boolean;
  mobilia: boolean;
}

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showScheduleVisit, setShowScheduleVisit] = useState(false);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: property?.title,
        text: property?.description,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://backendimoveis.vercel.app/api/properties/${id}`);
        const data = await response.json();
        setProperty(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property:', error);
        setLoading(false);
      }
    };

    const fetchSimilarProperties = async () => {
      try {
        const response = await fetch(`https://backendimoveis.vercel.app/api/properties/${id}/similar`);
        const data = await response.json();
        setSimilarProperties(data);
      } catch (error) {
        console.error('Error fetching similar properties:', error);
      }
    };

    fetchProperty();
    fetchSimilarProperties();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-xl font-medium">Imóvel não encontrado</p>
      </div>
    );
  }

  const validImages = property.images.filter((image) => image.trim() !== '');

  return (
    <div className="min-h-screen bg-gray-50">
      {showImageModal && (
         <div className="container mx-auto px-4 py-8 max-w-7xl">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={validImages[currentImageIndex]}
            alt={`Property ${currentImageIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {validImages.length}
          </div>
        </div>
      )}
      
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-blue-600 transition-colors">Home</a></li>
            <li>/</li>
            <li><a href="/properties" className="hover:text-blue-600 transition-colors">Imóveis</a></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{property.title}</li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative aspect-[16/9]">
                <img
                  src={validImages[currentImageIndex]}
                  alt={`Property ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onClick={() => setShowImageModal(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{property.title}</h1>
                    <div className="flex items-center text-white/90">
                      <MapPin className="w-5 h-5 mr-2" />
                      <p>{property.location}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handlePrevious}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-5 gap-2 p-4">
                {validImages.slice(0, 5).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 
                      ${currentImageIndex === index ? 'ring-2 ring-blue-600' : 'hover:opacity-80'}`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sobre este imóvel</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Localização</h2>
              <div className="aspect-[16/9] rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.01}%2C${property.latitude - 0.01}%2C${property.longitude + 0.01}%2C${property.latitude + 0.01}&layer=mapnik`}
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column - Property Details and Contact */}
          <div className="space-y-8">
            {/* Price and Actions Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold text-blue-600">
                    R$ {property.price.toLocaleString('pt-BR')}
                  </span>
                  <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {property.saleOrRent === 'venda' ? 'Venda' : 'Locação'}
                    </span>
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      <span>Código: {property.codigo}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'
                    }`}
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

              {/* Property Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: Bed, label: 'Quartos', value: property.bedrooms },
                  { icon: Bath, label: 'Banheiros', value: property.bathrooms },
                  { icon: Home, label: 'Suítes', value: property.suites },
                  { icon: Car, label: 'Vagas', value: property.vagas },
                  { icon: SquareFootage, label: 'Área', value: `${property.area} m²` },
                  { icon: Building, label: 'Condomínio', value: `R$ ${property.condominio?.toLocaleString('pt-BR')}` }
                ].map(({ icon: Icon, label, value }, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">{label}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Features */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-600">IPTU</span>
                  </div>
                  <span className="font-semibold">R$ {property.iptu.toLocaleString('pt-BR')}/ano</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <PawPrint className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-600">Aceita Pet</span>
                  </div>
                  <span className="font-semibold">{property.aceitaPet ? 'Sim' : 'Não'}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Sofa className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-600">Mobiliado</span>
                  </div>
                  <span className="font-semibold">{property.mobilia ? 'Sim' : 'Não'}</span>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6" />
                    <div>
                      <p className="text-sm opacity-90">Entre em contato</p>
                      <p className="font-semibold text-lg">{property.contact}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowScheduleVisit(true)}
                  className="w-full py-3 bg-white text-blue-600 rounded-lg font-semibold
                    hover:bg-blue-50 transition-colors"
                >
                  Agendar Visita
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Imóveis Similares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map((similar) => (
                <div key={similar._id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="relative aspect-[4/3]">
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
                  <div className="p-6">
                    <p className="text-blue-600 font-bold text-xl mb-4">
                      R$ {similar.price.toLocaleString('pt-BR')}
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Bed className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-600">{similar.bedrooms}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bath className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-600">{similar.bathrooms}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <SquareFootage className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-600">{similar.area}m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Schedule Visit Modal */}
      {showScheduleVisit && (
        <ScheduleVisit
          propertyId={property._id}
          propertyTitle={property.title}
          onClose={() => setShowScheduleVisit(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetail;