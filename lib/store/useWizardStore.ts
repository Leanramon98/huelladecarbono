import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TripData, WizardStep, City } from '../types';
import { calculateTotal } from '../calculations';

interface WizardState {
  currentStep: WizardStep;
  tripData: TripData;
  partialCO2: number;
  setStep: (step: WizardStep) => void;
  updateTripData: (data: Partial<TripData>) => void;
  reset: () => void;
}

const initialTripData: TripData = {
  origin: { name: '', nameEn: '', namePt: '', nameEs: '', iata: '', lat: 0, lng: 0, flag: '' },
  isLocal: false,
  flights: [],
  flightClass: 'economy',
  roundTrip: true,
  transport: [],
  transportDays: 1,
  accommodation: 'hotel3',
  accommodationNights: 1,
  redMeatMeals: 0,
  hasSouvenirs: false,
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      currentStep: 'origin',
      tripData: initialTripData,
      partialCO2: 0,

      setStep: (step) => set({ currentStep: step }),

      updateTripData: (data) => {
        const newTripData = { ...get().tripData, ...data };
        
        // Mock config for partial calculation
        const mockConfig = {
            name: '', logo: '', city: '', cityCoords: {lat:0, lng:0}, dates: {start:'', end:''},
            languages: [], defaultLanguage: 'es', branding: {primaryColor:'', secondaryColor:'', accentColor:'', bgColor:''},
            compensationEnabled: true, compensationPricePerTon: 0, offsetLinks: [],
            emissionFactors: {
                flight: { basePerKm: 0.255, rfi: 1.9 },
                transport: { taxi: 0.21, public: 0.04, rental: 0.17, bike: 0 },
                accommodation: { hotel5: 30, hotel3: 20, airbnb: 10, hostel: 5, friends: 3 },
                food: { basePerDay: 5, redMeatExtra: 3 },
                souvenirs: 5,
            }
        };

        const result = calculateTotal(newTripData, mockConfig as any);
        
        set({ 
          tripData: newTripData,
          partialCO2: result.total
        });
      },

      reset: () => set({ 
        currentStep: 'origin', 
        tripData: initialTripData,
        partialCO2: 0 
      }),
    }),
    {
      name: 'carbon-wizard-storage',
    }
  )
);
