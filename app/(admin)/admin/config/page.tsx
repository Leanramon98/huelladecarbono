'use client';

import React, { useState } from 'react';
import { useEventConfigStore } from '@/lib/store/useEventConfigStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  RefreshCcw, 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  Palette, 
  Languages, 
  HeartHandshake, 
  Share2,
  Trash2,
  Plus,
  Globe,
  Settings,
  Eye
} from 'lucide-react';
import { CITIES } from '@/lib/constants';

type Tab = 'general' | 'branding' | 'languages' | 'compensation' | 'sharing';

export default function ConfigPage() {
  const { config, updateConfig, resetConfig } = useEventConfigStore();
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  const tabs: { key: Tab; icon: any; label: string }[] = [
    { key: 'general', icon: Settings, label: 'General' },
    { key: 'branding', icon: Palette, label: 'Branding' },
    { key: 'languages', icon: Languages, label: 'Idiomas' },
    { key: 'compensation', icon: HeartHandshake, label: 'Compensación' },
    { key: 'sharing', icon: Share2, label: 'Compartir' },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-serif font-black text-forest-900">Configuración del Evento</h1>
           <p className="text-forest-500 font-medium mt-1">Personalizá la experiencia del participante y los factores de emisión.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={resetConfig}
             className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
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
             {isSaving ? 'Guardando...' : 'Guardar Cambios'}
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* TABS SELECTOR */}
        <div className="lg:w-64 flex flex-col gap-2 shrink-0">
           {tabs.map((tab) => (
             <button
               key={tab.key}
               onClick={() => setActiveTab(tab.key)}
               className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                 activeTab === tab.key 
                   ? 'bg-forest-900 text-white shadow-xl shadow-forest-900/20 translate-x-2' 
                   : 'bg-white text-forest-300 hover:bg-forest-50 hover:text-forest-700 border border-gray-100'
               }`}
             >
               <tab.icon className="w-5 h-5" />
               {tab.label}
             </button>
           ))}
        </div>

        {/* TAB CONTENT */}
        <div className="flex-grow">
          <div className="bg-white rounded-[40px] border border-gray-100 p-10 min-h-[500px]">
             <AnimatePresence mode="wait">
                {activeTab === 'general' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="general" className="flex flex-col gap-8">
                    <h3 className="text-xl font-serif font-bold text-forest-900">Información General</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Nombre del Evento</label>
                          <input 
                            type="text" 
                            value={config.name}
                            onChange={(e) => updateConfig({ name: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-forest-500 focus:outline-none font-bold"
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Ciudad Sede</label>
                          <select 
                            value={config.city}
                            onChange={(e) => updateConfig({ city: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-forest-500 focus:outline-none font-bold appearance-none"
                          >
                             {CITIES.filter(c => c.iata === 'GIG' || c.name === 'Río de Janeiro').map(c => (
                               <option key={c.iata} value={c.name}>{c.name} ({c.iata})</option>
                             ))}
                          </select>
                       </div>

                       <div className="space-y-3">
                          <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Logo del Evento</label>
                          <div className="flex items-center gap-6 p-6 bg-gray-50 border border-dashed border-gray-200 rounded-3xl">
                             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-gray-100 text-gray-300">
                                <ImageIcon size={24} />
                             </div>
                             <button className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-dark shadow-sm">
                               Subir imagen
                             </button>
                          </div>
                       </div>

                       <div className="space-y-3">
                          <label className="text-xs font-black uppercase text-gray-400 tracking-widest">URL Personalizada</label>
                          <div className="flex items-center gap-2 px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl">
                             <span className="text-gray-400 text-sm">huella.evento.com/</span>
                             <input 
                                type="text" 
                                placeholder="cop28-rio"
                                className="flex-grow bg-transparent focus:outline-none font-bold text-sm"
                             />
                          </div>
                       </div>

                       <div className="space-y-3">
                          <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Fecha Inicio</label>
                          <input type="date" value={config.dates.start} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 font-bold" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Fecha Fin</label>
                          <input type="date" value={config.dates.end} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 font-bold" />
                       </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'branding' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="branding" className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-8">
                       <h3 className="text-xl font-serif font-bold text-forest-900">Paleta de Colores</h3>
                       <div className="grid grid-cols-2 gap-6">
                           {[
                             { key: 'primaryColor', label: 'Color Primario' },
                             { key: 'secondaryColor', label: 'Color Secundario' },
                             { key: 'accentColor', label: 'Color Acento' },
                             { key: 'bgColor', label: 'Color de Fondo' },
                           ].map((c) => (
                             <div key={c.key} className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{c.label}</label>
                                <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl">
                                   <input 
                                     type="color" 
                                     value={(config.branding as any)[c.key]}
                                     onChange={(e) => updateConfig({ branding: { ...config.branding, [c.key]: e.target.value } })}
                                     className="w-10 h-10 border-none bg-transparent rounded-full overflow-hidden cursor-pointer"
                                   />
                                   <span className="text-xs font-mono font-bold text-gray-500 uppercase">{(config.branding as any)[c.key]}</span>
                                </div>
                             </div>
                           ))}
                       </div>

                       <h3 className="text-xl font-serif font-bold text-forest-900 mt-4">Tipografía</h3>
                       <div className="space-y-3">
                          <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Fuente Principal (Títulos)</label>
                          <select className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 font-bold text-sm">
                             <option>Fraunces (Serif)</option>
                             <option>Space Grotesk (Sans)</option>
                             <option>Outfit (Sans)</option>
                             <option>Lora (Serif)</option>
                          </select>
                       </div>
                    </div>

                    <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 flex flex-col items-center">
                       <div className="flex items-center gap-2 mb-6 self-start text-xs font-black text-gray-400 uppercase tracking-widest">
                          <Eye size={16} /> Preview de Participante
                       </div>
                       {/* MINI PREVIEW */}
                       <div className="w-[300px] h-[450px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-200" style={{ backgroundColor: config.branding.bgColor }}>
                          <header className="p-4 flex items-center justify-between border-b border-gray-100 bg-white/50 backdrop-blur-md">
                             <div className="w-6 h-6 rounded bg-dark" style={{ backgroundColor: config.branding.primaryColor }} />
                             <div className="flex gap-1">
                               <div className="w-4 h-2 bg-gray-200 rounded-full" />
                               <div className="w-4 h-2 bg-gray-200 rounded-full" />
                               <div className="w-4 h-2 bg-gray-200 rounded-full" />
                             </div>
                          </header>
                          <main className="flex-grow p-6 flex flex-col items-center justify-center text-center gap-4">
                             <h4 className="text-xl font-bold leading-tight" style={{ color: config.branding.primaryColor, fontFamily: 'serif' }}>Medí tu huella de viaje</h4>
                             <p className="text-[10px] text-gray-500 leading-relaxed">Descubrí el impacto de tu viaje a {config.city}</p>
                             <button className="mt-4 px-8 py-2 rounded-full text-[10px] font-bold text-white shadow-lg" style={{ backgroundColor: config.branding.primaryColor }}>
                                Empezar
                             </button>
                          </main>
                          <footer className="p-4 text-center text-[8px] text-gray-300 font-bold uppercase tracking-widest">Powered by CarbonEvent</footer>
                       </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'languages' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="languages" className="flex flex-col gap-10">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['Español', 'Inglés', 'Portugués'].map((lang, i) => (
                          <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                             <div className="flex flex-col">
                                <span className="font-bold text-forest-900">{lang}</span>
                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Activo</span>
                             </div>
                             <div className="w-12 h-6 bg-forest-500 rounded-full flex items-center justify-end p-1">
                                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                             </div>
                          </div>
                        ))}
                     </div>

                     <div className="space-y-6">
                        <h3 className="font-serif font-black text-lg text-forest-900">Custom Text Overrides</h3>
                        <div className="border border-gray-100 rounded-3xl overflow-hidden">
                           <table className="w-full text-sm text-left">
                              <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100">
                                 <tr>
                                    <th className="px-8 py-4">Clave</th>
                                    <th className="px-8 py-4">Default</th>
                                    <th className="px-8 py-4">Custom</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr className="border-b border-gray-50">
                                    <td className="px-8 py-4 font-mono text-xs">welcome.title</td>
                                    <td className="px-8 py-4 text-gray-400">Medí tu huella de viaje</td>
                                    <td className="px-8 py-4">
                                       <input type="text" placeholder="¿Cómo viajaste al evento?" className="w-full bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs focus:border-forest-500 outline-none" />
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="px-8 py-4 font-mono text-xs">welcome.cta</td>
                                    <td className="px-8 py-4 text-gray-400">Empezar</td>
                                    <td className="px-8 py-4">
                                       <input type="text" placeholder="¡Calcular ahora!" className="w-full bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs focus:border-forest-500 outline-none" />
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </motion.div>
                )}

                {activeTab === 'compensation' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="compensation" className="flex flex-col gap-10">
                     <div className="flex items-center justify-between p-8 bg-forest-50 border border-forest-100 rounded-[32px]">
                        <div className="flex gap-4 items-center">
                           <div className="w-12 h-12 bg-forest-700 text-white flex items-center justify-center rounded-2xl">
                             <HeartHandshake />
                           </div>
                           <div>
                              <h4 className="font-serif font-black text-xl text-forest-900">Módulo de Compensación</h4>
                              <p className="text-xs text-forest-700">Permite a los usuarios redirigir hacia programas certificados.</p>
                           </div>
                        </div>
                        <div className="w-14 h-8 bg-forest-500 rounded-full flex items-center justify-end p-1">
                           <div className="w-6 h-6 bg-white rounded-full shadow-md" />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Precio por Ton CO₂ (USD)</label>
                           <input type="number" value={config.compensationPricePerTon} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 font-bold" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Texto del CTA</label>
                           <input type="text" placeholder="Compensar ahora" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 font-bold" />
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <h4 className="font-serif font-bold text-lg text-forest-900">Programas Asociados (Max 5)</h4>
                           <button className="flex items-center gap-2 px-4 py-2 bg-forest-100 text-forest-700 rounded-xl text-xs font-bold">
                              <Plus size={14} /> Agregar
                           </button>
                        </div>
                        <div className="flex flex-col gap-3">
                           {config.offsetLinks.map((link, i) => (
                             <div key={i} className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-300">
                                   <ImageIcon size={18} />
                                </div>
                                <div className="flex-grow grid grid-cols-2 gap-4">
                                   <input type="text" value={link.name} className="bg-transparent font-bold border-b border-gray-100 py-1" />
                                   <input type="text" value={link.url} className="bg-transparent text-xs text-forest-500 border-b border-gray-100 py-1" />
                                </div>
                                <button className="text-gray-300 hover:text-coral-500 transition-colors">
                                   <Trash2 size={18} />
                                </button>
                             </div>
                           ))}
                        </div>
                     </div>
                  </motion.div>
                )}

                {activeTab === 'sharing' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="sharing" className="flex flex-col gap-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['WhatsApp', 'Instagram', 'LinkedIn', 'X Card'].map((s, i) => (
                          <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                                <Share2 size={18} className="text-gray-400" />
                             </div>
                             <span className="text-xs font-bold text-dark">{s}</span>
                             <div className="w-10 h-5 bg-forest-200 rounded-full flex items-center justify-start p-1">
                                <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                             </div>
                          </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                       <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Plantilla Mensaje de Compartir</label>
                       <textarea 
                          rows={4}
                          className="w-full px-6 py-4 bg-gray-50 rounded-3xl border border-gray-100 focus:outline-none focus:border-forest-500 font-bold text-sm"
                          defaultValue="¡Mi viaje a {evento} generó {resultado} de CO₂! 🌍 Calculá tu huella vos también en: {url}"
                       />
                       <p className="text-[10px] text-gray-400 font-medium italic">Tip: Usá {'{resultado}'}, {'{evento}'} y {'{url}'} para insertar datos dinámicos.</p>
                    </div>

                    <div className="bg-sand-100 p-8 rounded-[40px] border border-forest-100 overflow-hidden relative group">
                       <h4 className="text-xs font-black uppercase text-forest-700 tracking-widest mb-6">Preview Card Social</h4>
                       <div className="aspect-video w-full max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden relative flex flex-col p-8" style={{ backgroundColor: config.branding.primaryColor }}>
                          <div className="flex-grow flex flex-col items-center justify-center text-center text-white gap-2">
                             <div className="w-12 h-12 bg-white/20 rounded-2xl mb-4" />
                             <h5 className="text-2xl font-serif font-black underline decoration-white/30 underline-offset-4 leading-none">524 kg CO₂</h5>
                             <p className="text-xs font-bold opacity-80 mt-2 tracking-widest uppercase italic">Mi huella en {config.name}</p>
                          </div>
                          <footer className="flex justify-between items-end border-t border-white/10 pt-4">
                             <div className="text-[8px] font-black uppercase text-white/50 tracking-widest">Medí tu huella →</div>
                             <div className="text-[10px] font-bold text-white italic">CarbonEvent</div>
                          </footer>
                       </div>
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
