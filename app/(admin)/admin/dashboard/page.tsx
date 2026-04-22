'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Globe, 
  BarChart3, 
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
  Filter,
  Calendar,
  MoreVertical,
  MapPin
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';

// --- MOCK DATA GENERATOR ---
const generateMockSubmissions = (count: number) => {
  const origins = ['São Paulo', 'Buenos Aires', 'Madrid', 'Río de Janeiro', 'CDMX', 'New York', 'Santiago', 'Bogotá', 'Miami', 'Lisboa'];
  const categories = ['flights', 'transport', 'accommodation', 'food'];
  
  return Array.from({ length: count }).map((_, i) => {
    const total = Math.random() * 4000 + 100;
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    
    return {
      id: `sub_${i}`,
      timestamp: date,
      origin: origins[Math.floor(Math.random() * origins.length)],
      total,
      breakdown: {
        flights: total * 0.7,
        transport: total * 0.1,
        accommodation: total * 0.15,
        extras: total * 0.05
      }
    };
  });
};

const MOCK_DATA = generateMockSubmissions(85);

export default function AdminDashboard() {
  const router = useRouter();
  const [submissions] = useState(MOCK_DATA);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin');
    }
  }, [router]);

  // --- STATS CALCULATIONS ---
  const stats = useMemo(() => {
    const totalCO2 = submissions.reduce((acc, s) => acc + s.total, 0);
    const avgCO2 = totalCO2 / submissions.length;
    return {
      totalParticipants: submissions.length,
      totalCO2Tons: (totalCO2 / 1000).toFixed(1),
      avgCO2Kg: Math.round(avgCO2),
      completionRate: 82 // Mock
    };
  }, [submissions]);

  // --- CHART DATA PREP ---
  const donutData = [
    { name: 'Vuelos', value: 70, color: '#1B4332' },
    { name: 'Transporte', value: 10, color: '#0077B6' },
    { name: 'Alojamiento', value: 15, color: '#F4A261' },
    { name: 'Extras', value: 5, color: '#E9C46A' },
  ];

  const topOrigins = useMemo(() => {
    const counts: Record<string, number> = {};
    submissions.forEach(s => counts[s.origin] = (counts[s.origin] || 0) + 1);
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [submissions]);

  const histogramData = [
    { range: '0-500', count: 12 },
    { range: '500-1k', count: 25 },
    { range: '1k-2k', count: 32 },
    { range: '2k-3k', count: 12 },
    { range: '3k+', count: 4 },
  ];

  const timelineData = [
    { day: 'Lun', forms: 12 },
    { day: 'Mar', forms: 18 },
    { day: 'Mie', forms: 24 },
    { day: 'Jue', forms: 45 },
    { day: 'Vie', forms: 38 },
    { day: 'Sab', forms: 15 },
    { day: 'Dom', forms: 10 },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Participantes', value: stats.totalParticipants, icon: Users, color: 'text-forest-700', bg: 'bg-forest-50' },
          { label: 'Huella Total Evento', value: `${stats.totalCO2Tons} tCO₂`, icon: Globe, color: 'text-ocean-700', bg: 'bg-ocean-100' },
          { label: 'Huella Promedio', value: `${stats.avgCO2Kg} kg`, icon: BarChart3, color: 'text-coral-500', bg: 'bg-coral-100' },
          { label: 'Tasa Completación', value: `${stats.completionRate}%`, icon: CheckCircle, color: 'text-forest-900', bg: 'bg-forest-100' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.bg}`}>
               <card.icon className={`w-7 h-7 ${card.color}`} />
            </div>
            <div>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{card.label}</span>
              <div className="text-2xl font-serif font-black text-dark">{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Donut - Breakdown */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
           <h3 className="font-serif font-bold text-lg mb-6">Desglose por Categoría (Global)</h3>
           <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={donutData} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                   {donutData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="flex justify-center gap-4 mt-4 flex-wrap">
              {donutData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{d.name}</span>
                </div>
              ))}
           </div>
        </div>

        {/* 2. Horizontal Bar - Origins */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
           <h3 className="font-serif font-bold text-lg mb-6">Top Orígenes</h3>
           <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={topOrigins} layout="vertical">
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} style={{ fontSize: '12px', fontWeight: 'bold' }} />
                 <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                 <Bar dataKey="value" fill="#2D6A4F" radius={[0, 10, 10, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* 3. Histogram - Distribution */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
           <h3 className="font-serif font-bold text-lg mb-6">Distribución de Huella</h3>
           <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={histogramData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="range" axisLine={false} tickLine={false} style={{ fontSize: '10px', color: '#999' }} />
                 <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px', color: '#999' }} />
                 <Tooltip />
                 <Bar dataKey="count" fill="#DDA15E" radius={[10, 10, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* 4. Timeline - Line Chart */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-serif font-bold text-lg">Actividad de Registros</h3>
             <TrendingUp className="text-forest-500 w-5 h-5" />
           </div>
           <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={timelineData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="day" axisLine={false} tickLine={false} style={{ fontSize: '10px', color: '#999' }} />
                 <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px', color: '#999' }} />
                 <Tooltip />
                 <Area type="monotone" dataKey="forms" stroke="#2D6A4F" fill="#D8F3DC" strokeWidth={3} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
           <h3 className="font-serif font-bold text-lg">Registros Recientes</h3>
           <div className="flex gap-2">
              <button className="p-2 bg-gray-50 rounded-xl border border-gray-100 text-gray-500"><Filter size={18} /></button>
              <button className="bg-forest-900 text-white px-4 py-2 rounded-xl text-xs font-bold">Ver Todo</button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase font-black text-gray-400 tracking-widest border-b border-gray-50">
                <th className="px-8 py-4">Fecha / Hora</th>
                <th className="px-8 py-4">Ciudad Origen</th>
                <th className="px-8 py-4">Huella Total</th>
                <th className="px-8 py-4">Categoría Principal</th>
                <th className="px-8 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {submissions.slice(0, 10).map((s, i) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all font-medium text-sm">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-dark">{s.timestamp.toLocaleDateString()}</span>
                      <span className="text-[10px] text-gray-400">{s.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-forest-500" />
                      {s.origin}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${s.total > 2000 ? 'bg-coral-100 text-coral-700' : 'bg-forest-100 text-forest-700'}`}>
                      {Math.round(s.total)} kg
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs text-gray-500">Aéreo (70%)</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-gray-300 hover:text-dark px-2"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
