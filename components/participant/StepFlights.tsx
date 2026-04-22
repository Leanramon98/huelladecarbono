'use client';

import React, { useState, useEffect } from 'react';
import { useWizardStore } from '@/lib/store/useWizardStore';
import { CITIES, EMISSION_FACTORS } from '@/lib/constants';
import { City, FlightLeg } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { Plus, X, Search, Plane, ArrowRight } from 'lucide-react';
import { haversineDistance, calculateFlightEmissions } from '@/lib/calculations';
import { motion, AnimatePresence } from 'framer-motion';

export default function StepFlights() {
  const t = useTranslations('wizard.flights');
  const { tripData, updateTripData } = useWizardStore();
  const [hasStopovers, setHasStopovers] = useState(tripData.flights.length > 1);
  const [stopovers, setStopovers] = useState<City[]>(
    tripData.flights.length > 1 
      ? tripData.flights.slice(0, -1).map(f => f.to) 
      : []
  );
  const [stopoverSearchIndex, setStopoverSearchIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const rio = CITIES.find(c => c.iata === 'GIG')!;

  // Build legs whenever stopovers or other data changes
  useEffect(() => {
    const legs: FlightLeg[] = [];
    let currentFrom = tripData.origin;

    if (!currentFrom.lat) return;

    if (hasStopovers && stopovers.length > 0) {
      for (const stop of stopovers) {
        legs.push({
          from: currentFrom,
          to: stop,
          distanceKm: haversineDistance(currentFrom.lat, currentFrom.lng, stop.lat, stop.lng)
        });
        currentFrom = stop;
      }
    }

    // Final leg to Rio
    legs.push({
      from: currentFrom,
      to: rio,
      distanceKm: haversineDistance(currentFrom.lat, currentFrom.lng, rio.lat, rio.lng)
    });

    updateTripData({ flights: legs });
  }, [stopovers, hasStopovers, tripData.origin]);

  const filteredCities = CITIES.filter(city => 
    city.name.toLowerCase().includes(search.toLowerCase()) || 
    city.iata.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 5);

  const addStopover = (city: City) => {
    if (stopovers.length < 3) {
      setStopovers([...stopovers, city]);
    }
    setStopoverSearchIndex(null);
    setSearch('');
  };

  const removeStopover = (index: number) => {
    setStopovers(stopovers.filter((_, i) => i !== index));
  };

  const flightClasses = [
    { key: 'economy', label: 'Economy', mult: '1x' },
    { key: 'premium', label: 'Premium', mult: '1.5x' },
    { key: 'business', label: 'Business', mult: '2.9x' },
    { key: 'first', label: 'First', mult: '4x' },
  ] as const;

  const currentFlightEmissions = calculateFlightEmissions(tripData.flights, tripData.flightClass, tripData.roundTrip);

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Selector Directo / Escalas */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => { setHasStopovers(false); setStopovers([]); }}
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
            !hasStopovers ? 'border-forest-500 bg-forest-50 shadow-lg' : 'border-forest-100 bg-white hover:border-forest-300'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${!hasStopovers ? 'bg-forest-500 text-white' : 'bg-forest-50 text-forest-500'}`}>
            <Plane className="w-6 h-6" />
          </div>
          <span className="font-bold text-forest-900">{t('direct')}</span>
        </button>

        <button
          onClick={() => setHasStopovers(true)}
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
            hasStopovers ? 'border-forest-500 bg-forest-50 shadow-lg' : 'border-forest-100 bg-white hover:border-forest-300'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${hasStopovers ? 'bg-forest-500 text-white' : 'bg-forest-50 text-forest-500'}`}>
            <Search className="w-6 h-6" />
          </div>
          <span className="font-bold text-forest-900">{t('stopovers')}</span>
        </button>
      </div>

      <AnimatePresence>
        {hasStopovers && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col gap-4 bg-white p-6 rounded-3xl border border-forest-100"
          >
            <div className="flex items-center gap-4 text-xs font-bold text-forest-300 uppercase tracking-widest mb-2">
              <span>{tripData.origin.iata}</span>
              <ArrowRight className="w-4 h-4" />
              {stopovers.map((s, i) => (
                <React.Fragment key={i}>
                  <span className="text-forest-700">{s.iata}</span>
                  <ArrowRight className="w-4 h-4" />
                </React.Fragment>
              ))}
              <span>GIG</span>
            </div>

            {stopovers.map((city, index) => (
              <div key={index} className="flex items-center gap-4 bg-forest-50 p-4 rounded-2xl border border-forest-100">
                <span className="text-xl">{city.flag}</span>
                <div className="flex-grow font-bold text-forest-900">{city.name}</div>
                <button onClick={() => removeStopover(index)} className="text-forest-300 hover:text-coral-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}

            {stopovers.length < 3 && stopoverSearchIndex === null && (
              <button
                onClick={() => setStopoverSearchIndex(stopovers.length)}
                className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-forest-200 rounded-2xl text-forest-500 font-bold hover:border-forest-400"
              >
                <Plus className="w-5 h-5" />
                {t('addStopover')}
              </button>
            )}

            {stopoverSearchIndex !== null && (
              <div className="relative mt-2">
                <input
                  autoFocus
                  type="text"
                  placeholder="Ciudad de conexión..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-4 bg-white border-2 border-forest-500 rounded-2xl focus:outline-none"
                />
                {search && (
                  <div className="absolute z-50 top-full left-0 w-full bg-white border border-forest-200 rounded-2xl shadow-2xl mt-1 max-h-60 overflow-y-auto">
                    {filteredCities.map(city => (
                      <button
                        key={city.iata}
                        onClick={() => addStopover(city)}
                        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-forest-50 text-left border-b border-forest-50"
                      >
                         <span className="text-xl">{city.flag}</span>
                         <span className="font-bold text-forest-900">{city.name} ({city.iata})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clase y Ida/Vuelta */}
      <div className="flex flex-col gap-6">
        <label className="text-sm font-bold text-forest-900 uppercase tracking-widest px-2">{t('class')}</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {flightClasses.map(fc => (
            <button
              key={fc.key}
              onClick={() => updateTripData({ flightClass: fc.key })}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                tripData.flightClass === fc.key
                  ? 'bg-forest-500 border-forest-500 text-white shadow-md'
                  : 'bg-white border-forest-100 text-forest-700 hover:border-forest-300'
              }`}
            >
              <span className="text-xs font-bold uppercase">{fc.label}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tripData.flightClass === fc.key ? 'bg-white/20' : 'bg-forest-100'}`}>
                {fc.mult}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-forest-100 mt-4">
          <div className="flex flex-col">
            <span className="font-bold text-forest-900">{t('roundTrip')}</span>
            <span className="text-xs text-forest-500">Multiplica x2 las emisiones</span>
          </div>
          <button
            onClick={() => updateTripData({ roundTrip: !tripData.roundTrip })}
            className={`w-14 h-8 rounded-full p-1 transition-all flex items-center ${
              tripData.roundTrip ? 'bg-forest-500 justify-end' : 'bg-forest-200 justify-start'
            }`}
          >
            <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-md" />
          </button>
        </div>
      </div>

      {/* Subtotal del paso */}
      <div className="mt-4 p-6 bg-sand-100 rounded-3xl border-2 border-forest-100 flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-forest-900 uppercase tracking-widest text-sm">
           <Plane className="w-5 h-5 text-forest-500" />
           Vuelos
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-serif font-bold text-forest-900">{Math.round(currentFlightEmissions)}</span>
          <span className="text-xs text-forest-500">kg CO₂</span>
        </div>
      </div>
    </div>
  );
}
