import { City } from './types';

export const EMISSION_FACTORS = {
  flight: {
    basePerKm: 0.255,
    rfi: 1.9,
    classMultiplier: { economy: 1, premium: 1.5, business: 2.9, first: 4 },
    distanceMultiplier: (km: number) => km < 1500 ? 1.2 : km > 4000 ? 0.95 : 1.0
  },
  transport: { taxi: 0.21, public: 0.04, rental: 0.17, bike: 0 }, // kg CO₂/km
  transportKmPerDay: { taxi: 30, public: 20, rental: 40, bike: 10 },
  accommodation: { hotel5: 30, hotel3: 20, airbnb: 10, hostel: 5, friends: 3 }, // kg CO₂/noche
  food: { basePerDay: 5, redMeatExtra: 3 }, // kg CO₂
  souvenirs: 5 // kg CO₂ fijo
};

export const EQUIVALENCIES = {
  treesPerKgCO2: 1 / 22,   // 1 árbol absorbe ~22 kg CO₂/año
  carKmPerKgCO2: 1 / 0.21  // 1 km en auto = ~0.21 kg CO₂
};

export const CITIES: City[] = [
  // BRASIL
  { name: 'São Paulo', nameEn: 'Sao Paulo', namePt: 'São Paulo', nameEs: 'San Pablo', iata: 'GRU', lat: -23.4356, lng: -46.4731, flag: '🇧🇷' },
  { name: 'Rio de Janeiro', nameEn: 'Rio de Janeiro', namePt: 'Rio de Janeiro', nameEs: 'Río de Janeiro', iata: 'GIG', lat: -22.81, lng: -43.2506, flag: '🇧🇷' },
  { name: 'Brasília', nameEn: 'Brasilia', namePt: 'Brasília', nameEs: 'Brasilia', iata: 'BSB', lat: -15.8697, lng: -47.9172, flag: '🇧🇷' },
  { name: 'Belo Horizonte', nameEn: 'Belo Horizonte', namePt: 'Belo Horizonte', nameEs: 'Belo Horizonte', iata: 'CNF', lat: -19.6244, lng: -43.9719, flag: '🇧🇷' },
  { name: 'Salvador', nameEn: 'Salvador', namePt: 'Salvador', nameEs: 'Salvador', iata: 'SSA', lat: -12.9086, lng: -38.3225, flag: '🇧🇷' },
  { name: 'Recife', nameEn: 'Recife', namePt: 'Recife', nameEs: 'Recife', iata: 'REC', lat: -8.1264, lng: -34.9228, flag: '🇧🇷' },
  { name: 'Curitiba', nameEn: 'Curitiba', namePt: 'Curitiba', nameEs: 'Curitiba', iata: 'CWB', lat: -25.5317, lng: -49.1758, flag: '🇧🇷' },
  { name: 'Porto Alegre', nameEn: 'Porto Alegre', namePt: 'Porto Alegre', nameEs: 'Porto Alegre', iata: 'POA', lat: -29.9939, lng: -51.1711, flag: '🇧🇷' },
  { name: 'Fortaleza', nameEn: 'Fortaleza', namePt: 'Fortaleza', nameEs: 'Fortaleza', iata: 'FOR', lat: -3.7758, lng: -38.5322, flag: '🇧🇷' },
  { name: 'Manaus', nameEn: 'Manaus', namePt: 'Manaus', nameEs: 'Manaus', iata: 'MAO', lat: -3.0386, lng: -60.0506, flag: '🇧🇷' },

  // LATAM
  { name: 'Buenos Aires', nameEn: 'Buenos Aires', namePt: 'Buenos Aires', nameEs: 'Buenos Aires', iata: 'EZE', lat: -34.8222, lng: -58.5358, flag: '🇦🇷' },
  { name: 'Santiago', nameEn: 'Santiago', namePt: 'Santiago', nameEs: 'Santiago', iata: 'SCL', lat: -33.393, lng: -70.7858, flag: '🇨🇱' },
  { name: 'Lima', nameEn: 'Lima', namePt: 'Lima', nameEs: 'Lima', iata: 'LIM', lat: -12.0219, lng: -77.1143, flag: '🇵🇪' },
  { name: 'Bogotá', nameEn: 'Bogota', namePt: 'Bogotá', nameEs: 'Bogotá', iata: 'BOG', lat: 4.7016, lng: -74.1469, flag: '🇨🇴' },
  { name: 'Ciudad de México', nameEn: 'Mexico City', namePt: 'Cidade do México', nameEs: 'Ciudad de México', iata: 'MEX', lat: 19.4361, lng: -99.0719, flag: '🇲🇽' },
  { name: 'Panama City', nameEn: 'Panama City', namePt: 'Cidade do Panamá', nameEs: 'Ciudad de Panamá', iata: 'PTY', lat: 9.0714, lng: -79.3835, flag: '🇵🇦' },
  { name: 'Montevideo', nameEn: 'Montevideo', namePt: 'Montevidéu', nameEs: 'Montevideo', iata: 'MVD', lat: -34.8384, lng: -56.0308, flag: '🇺🇾' },
  { name: 'Asunción', nameEn: 'Asuncion', namePt: 'Assunção', nameEs: 'Asunción', iata: 'ASU', lat: -25.2394, lng: -57.5192, flag: '🇵🇾' },
  { name: 'Quito', nameEn: 'Quito', namePt: 'Quito', nameEs: 'Quito', iata: 'UIO', lat: -0.1292, lng: -78.3575, flag: '🇪🇨' },
  { name: 'Medellín', nameEn: 'Medellin', namePt: 'Medellín', nameEs: 'Medellín', iata: 'MDE', lat: 6.1644, lng: -75.4222, flag: '🇨🇴' },

  // EUROPA
  { name: 'Madrid', nameEn: 'Madrid', namePt: 'Madri', nameEs: 'Madrid', iata: 'MAD', lat: 40.4719, lng: -3.5626, flag: '🇪🇸' },
  { name: 'Lisboa', nameEn: 'Lisbon', namePt: 'Lisboa', nameEs: 'Lisboa', iata: 'LIS', lat: 38.7742, lng: -9.1342, flag: '🇵🇹' },
  { name: 'París', nameEn: 'Paris', namePt: 'Paris', nameEs: 'París', iata: 'CDG', lat: 49.0097, lng: 2.5479, flag: '🇫🇷' },
  { name: 'Londres', nameEn: 'London', namePt: 'Londres', nameEs: 'Londres', iata: 'LHR', lat: 51.47, lng: -0.4543, flag: '🇬🇧' },
  { name: 'Frankfurt', nameEn: 'Frankfurt', namePt: 'Frankfurt', nameEs: 'Frankfurt', iata: 'FRA', lat: 50.0333, lng: 8.5706, flag: '🇩🇪' },
  { name: 'Roma', nameEn: 'Rome', namePt: 'Roma', nameEs: 'Roma', iata: 'FCO', lat: 41.8003, lng: 12.2389, flag: '🇮🇹' },
  { name: 'Ámsterdam', nameEn: 'Amsterdam', namePt: 'Amsterdã', nameEs: 'Ámsterdam', iata: 'AMS', lat: 52.3081, lng: 4.7642, flag: '🇳🇱' },
  { name: 'Barcelona', nameEn: 'Barcelona', namePt: 'Barcelona', nameEs: 'Barcelona', iata: 'BCN', lat: 41.2971, lng: 2.0785, flag: '🇪🇸' },
  { name: 'Milán', nameEn: 'Milan', namePt: 'Milão', nameEs: 'Milán', iata: 'MXP', lat: 45.63, lng: 8.7231, flag: '🇮🇹' },
  { name: 'Zúrich', nameEn: 'Zurich', namePt: 'Zurique', nameEs: 'Zúrich', iata: 'ZRH', lat: 47.4581, lng: 8.5481, flag: '🇨🇭' },

  // EEUU / NORTH AMERICA
  { name: 'New York', nameEn: 'New York', namePt: 'Nova York', nameEs: 'Nueva York', iata: 'JFK', lat: 40.6413, lng: -73.7781, flag: '🇺🇸' },
  { name: 'Miami', nameEn: 'Miami', namePt: 'Miami', nameEs: 'Miami', iata: 'MIA', lat: 25.7959, lng: -80.2872, flag: '🇺🇸' },
  { name: 'Houston', nameEn: 'Houston', namePt: 'Houston', nameEs: 'Houston', iata: 'IAH', lat: 29.9804, lng: -95.3397, flag: '🇺🇸' },
  { name: 'Los Angeles', nameEn: 'Los Angeles', namePt: 'Los Angeles', nameEs: 'Los Ángeles', iata: 'LAX', lat: 33.9416, lng: -118.4085, flag: '🇺🇸' },
  { name: 'Washington', nameEn: 'Washington', namePt: 'Washington', nameEs: 'Washington', iata: 'IAD', lat: 38.9445, lng: -77.4558, flag: '🇺🇸' },
  { name: 'Chicago', nameEn: 'Chicago', namePt: 'Chicago', nameEs: 'Chicago', iata: 'ORD', lat: 41.9742, lng: -87.9073, flag: '🇺🇸' },
  { name: 'Atlanta', nameEn: 'Atlanta', namePt: 'Atlanta', nameEs: 'Atlanta', iata: 'ATL', lat: 33.6407, lng: -84.4277, flag: '🇺🇸' },
  { name: 'San Francisco', nameEn: 'San Francisco', namePt: 'São Francisco', nameEs: 'San Francisco', iata: 'SFO', lat: 37.6189, lng: -122.375, flag: '🇺🇸' },
  { name: 'Dallas', nameEn: 'Dallas', namePt: 'Dallas', nameEs: 'Dallas', iata: 'DFW', lat: 32.8998, lng: -97.0403, flag: '🇺🇸' },
  { name: 'Toronto', nameEn: 'Toronto', namePt: 'Toronto', nameEs: 'Toronto', iata: 'YYZ', lat: 43.6777, lng: -79.6248, flag: '🇨🇦' },

  // ASIA / OCEANIA / AFRICA
  { name: 'Tokio', nameEn: 'Tokyo', namePt: 'Tóquio', nameEs: 'Tokio', iata: 'NRT', lat: 35.772, lng: 140.3929, flag: '🇯🇵' },
  { name: 'Dubái', nameEn: 'Dubai', namePt: 'Dubai', nameEs: 'Dubái', iata: 'DXB', lat: 25.2532, lng: 55.3657, flag: '🇦🇪' },
  { name: 'Singapur', nameEn: 'Singapore', namePt: 'Singapura', nameEs: 'Singapur', iata: 'SIN', lat: 1.3644, lng: 103.9915, flag: '🇸🇬' },
  { name: 'Sídney', nameEn: 'Sydney', namePt: 'Sydney', nameEs: 'Sídney', iata: 'SYD', lat: -33.946, lng: 151.1771, flag: '🇦🇺' },
  { name: 'Seúl', nameEn: 'Seoul', namePt: 'Seul', nameEs: 'Seúl', iata: 'ICN', lat: 37.46, lng: 126.4406, flag: '🇰🇷' },
  { name: 'Hong Kong', nameEn: 'Hong Kong', namePt: 'Hong Kong', nameEs: 'Hong Kong', iata: 'HKG', lat: 22.3089, lng: 113.9147, flag: '🇭🇰' },
  { name: 'Bangkok', nameEn: 'Bangkok', namePt: 'Bangkok', nameEs: 'Bangkok', iata: 'BKK', lat: 13.69, lng: 100.7501, flag: '🇹🇭' },
  { name: 'Delhi', nameEn: 'Delhi', namePt: 'Déli', nameEs: 'Delhi', iata: 'DEL', lat: 28.5562, lng: 77.1001, flag: '🇮🇳' },
  { name: 'Ciudad del Cabo', nameEn: 'Cape Town', namePt: 'Cidade do Cabo', nameEs: 'Ciudad del Cabo', iata: 'CPT', lat: -33.9715, lng: 18.6021, flag: '🇿🇦' },
  { name: 'Nairobi', nameEn: 'Nairobi', namePt: 'Nairóbi', nameEs: 'Nairobi', iata: 'NBO', lat: -1.3191, lng: 36.9275, flag: '🇰🇪' },
];
