export interface Property {
    _id: string;
    title: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    suites?: number;
    vagas?: number;
    iptu?: number;
    codigo: number;
    description: string;
    saleOrRent: 'Venda' | 'Locação';
    images: string[];
    latitude?: number;
    longitude?: number;
    condominio?: number;
    aceitaPet: boolean;
    mobilia: boolean;
  }