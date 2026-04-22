export type TransportMode = 'taxi' | 'public' | 'bike' | 'rental';
export type AccommodationType = 'hotel5' | 'hotel3' | 'airbnb' | 'hostel' | 'friends';
export type WizardStep = 'origin' | 'flights' | 'transport' | 'accommodation' | 'extras';

export interface City {
  name: string;
  nameEn: string;
  namePt: string;
  nameEs: string;
  iata: string;
  lat: number;
  lng: number;
  flag: string;
}

export interface FlightLeg {
  from: City;
  to: City;
  distanceKm: number;
}

export interface EventConfig {
  name: string;
  logo: string;
  city: string;
  cityCoords: { lat: number; lng: number };
  dates: { start: string; end: string };
  languages: string[];
  defaultLanguage: string;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    bgColor: string;
  };
  compensationEnabled: boolean;
  compensationPricePerTon: number;
  offsetLinks: { name: string; url: string; logo: string }[];
}

export interface TripData {
  origin: City;
  isLocal: boolean;
  flights: FlightLeg[];
  flightClass: 'economy' | 'premium' | 'business' | 'first';
  roundTrip: boolean;
  transport: TransportMode[];
  transportDays: number;
  accommodation: AccommodationType;
  accommodationNights: number;
  redMeatMeals: number;
  hasSouvenirs: boolean;
}

export interface FootprintResult {
  total: number;
  breakdown: {
    flights: number;
    transport: number;
    accommodation: number;
    food: number;
    extras: number;
  };
  equivalencies: {
    trees: number;
    carKm: number;
  };
}
