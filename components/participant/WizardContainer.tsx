'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardStore } from '@/lib/store/useWizardStore';
import { useTranslations } from 'next-intl';
import { 
  Plane, 
  MapPin, 
  Car, 
  Home, 
  UtensilsCrossed, 
  ChevronLeft, 
  ChevronRight,
  Check,
  Sprout
} from 'lucide-react';
import { WizardStep } from '@/lib/types';

import StepOrigin from './StepOrigin';
import StepFlights from './StepFlights';
import StepTransport from './StepTransport';
import StepAccommodation from './StepAccommodation';
import StepExtras from './StepExtras';
import { useRouter } from 'next/navigation';

const steps: { key: WizardStep; icon: any; label: string; component: any }[] = [
  { key: 'origin', icon: MapPin, label: 'wizard.origin.title', component: StepOrigin },
  { key: 'flights', icon: Plane, label: 'wizard.flights.title', component: StepFlights },
  { key: 'transport', icon: Car, label: 'wizard.transport.title', component: StepTransport },
  { key: 'accommodation', icon: Home, label: 'wizard.accommodation.title', component: StepAccommodation },
  { key: 'extras', icon: UtensilsCrossed, label: 'wizard.extras.title', component: StepExtras },
];

export default function WizardContainer() {
  const t = useTranslations();
  const router = useRouter();
  const { currentStep, setStep, partialCO2, tripData } = useWizardStore();

  const currentIndex = steps.findIndex(s => s.key === currentStep);
  const CurrentStepComponent = steps[currentIndex].component;
  
  const handleNext = () => {
    if (currentStep === 'origin' && !tripData.origin?.iata) {
      alert('Por favor selecciona una ciudad de origen');
      return;
    }

    if (currentIndex === steps.length - 1) {
      router.push('/results');
      return;
    }

    if (currentIndex < steps.length - 1) {
      let nextIndex = currentIndex + 1;
      // Skip flights if local
      if (steps[nextIndex].key === 'flights' && tripData.isLocal) {
        nextIndex++;
      }
      if (nextIndex < steps.length) {
        setStep(steps[nextIndex].key);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      let prevIndex = currentIndex - 1;
      // Skip flights if local
      if (steps[prevIndex].key === 'flights' && tripData.isLocal) {
        prevIndex--;
      }
      if (prevIndex >= 0) {
        setStep(steps[prevIndex].key);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-6 py-10 flex flex-col min-h-[80vh] pb-32">
      <title>{`${currentIndex + 1}/5 | ${currentIndex === 0 ? 'Origen' : currentIndex === 1 ? 'Vuelos' : currentIndex === 2 ? 'Transporte' : currentIndex === 3 ? 'Alojamiento' : 'Extras'} - Huella de Carbono`}</title>
      
      {/* PROGRESS BAR */}
      <div className="flex justify-between items-center mb-16 relative px-4" aria-label={`Paso ${currentIndex + 1} de ${steps.length}`}>
        <div className="absolute top-5 left-0 w-full h-1 bg-forest-100 z-0" />
        <motion.div 
          initial={false}
          animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          className="absolute top-5 left-0 h-1 bg-forest-500 z-0 transition-all duration-500" 
        />
        
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isSkipped = step.key === 'flights' && tripData.isLocal;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isSkipped ? '#E9C46A' : (isActive || isCompleted ? '#2D6A4F' : '#FFF'),
                  scale: isActive ? 1.2 : 1,
                  borderColor: isActive || isCompleted ? '#2D6A4F' : '#E5E7EB'
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm transition-colors`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Icon className={`w-5 h-5 ${isActive || isSkipped ? 'text-white' : 'text-forest-300'}`} />
                )}
              </motion.div>
              <span className={`absolute -bottom-7 text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap hidden sm:block ${isActive ? 'text-forest-700' : 'text-forest-200'}`}>
                {step.key}
              </span>
            </div>
          );
        })}
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="flex-grow relative w-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center w-full"
          >
             <h2 className="text-3xl font-serif font-black text-forest-900 mb-2 text-center leading-tight">
               {t(steps[currentIndex].label)}
             </h2>
             <p className="text-forest-500 text-sm mb-10 text-center font-medium">
                {t('wizard.progress', { step: currentIndex + 1, total: steps.length })}
             </p>
             
             <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-12 gap-4">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${
            currentIndex === 0 
              ? 'opacity-0 pointer-events-none' 
              : 'text-forest-700 border-2 border-forest-100 hover:bg-forest-50'
          }`}
          aria-label="Volver al paso anterior"
        >
          <ChevronLeft className="w-5 h-5" />
          {t('wizard.nav.back')}
        </button>

        <button
          onClick={handleNext}
          className="w-full md:flex-grow flex items-center justify-center gap-3 bg-forest-700 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-forest-900/10 hover:bg-forest-800 transition-all"
          aria-label={currentIndex === steps.length - 1 ? 'Ver resultados finales' : 'Continuar al siguiente paso'}
        >
          {currentIndex === steps.length - 1 ? t('wizard.nav.seeResults') : t('wizard.nav.next')}
          {currentIndex !== steps.length - 1 && <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* PARTIAL CO2 WIDGET */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-dark/95 backdrop-blur-md text-white px-8 py-4 rounded-3xl flex items-center gap-6 shadow-2xl z-40 border border-white/10"
      >
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Huella parcial</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-serif font-bold">
              {Math.round(partialCO2)}
            </span>
            <span className="text-xs text-white/70">kg CO₂</span>
          </div>
        </div>
        <div className="w-10 h-10 bg-forest-500 rounded-full flex items-center justify-center">
           <Sprout className="w-6 h-6" />
        </div>
      </motion.div>
    </div>
  );
}
