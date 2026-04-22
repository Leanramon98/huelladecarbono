'use client';

import React, { useState } from 'react';
import { CITIES as INITIAL_CITIES } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Upload, 
  MapPin, 
  Edit2, 
  Trash2, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X
} from 'lucide-react';

export default function CitiesPage() {
  const [cities, setCities] = useState(INITIAL_CITIES);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<any>(null);

  const filteredCities = cities.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.iata.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFeatured = (iata: string) => {
    setCities(cities.map(c => 
      c.iata === iata ? { ...c, featured: !(c as any).featured } : c
    ));
  };

  const deleteCity = (iata: string) => {
    if (confirm('¿Estás seguro de eliminar esta ciudad?')) {
      setCities(cities.filter(c => c.iata !== iata));
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-serif font-black text-forest-900">Ciudades y Aeropuertos</h1>
           <p className="text-forest-500 font-medium mt-1">Gestioná los puntos de origen y aeropuertos disponibles en el wizard.</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">
             <Upload className="w-4 h-4" />
             Importar CSV
           </button>
           <button 
             onClick={() => { setEditingCity(null); setIsModalOpen(true); }}
             className="flex items-center gap-2 px-8 py-3 bg-forest-900 text-white rounded-2xl text-sm font-bold hover:bg-black transition-all shadow-lg shadow-forest-900/20"
           >
             <Plus className="w-4 h-4" />
             Agregar Ciudad
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center gap-6">
           <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Buscar ciudad o IATA..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-forest-500 font-medium"
              />
           </div>
           <div className="ml-auto flex items-center gap-4 text-xs font-bold text-gray-400">
              <span>{filteredCities.length} ciudades encontradas</span>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-50">
                 <th className="px-8 py-4">Ciudad</th>
                 <th className="px-8 py-4">IATA</th>
                 <th className="px-8 py-4">Coord. (Lat/Lng)</th>
                 <th className="px-8 py-4">Destacada</th>
                 <th className="px-8 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.slice(0, 15).map((city) => (
                <tr key={city.iata} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all group">
                   <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                         <span className="text-xl">{city.flag}</span>
                         <div className="flex flex-col">
                            <span className="font-bold text-forest-900">{city.name}</span>
                            <span className="text-[10px] text-gray-400 uppercase font-black">{city.nameEn}</span>
                         </div>
                      </div>
                   </td>
                   <td className="px-8 py-5 font-mono text-sm font-bold text-forest-500 uppercase">{city.iata}</td>
                   <td className="px-8 py-5 text-xs text-gray-400 font-mono">
                      {city.lat.toFixed(2)}, {city.lng.toFixed(2)}
                   </td>
                   <td className="px-8 py-5">
                      <button 
                        onClick={() => toggleFeatured(city.iata)}
                        className={`transition-all ${ (city as any).featured ? 'text-sand-500 scale-125' : 'text-gray-200 hover:text-sand-300' }`}
                      >
                         <Star size={18} fill={(city as any).featured ? 'currentColor' : 'none'} />
                      </button>
                   </td>
                   <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 text-gray-400 hover:text-forest-700 hover:bg-forest-50 rounded-xl transition-all">
                            <Edit2 size={16} />
                         </button>
                         <button 
                           onClick={() => deleteCity(city.iata)}
                           className="p-2 text-gray-400 hover:text-coral-500 hover:bg-coral-50 rounded-xl transition-all"
                         >
                            <Trash2 size={16} />
                         </button>
                      </div>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
           <span className="text-xs font-bold text-gray-400">Mostrando 1 - 15 de {filteredCities.length}</span>
           <div className="flex items-center gap-2">
              <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-300 pointer-events-none transition-all">
                 <ChevronLeft size={18} />
              </button>
              <button className="p-2 bg-white border border-gray-200 rounded-xl text-forest-700 hover:border-forest-400 shadow-sm transition-all">
                 <ChevronRight size={18} />
              </button>
           </div>
        </div>
      </div>

      {/* CITY MODAL (Simplified) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-10 flex flex-col gap-8"
             >
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-serif font-black text-forest-900">Agregar Nueva Ciudad</h2>
                   <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-dark">
                      <X size={24} />
                   </button>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                   <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Nombre Ciudad</label>
                      <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-forest-500 font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Código IATA</label>
                      <input type="text" placeholder="EZE" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-forest-500 font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">País (ISO)</label>
                      <input type="text" placeholder="AR" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-forest-500 font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Latitud</label>
                      <input type="number" step="0.0001" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-forest-500 font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Longitud</label>
                      <input type="number" step="0.0001" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-forest-500 font-bold" />
                   </div>
                </div>

                <div className="flex gap-4 mt-4">
                   <button onClick={() => setIsModalOpen(false)} className="flex-grow py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all">Cancelar</button>
                   <button className="flex-grow py-4 bg-forest-900 text-white rounded-2xl font-bold shadow-xl shadow-forest-900/20 hover:bg-black transition-all">Guardar Ciudad</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
