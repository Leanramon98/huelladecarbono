'use client';

import React from 'react';
import { useWizardStore } from '@/lib/store/useWizardStore';
import { EMISSION_FACTORS } from '@/lib/constants';
import { AccommodationType } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { Building2, Home, Hotel, Bed, Users, Plus, Minus } from 'lucide-react';
import { calculateAccommodationEmissions } from '@/lib/calculations';
import { motion } from 'framer-motion';

export default function StepAccommodation() {
  const t = useTranslations('wizard.accommodation');
  const { tripData, updateTripData } = useWizardStore();

  const types: { key: AccommodationType; icon: any; label: string; impact: number }[] = [
    { key: 'hotel5', icon: Hotel, label: t('hotel5'), impact: 100 },
    { key: 'hotel3', icon: Building2, label: t('hotel3'), impact: 60 },
    { key: 'airbnb', icon: Home, label: t('airbnb'), impact: 40 },
    { key: 'hostel', icon: Bed, label: t('hostel'), impact: 20 },
    { key: 'friends', icon: Users, label: t('friends'), impact: 5 },
  ];

  const currentAccommodationEmissions = calculateAccommodationEmissions(tripData.accommodation, tripData.accommodationNights);

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-3">
        {types.map((type) => {
          const Icon = type.icon;
          const isSelected = tripData.accommodation === type.key;
          return (
            <button
              key={type.key}
              onClick={() => updateTripData({ accommodation: type.key })}
              className={`p-5 rounded-2xl border-2 transition-all flex items-center gap-5 ${
                isSelected ? 'border-forest-500 bg-forest-50 shadow-md' : 'border-forest-100 bg-white hover:border-forest-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-forest-500 text-white' : 'bg-forest-100 text-forest-500'}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-grow flex flex-col items-start gap-1">
                <span className="font-bold text-forest-900">{type.label}</span>
                <div className="w-full bg-forest-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${type.impact}%` }}
                    className={`h-full ${type.impact > 70 ? 'bg-coral-500' : type.impact > 30 ? 'bg-orange-400' : 'bg-forest-400'}`}
                  />
                </div>
              </div>
              {isSelected && (
                <div className="w-6 h-6 bg-forest-500 rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-forest-100 shadow-sm flex items-center justify-between">
        <label className="font-bold text-forest-900 uppercase tracking-widest text-sm">{t('nights')}</label>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => updateTripData({ accommodationNights: Math.max(1, tripData.accommodationNights - 1) })}
            className="w-12 h-12 rounded-full border-2 border-forest-100 flex items-center justify-center hover:bg-forest-50 text-forest-700"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-3xl font-serif font-black text-forest-900 w-10 text-center">
            {tripData.accommodationNights}
          </span>
          <button 
            onClick={() => updateTripData({ accommodationNights: Math.min(15, tripData.accommodationNights + 1) })}
            className="w-12 h-12 rounded-full border-2 border-forest-100 flex items-center justify-center hover:bg-forest-50 text-forest-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 bg-sand-100 rounded-3xl border-2 border-forest-100 flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-forest-900 uppercase tracking-widest text-sm">
           <Hotel className="w-5 h-5 text-forest-500" />
           Alojamiento
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-serif font-bold text-forest-900">{Math.round(currentAccommodationEmissions)}</span>
          <span className="text-xs text-forest-500">kg CO₂</span>
        </div>
      </div>
    </div>
  );
}
