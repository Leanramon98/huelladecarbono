'use client';

import React from 'react';
import { useWizardStore } from '@/lib/store/useWizardStore';
import { EMISSION_FACTORS } from '@/lib/constants';
import { TransportMode } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { Car, Bike, Bus, Navigation, Info } from 'lucide-react';
import { calculateTransportEmissions } from '@/lib/calculations';
import { motion } from 'framer-motion';

export default function StepTransport() {
  const t = useTranslations('wizard.transport');
  const { tripData, updateTripData } = useWizardStore();

  const toggleMode = (mode: TransportMode) => {
    const current = tripData.transport;
    if (current.includes(mode)) {
      updateTripData({ transport: current.filter(m => m !== mode) });
    } else {
      updateTripData({ transport: [...current, mode] });
    }
  };

  const modes: { key: TransportMode; icon: any; label: string; impact: string }[] = [
    { key: 'taxi', icon: Car, label: t('taxi'), impact: 'Alto' },
    { key: 'rental', icon: Navigation, label: t('rental'), impact: 'Medio' },
    { key: 'public', icon: Bus, label: t('public'), impact: 'Bajo' },
    { key: 'bike', icon: Bike, label: t('bike'), impact: 'Nulo' },
  ];

  const currentTransportEmissions = calculateTransportEmissions(tripData.transport, tripData.transportDays);

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="grid grid-cols-2 gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = tripData.transport.includes(mode.key);
          return (
            <button
              key={mode.key}
              onClick={() => toggleMode(mode.key)}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 text-center ${
                isSelected ? 'border-forest-500 bg-forest-50 shadow-lg scale-105' : 'border-forest-100 bg-white hover:border-forest-300 shadow-sm'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isSelected ? 'bg-forest-500 text-white' : 'bg-forest-100 text-forest-500'}`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-forest-900 leading-tight">{mode.label}</span>
                <span className={`text-[10px] font-bold uppercase mt-1 ${isSelected ? 'text-forest-700' : 'text-forest-300'}`}>
                   {mode.impact} impacto
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-forest-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <label className="font-bold text-forest-900 uppercase tracking-widest text-sm">{t('days')}</label>
          <span className="bg-forest-100 text-forest-700 px-4 py-1 rounded-full font-bold text-lg">
            {tripData.transportDays}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={tripData.transportDays}
          onChange={(e) => updateTripData({ transportDays: parseInt(e.target.value) })}
          className="w-full h-3 bg-forest-100 rounded-lg appearance-none cursor-pointer accent-forest-500"
        />
        <div className="flex justify-between mt-2 text-[10px] text-forest-300 font-bold uppercase">
          <span>1 día</span>
          <span>5 días</span>
          <span>10 días</span>
        </div>
      </div>

      <div className="p-6 bg-sand-100 rounded-3xl border-2 border-forest-100 flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-forest-900 uppercase tracking-widest text-sm">
           <Navigation className="w-5 h-5 text-forest-500" />
           Transporte LOCAL
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-serif font-bold text-forest-900">{Math.round(currentTransportEmissions)}</span>
          <span className="text-xs text-forest-500">kg CO₂</span>
        </div>
      </div>
    </div>
  );
}
