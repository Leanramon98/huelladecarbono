'use client';

import React from 'react';
import { useWizardStore } from '@/lib/store/useWizardStore';
import { useTranslations } from 'next-intl';
import { Utensils, Gift, Zap } from 'lucide-react';
import { calculateFoodEmissions, calculateExtrasEmissions } from '@/lib/calculations';
import { motion } from 'framer-motion';

export default function StepExtras() {
  const t = useTranslations('wizard.extras');
  const { tripData, updateTripData, setStep } = useWizardStore();

  const currentFoodEmissions = calculateFoodEmissions(tripData.transportDays || 4, tripData.redMeatMeals);
  const currentExtrasEmissions = calculateExtrasEmissions(tripData.hasSouvenirs);
  const subtotal = currentFoodEmissions + currentExtrasEmissions;

  const handleSkip = () => {
    updateTripData({ redMeatMeals: 4, hasSouvenirs: false });
    // Navigation is handled by the WizardContainer's next button, 
    // but the user wants a skip button inside the component too.
    // However, the "Next" button in container is what typically advances.
    // I'll make this skip button just set defaults and then the user can hit "Results".
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="bg-white p-10 rounded-3xl border border-forest-100 shadow-sm">
        <label className="block text-sm font-bold text-forest-900 uppercase tracking-widest mb-8 text-center">
          {t('meat')}
        </label>
        
        <div className="flex flex-col items-center gap-6">
          <div className="text-5xl mb-2">
            {tripData.redMeatMeals === 0 ? '🌱' : tripData.redMeatMeals > 8 ? '🥩' : '🍽️'}
          </div>
          <span className="text-2xl font-serif font-black text-forest-900 bg-forest-50 px-6 py-2 rounded-2xl">
            {tripData.redMeatMeals}
          </span>
          
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={tripData.redMeatMeals}
            onChange={(e) => updateTripData({ redMeatMeals: parseInt(e.target.value) })}
            className="w-full h-4 bg-forest-100 rounded-lg appearance-none cursor-pointer accent-forest-700"
          />
          
          <p className="text-sm font-medium text-forest-500 italic">
            {tripData.redMeatMeals === 0 
              ? "0 = sin carne roja 🌱" 
              : tripData.redMeatMeals === 12 
                ? "12 = todas las comidas 🥩" 
                : `${tripData.redMeatMeals} comidas con carne`}
          </p>
        </div>
      </div>

      <div 
        onClick={() => updateTripData({ hasSouvenirs: !tripData.hasSouvenirs })}
        className={`p-8 rounded-3xl border-2 transition-all cursor-pointer flex items-center gap-6 ${
          tripData.hasSouvenirs ? 'border-forest-500 bg-forest-50 shadow-lg' : 'border-forest-100 bg-white hover:border-forest-200'
        }`}
      >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tripData.hasSouvenirs ? 'bg-forest-500 text-white' : 'bg-forest-100 text-forest-300'}`}>
           <Gift className="w-8 h-8" />
        </div>
        <div className="flex flex-col flex-grow">
          <span className="font-bold text-forest-900">{t('souvenirs')}</span>
          <span className="text-xs text-forest-500 font-medium">+5 kg CO₂ aproximado</span>
        </div>
        <div className={`w-12 h-7 rounded-full p-1 transition-all flex items-center ${
          tripData.hasSouvenirs ? 'bg-forest-500 justify-end' : 'bg-forest-200 justify-start'
        }`}>
          <div className="w-5 h-5 bg-white rounded-full shadow-md" />
        </div>
      </div>

      <button 
        onClick={handleSkip}
        className="flex items-center justify-center gap-2 text-forest-400 hover:text-forest-600 font-bold text-sm uppercase tracking-widest mt-2"
      >
        <Zap className="w-4 h-4" />
        {t('skip')}
      </button>

      <div className="p-6 bg-sand-100 rounded-3xl border-2 border-forest-100 flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-forest-900 uppercase tracking-widest text-sm">
           <Utensils className="w-5 h-5 text-forest-500" />
           Extras y Comida
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-serif font-bold text-forest-900">{Math.round(subtotal)}</span>
          <span className="text-xs text-forest-500">kg CO₂</span>
        </div>
      </div>
    </div>
  );
}
