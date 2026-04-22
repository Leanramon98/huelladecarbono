'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Table, 
  Filter, 
  Calendar, 
  MapPin, 
  TrendingDown, 
  CheckCircle,
  FileSpreadsheet,
  FileBox
} from 'lucide-react';

export default function ExportPage() {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExport = (type: string) => {
    setIsExporting(type);
    setTimeout(() => setIsExporting(null), 2000);
  };

  const mockPreviewData = [
    { date: '21/04/2024', origin: 'Madrid', total: '1.2t', method: 'Avión' },
    { date: '21/04/2024', origin: 'Buenos Aires', total: '2.5t', method: 'Avión' },
    { date: '20/04/2024', origin: 'Río (Local)', total: '0.1t', method: 'Bus' },
    { date: '20/04/2024', origin: 'CDMX', total: '1.8t', method: 'Avión' },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-serif font-black text-forest-900">Exportar Datos</h1>
           <p className="text-forest-500 font-medium mt-1">Descargá los reportes detallados y la base de datos de mediciones.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* FILTERS SIDEBAR */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8 h-fit">
           <div className="flex items-center gap-2 text-dark font-serif font-bold">
              <Filter size={18} className="text-forest-500" />
              Filtros
           </div>

           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Rango de Fechas</label>
                 <div className="flex flex-col gap-2">
                    <div className="relative">
                       <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                       <input type="date" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold" />
                    </div>
                    <div className="relative">
                       <input type="date" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold" />
                    </div>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Ciudad Origen</label>
                 <select className="w-full px-6 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold appearance-none">
                    <option>Cualquiera</option>
                    <option>Madrid</option>
                    <option>Buenos Aires</option>
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Rango de Huella (kg)</label>
                 <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold" />
                    <span className="text-gray-300">-</span>
                    <input type="number" placeholder="Max" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold" />
                 </div>
              </div>
           </div>

           <button className="w-full py-4 bg-gray-100 text-dark rounded-2xl text-sm font-bold hover:bg-gray-200 transition-all">
              Limpiar Filtros
           </button>
        </div>

        {/* EXPORT OPTIONS AND PREVIEW */}
        <div className="lg:col-span-2 flex flex-col gap-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => handleExport('csv')}
                className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center gap-3 hover:border-forest-500 transition-all group"
              >
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-forest-50 transition-colors">
                    <FileSpreadsheet className="text-forest-700" size={24} />
                 </div>
                 <span className="font-bold text-dark text-sm">Exportar CSV</span>
                 {isExporting === 'csv' ? <span className="text-[10px] font-black text-forest-500 uppercase">Generando...</span> : <span className="text-[10px] text-gray-400 uppercase font-black">Base de datos</span>}
              </button>

              <button 
                onClick={() => handleExport('pdf')}
                className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center gap-3 hover:border-coral-500 transition-all group"
              >
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-coral-50 transition-colors">
                    <FileText className="text-coral-500" size={24} />
                 </div>
                 <span className="font-bold text-dark text-sm">Reporte PDF</span>
                 {isExporting === 'pdf' ? <span className="text-[10px] font-black text-coral-500 uppercase">Generando...</span> : <span className="text-[10px] text-gray-400 uppercase font-black">Gráficos + KPIs</span>}
              </button>

              <button 
                onClick={() => handleExport('xlsx')}
                className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center gap-3 hover:border-ocean-500 transition-all group"
              >
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-ocean-50 transition-colors">
                    <FileBox className="text-ocean-700" size={24} />
                 </div>
                 <span className="font-bold text-dark text-sm">Exportar Excel</span>
                 {isExporting === 'xlsx' ? <span className="text-[10px] font-black text-ocean-500 uppercase">Generando...</span> : <span className="text-[10px] text-gray-400 uppercase font-black">Formato nativo</span>}
              </button>
           </div>

           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                 <div className="flex items-center gap-3">
                    <Table size={20} className="text-gray-400" />
                    <span className="font-serif font-bold text-dark">Vista previa de la data</span>
                 </div>
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mostrando 4 de 124</span>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[10px] uppercase font-black text-gray-400 tracking-widest border-b border-gray-50">
                          <th className="px-8 py-4">Fecha</th>
                          <th className="px-8 py-4">Origen</th>
                          <th className="px-8 py-4">Total</th>
                          <th className="px-8 py-4">Método</th>
                       </tr>
                    </thead>
                    <tbody>
                       {mockPreviewData.map((row, i) => (
                         <tr key={i} className="border-b border-gray-50 last:border-none font-medium text-xs">
                            <td className="px-8 py-4 text-gray-500">{row.date}</td>
                            <td className="px-8 py-4 text-dark font-bold">{row.origin}</td>
                            <td className="px-8 py-4"><span className="px-2 py-1 bg-forest-50 text-forest-700 rounded-lg text-[10px] font-black uppercase">{row.total}</span></td>
                            <td className="px-8 py-4 text-gray-400">{row.method}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="p-8 text-center text-gray-300 text-[10px] font-bold uppercase tracking-widest italic">
                 Los datos sensibles (nombres, emails) están anonimizados en este reporte
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
