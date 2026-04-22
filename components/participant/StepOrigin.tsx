'use client';

import React, { useState } from 'react';
import { useWizardStore } from '@/lib/store/useWizardStore';
import { CITIES } from '@/lib/constants';
import { City } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { Search, MapPin, Check } from 'lucide-react';
import { haversineDistance } from '@/lib/calculations';
import { motion } from 'framer-motion';

export default function StepOrigin() {
  const t = useTranslations('wizard.origin');
  const { tripData, updateTripData, setStep } = useWizardStore();
  const [search, setSearch] = useState('');

  const rio = CITIES.find(c => c.iata === 'GIG')!;

  const filteredCities = CITIES.filter(city => 
    city.name.toLowerCase().includes(search.toLowerCase()) || 
    city.iata.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 5);

  const popularCities = ['EZE', 'MAD', 'MEX', 'JFK', 'GRU'].map(iata => 
    CITIES.find(c => c.iata === iata)!
  );

  const handleSelect = (city: City) => {
    updateTripData({ origin: city, isLocal: city.iata === 'GIG' });
  };

  const handleLocal = () => {
    updateTripData({ origin: rio, isLocal: true });
    setStep('transport'); // Skip flights
  };

  const distanceToRio = tripData.origin?.lat 
    ? haversineDistance(tripData.origin.lat, tripData.origin.lng, rio.lat, rio.lng)
    : 0;

  return (
    <div className="flex flex-col gap-8 w-full max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-forest-300" />
        </div>
        <input
          type="text"
          placeholder={t('placeholder')}
          aria-label="Buscar ciudad de origen"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-forest-50 border-2 border-forest-100 rounded-2xl focus:border-forest-500 focus:outline-none text-forest-900 font-medium transition-all"
        />
      </div>

      {search && (
        <div className="bg-white border border-forest-100 rounded-2xl overflow-hidden shadow-xl shadow-forest-900/5 max-h-60 overflow-y-auto">
          {filteredCities.map(city => (
            <button
              key={city.iata}
              onClick={() => { handleSelect(city); setSearch(''); }}
              aria-label={`Seleccionar ${city.name}`}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-forest-50 transition-colors border-b border-forest-50 last:border-none"
            >
              <span className="text-2xl" role="img" aria-label={`Bandera de ${city.name}`}>{city.flag}</span>
              <div className="text-left flex-grow">
                <div className="font-bold text-forest-900">{city.name}</div>
                <div className="text-xs text-forest-500 uppercase tracking-widest">{city.iata}</div>
              </div>
              {tripData.origin?.iata === city.iata && <Check className="w-5 h-5 text-forest-500" />}
            </button>
          ))}
        </div>
      )}

      {!search && (
        <div className="flex flex-wrap gap-2 justify-center">
          {popularCities.map(city => (
            <button
              key={city.iata}
              onClick={() => handleSelect(city)}
              className={`px-4 py-2 rounded-full border-2 transition-all flex items-center gap-2 ${
                tripData.origin?.iata === city.iata
                  ? 'bg-forest-500 border-forest-500 text-white shadow-lg'
                  : 'bg-white border-forest-100 text-forest-700 hover:border-forest-300'
              }`}
            >
              <span>{city.flag}</span>
              <span className="text-sm font-bold">{city.iata}</span>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={handleLocal}
        className={`w-full py-4 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold transition-all ${
          tripData.isLocal
            ? 'bg-forest-500 border-forest-500 text-white shadow-lg'
            : 'bg-white border-2 border-dashed border-forest-200 text-forest-500 hover:border-forest-400'
        }`}
      >
        <MapPin className="w-5 h-5" />
        {t('local')}
      </button>

      {tripData.origin?.lat && !tripData.isLocal && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4 bg-orange-50 rounded-2xl border border-orange-100 text-orange-800 font-medium"
        >
          📍 {Math.round(distanceToRio).toLocaleString()} km hasta Río de Janeiro
        </motion.div>
      )}
    </div>
  );
}
