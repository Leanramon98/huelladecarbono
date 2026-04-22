import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EventConfig } from '../types';

interface EventConfigState {
  config: EventConfig;
  updateConfig: (data: Partial<EventConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: EventConfig = {
  name: 'Mi Gran Evento 2024',
  logo: '',
  city: 'Río de Janeiro',
  cityCoords: { lat: -22.81, lng: -43.2506 },
  dates: { start: '2024-11-01', end: '2024-11-05' },
  languages: ['es', 'en', 'pt'],
  defaultLanguage: 'es',
  branding: {
    primaryColor: '#2D6A4F',
    secondaryColor: '#52B788',
    accentColor: '#E76F51',
    bgColor: '#FEFAE0',
  },
  compensationEnabled: true,
  compensationPricePerTon: 12,
  offsetLinks: [
    { name: 'Pachama', url: 'https://pachama.com', logo: '' },
    { name: 'Gold Standard', url: 'https://goldstandard.org', logo: '' },
  ],
  emissionFactors: {
    flight: { basePerKm: 0.255, rfi: 1.9 },
    transport: { taxi: 0.21, public: 0.04, rental: 0.17, bike: 0 },
    accommodation: { hotel5: 30, hotel3: 20, airbnb: 10, hostel: 5, friends: 3 },
    food: { basePerDay: 5, redMeatExtra: 3 },
    souvenirs: 5,
  },
};

export const useEventConfigStore = create<EventConfigState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      updateConfig: (data) => set((state) => ({ 
        config: { ...state.config, ...data } 
      })),
      resetConfig: () => set({ config: defaultConfig }),
    }),
    {
      name: 'event-config-storage',
    }
  )
);
