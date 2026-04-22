import { 
  FlightLeg, 
  TransportMode, 
  AccommodationType, 
  TripData, 
  EventConfig, 
  FootprintResult,
  City
} from './types';
import { EMISSION_FACTORS, EQUIVALENCIES, CITIES } from './constants';

/**
 * Calculates the distance between two coordinates using the Haversine formula.
 */
export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculates emissions for flight legs.
 */
export function calculateFlightEmissions(
  legs: FlightLeg[], 
  flightClass: 'economy' | 'premium' | 'business' | 'first', 
  roundTrip: boolean
): number {
  const factors = EMISSION_FACTORS.flight;
  
  let totalEmissions = 0;
  
  for (const leg of legs) {
    const distance = leg.distanceKm;
    const distMultiplier = factors.distanceMultiplier(distance);
    const classMultiplier = factors.classMultiplier[flightClass];
    
    // Formula: distance * base * distanceFactor * classFactor * RFI
    const legEmissions = distance * factors.basePerKm * distMultiplier * classMultiplier * factors.rfi;
    totalEmissions += legEmissions;
  }
  
  return roundTrip ? totalEmissions * 2 : totalEmissions;
}

/**
 * Calculates emissions for ground transport.
 */
export function calculateTransportEmissions(modes: TransportMode[], days: number): number {
  let total = 0;
  for (const mode of modes) {
    const kmPerDay = EMISSION_FACTORS.transportKmPerDay[mode];
    const factor = EMISSION_FACTORS.transport[mode];
    total += kmPerDay * factor * days;
  }
  return total;
}

/**
 * Calculates emissions for accommodation.
 */
export function calculateAccommodationEmissions(type: AccommodationType, nights: number): number {
  return EMISSION_FACTORS.accommodation[type] * nights;
}

/**
 * Calculates emissions for food.
 */
export function calculateFoodEmissions(days: number, redMeatMeals: number): number {
  const base = EMISSION_FACTORS.food.basePerDay * days;
  const extra = redMeatMeals * EMISSION_FACTORS.food.redMeatExtra;
  return base + extra;
}

/**
 * Calculates emissions for extras/souvenirs.
 */
export function calculateExtrasEmissions(hasSouvenirs: boolean): number {
  return hasSouvenirs ? EMISSION_FACTORS.souvenirs : 0;
}

/**
 * Main function to orchestrate the total footprint calculation.
 */
export function calculateTotal(tripData: TripData, eventConfig: EventConfig): FootprintResult {
  const flights = calculateFlightEmissions(tripData.flights, tripData.flightClass, tripData.roundTrip);
  const transport = calculateTransportEmissions(tripData.transport, tripData.transportDays);
  const accommodation = calculateAccommodationEmissions(tripData.accommodation, tripData.accommodationNights);
  const food = calculateFoodEmissions(tripData.transportDays || 1, tripData.redMeatMeals);
  const extras = calculateExtrasEmissions(tripData.hasSouvenirs);
  
  const total = flights + transport + accommodation + food + extras;
  
  return {
    total,
    breakdown: {
      flights,
      transport,
      accommodation,
      food,
      extras
    },
    equivalencies: {
      trees: total * EQUIVALENCIES.treesPerKgCO2,
      carKm: total * EQUIVALENCIES.carKmPerKgCO2
    }
  };
}


