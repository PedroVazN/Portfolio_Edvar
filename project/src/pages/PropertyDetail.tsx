import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleVisit from '../components/ScheduleVisit';
import {
  Bed, Bath, Home, Car, DotSquare as SquareFootage,
  DollarSign, Phone, MapPin, ChevronLeft, ChevronRight,
  Loader2, Share2, Heart, Calendar, Tag, Building, PawPrint, Sofa, X,
  ZoomIn, ZoomOut
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

const spNeighborhoods = [
  { name: 'Moema', avgPrice: 'R$ 12.000/m²', popularity: 'Alta' },
  { name: 'Vila Mariana', avgPrice: 'R$ 10.500/m²', popularity: 'Alta' },
  { name: 'Pinheiros', avgPrice: 'R$ 13.000/m²', popularity: 'Alta' },
  { name: 'Jardins', avgPrice: 'R$ 15.000/m²', popularity: 'Alta' },
  { name: 'Itaim Bibi', avgPrice: 'R$ 14.000/m²', popularity: 'Alta' },
  { name: 'Brooklin', avgPrice: 'R$ 11.000/m²', popularity: 'Alta' }
];

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showScheduleVisit, setShowScheduleVisit] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const handlePrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: property?.title,
        text: `Confira este incrível imóvel: ${property?.title}`,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleImageClick = () => {
    setShowImageModal(true);
    setIsZoomed(false);
  };

  const handleZoomToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
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
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fade-in">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={handleZoomToggle}
              className="absolute top-4 right-16 text-white hover:text-gray-300 z-50 transition-colors"
            >
              {isZoomed ? <ZoomOut className="w-8 h-8" /> : <ZoomIn className="w-8 h-8" />}
            </button>
            <button
              onClick={handlePrevious}
              className="absolute top-1/2 left-4 -translate-y-1/2 text-white hover:text-gray-300 z-50 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:text-gray-300 z-50 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <img
              src={validImages[currentImageIndex]}
              alt={`Property ${currentImageIndex + 1}`}
              className={`max-w-full max-h-[90vh] object-contain transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={handleZoomToggle}
            />
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <div className="flex justify-center space-x-2 overflow-x-auto py-2">
                {validImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 
                      ${currentImageIndex === index ? 'ring-2 ring-white scale-95' : 'opacity-50 hover:opacity-100'}`}
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
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-blue-600 transition-colors">Home</a></li>
            <li>/</li>
            <li><a href="/properties" className="hover:text-blue-600 transition-colors">Imóveis</a></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{property.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div 
                className="relative aspect-[16/9] group cursor-pointer"
                onClick={handleImageClick}
              >
                <img
                  src={validImages[currentImageIndex]}
                  alt={`Property ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/75 text-white px-6 py-3 rounded-full flex items-center space-x-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5" />
                      <span>Clique para expandir</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all duration-300 transform hover:scale-105 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all duration-300 transform hover:scale-105 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {validImages.length}
                </div>
              </div>
              
              {/* Thumbnail Strip */}
              <div className="p-4 bg-gray-50">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {validImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all duration-300 
                        ${currentImageIndex === index ? 'ring-2 ring-blue-600 scale-95' : 'hover:opacity-80'}`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {currentImageIndex === index && (
                        <div className="absolute inset-0 bg-blue-600/20" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Title and Location */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <p>{property.location}</p>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sobre este imóvel</h2>
              <div className="prose max-w-none">
                {property.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
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

            {/* Neighborhoods Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bairros Populares em São Paulo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {spNeighborhoods.map((neighborhood, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-lg mb-2">{neighborhood.name}</h3>
                    <p className="text-sm text-gray-600">Preço médio: {neighborhood.avgPrice}</p>
                    <p className="text-sm text-gray-600">Procura: {neighborhood.popularity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Property Details and Contact */}
          <div className="space-y-6">
            {/* Price and Actions Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
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
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
                  <span className="font-semibold">R$ {property.iptu.toLocaleString('pt-BR')}/mês </span>
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
                  className="w-full py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Agendar Visita</span>
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
                <a
                  href={`/property/${similar._id}`}
                  key={similar._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
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
                </a>
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