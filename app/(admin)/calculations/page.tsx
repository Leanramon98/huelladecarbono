'use client';

import React, { useState } from 'react';
import { useEventConfigStore } from '@/lib/store/useEventConfigStore';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Info, 
  RefreshCcw, 
  Save, 
  Plane, 
  Car, 
  Building2, 
  Utensils 
} from 'lucide-react';

export default function CalculationsPage() {
  const { config, updateConfig, resetConfig } = useEventConfigStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  const sections = [
    { 
      title: 'Vuelos', 
      icon: Plane, 
      color: 'text-forest-700',
      factors: [
        { key: 'flight.basePerKm', label: 'Base por Km (kg CO₂)', value: config.emissionFactors.flight.basePerKm, default: 0.255, info: 'Basado en promedio ICAO para vuelos de media distancia.' },
        { key: 'flight.rfi', label: 'Factor RFI (Multiplicador)', value: config.emissionFactors.flight.rfi, default: 1.9, info: 'Impacto radiativo no-CO2 (nubes, NOx). Sugerido por DEFRA.' },
      ]
    },
    { 
      title: 'Transporte Local', 
      icon: Car, 
      color: 'text-ocean-700',
      factors: [
        { key: 'transport.taxi', label: 'Taxi / Uber por día', value: config.emissionFactors.transport.taxi, default: 0.21, info: 'Promedio ciudad considerando 15km recorridos.' },
        { key: 'transport.rental', label: 'Auto Alquiler por día', value: config.emissionFactors.transport.rental, default: 0.17, info: 'Basado en combustión interna segmento B.' },
        { key: 'transport.public', label: 'Transporte Público por día', value: config.emissionFactors.transport.public, default: 0.04, info: 'Metro y Bus (Río de Janeiro).' },
      ]
    },
    { 
      title: 'Alojamiento', 
      icon: Building2, 
      color: 'text-coral-500',
      factors: [
        { key: 'accommodation.hotel5', label: 'Hotel 5★ (por noche)', value: config.emissionFactors.accommodation.hotel5, default: 30, info: 'Consumo alto de aire acondicionado y servicios.' },
        { key: 'accommodation.hotel3', label: 'Hotel 3★ (por noche)', value: config.emissionFactors.accommodation.hotel3, default: 20, info: 'Consumo estándar hotelero.' },
        { key: 'accommodation.airbnb', label: 'Airbnb / Casa (por noche)', value: config.emissionFactors.accommodation.airbnb, default: 10, info: 'Mismo factor que vivienda residencial.' },
      ]
    },
    { 
      title: 'Alimentación y Souvenirs', 
      icon: Utensils, 
      color: 'text-forest-900',
      factors: [
        { key: 'food.basePerDay', label: 'Dieta Base (por día)', value: config.emissionFactors.food.basePerDay, default: 5, info: 'Dieta promedio sin excesos de carne.' },
        { key: 'food.redMeatExtra', label: 'Extra Carne Roja (por comida)', value: config.emissionFactors.food.redMeatExtra, default: 3, info: 'Impacto adicional por producción bovina.' },
        { key: 'souvenirs', label: 'Souvenirs (total)', value: config.emissionFactors.souvenirs, default: 5, info: 'Impacto promedio de compras y empaques.' },
      ]
    }
  ];

  const updateFactor = (path: string, value: number) => {
    const newFactors = { ...config.emissionFactors };
    const parts = path.split('.');
    if (parts.length === 2) {
      (newFactors as any)[parts[0]][parts[1]] = value;
    } else {
      (newFactors as any)[parts[0]] = value;
    }
    updateConfig({ emissionFactors: newFactors });
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-serif font-black text-forest-900">Factores de Cálculo</h1>
           <p className="text-forest-500 font-medium mt-1">Configurá los coeficientes técnicos que rigen la medición de huella.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={resetConfig}
             className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-2xl text-sm font-bold text-gray-400 hover:bg-gray-50 transition-all"
           >
             <RefreshCcw className="w-4 h-4" />
             Restaurar defaults
           </button>
           <button 
             onClick={handleSave}
             className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold text-white transition-all shadow-lg ${
               isSaving ? 'bg-forest-400' : 'bg-forest-900 hover:bg-black'
             }`}
           >
             <Save className="w-4 h-4" />
             {isSaving ? 'Guardando...' : 'Guardar Factores'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {sections.map((section) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm shadow-forest-900/5"
          >
            <div className="p-8 border-b border-gray-50 flex items-center gap-4">
               <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center ${section.color}`}>
                  <section.icon size={24} />
               </div>
               <h2 className="text-xl font-serif font-bold text-forest-900">{section.title}</h2>
            </div>
            
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-50">
                     <tr>
                        <th className="px-8 py-4">Parámetro</th>
                        <th className="px-8 py-4">Valor Actual</th>
                        <th className="px-8 py-4">Default</th>
                        <th className="px-8 py-4">Info</th>
                     </tr>
                  </thead>
                  <tbody>
                     {section.factors.map((f) => (
                       <tr key={f.key} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all">
                          <td className="px-8 py-6 font-bold text-forest-900 text-sm">{f.label}</td>
                          <td className="px-8 py-6">
                             <input 
                               type="number" 
                               step="0.001"
                               value={f.value}
                               onChange={(e) => updateFactor(f.key, parseFloat(e.target.value))}
                               className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-forest-500 outline-none font-mono text-sm font-bold"
                             />
                          </td>
                          <td className="px-8 py-6 text-xs text-gray-400 font-mono">{f.default}</td>
                          <td className="px-8 py-6">
                             <div className="group relative">
                                <Info className="w-4 h-4 text-gray-300 hover:text-forest-500 cursor-help transition-colors" />
                                <div className="absolute left-0 bottom-full mb-2 w-48 p-3 bg-dark text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl leading-relaxed">
                                   {f.info}
                                </div>
                             </div>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
