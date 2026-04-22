'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useWizardStore } from '@/lib/store/useWizardStore';
import { calculateTotal } from '@/lib/calculations';
import { useTranslations } from 'next-intl';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend 
} from 'recharts';
import { 
  TreeDeciduous, 
  Car, 
  Lightbulb, 
  ChevronDown, 
  Share2, 
  ExternalLink,
  Plane,
  Navigation,
  Hotel,
  Utensils,
  Leaf,
  AlertTriangle,
  Zap,
  Download,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ResultsPage() {
  const t = useTranslations();
  const router = useRouter();
  const { tripData, reset } = useWizardStore();
  const [isClient, setIsClient] = useState(false);

  // Hardcoded values for now
  const EVENT_AVERAGE = 1500;
  const SUSTAINABLE_GOAL = 500;
  const PRICE_PER_TON = 15; // USD

  useEffect(() => {
    setIsClient(true);
    // If no origin is set, redirect back to wizard
    if (!tripData.origin?.iata) {
      router.push('/wizard');
    }
  }, [tripData, router]);

  // Calculations
  const result = calculateTotal(tripData, {
    name: 'Event',
    logo: '',
    city: 'Río',
    cityCoords: { lat: -22.81, lng: -43.2506 },
    dates: { start: '', end: '' },
    languages: [],
    defaultLanguage: 'es',
    branding: { primaryColor: '', secondaryColor: '', accentColor: '', bgColor: '' },
    compensationEnabled: true,
    compensationPricePerTon: PRICE_PER_TON,
    offsetLinks: []
  });

  const total = result.total;
  const displayTotal = total > 1000 ? (total / 1000).toFixed(1) : Math.round(total);
  const unit = total > 1000 ? 't CO₂' : 'kg CO₂';

  // Count up animation
  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const animatedValue = useSpring(0, springConfig);
  const displayValue = useTransform(animatedValue, (v) => Math.round(v));

  useEffect(() => {
    animatedValue.set(total);
  }, [total, animatedValue]);

  // Traffic light
  const getImpactLevel = () => {
    if (total < 500) return { label: 'Bajo impacto 🌱', color: 'bg-forest-500', text: 'text-forest-700' };
    if (total <= 2000) return { label: 'Impacto moderado', color: 'bg-sand-500', text: 'text-sand-700' };
    return { label: 'Alto impacto', color: 'bg-coral-500', text: 'text-coral-700' };
  };
  const impact = getImpactLevel();

  // Chart data
  const chartData = [
    { name: t('results.flights'), value: result.breakdown.flights, color: '#2D6A4F' },
    { name: t('results.transport'), value: result.breakdown.transport, color: '#0077B6' },
    { name: t('results.accommodation'), value: result.breakdown.accommodation, color: '#F4A261' },
    { name: t('results.food') + ' & ' + t('results.extras'), value: result.breakdown.food + result.breakdown.extras, color: '#E9C46A' },
  ].filter(d => d.value > 0);

  // Random Fact
  const facts = [
    "¿Sabías que el 70% de la huella de un viaje internacional está en los vuelos?",
    "Un vuelo directo genera hasta 20% menos emisiones que uno con escalas.",
    "Volar en Business genera casi 3 veces más CO₂ que Economy.",
    "El transporte público en Río emite 5 veces menos que un taxi."
  ];
  const [randomFact] = useState(facts[Math.floor(Math.random() * facts.length)]);

  // Recommendations Logic
  const getRecommendations = () => {
    const recs = [];
    if (tripData.flightClass !== 'economy') {
      recs.push({
        icon: <Plane />,
        title: "Volá en Economy la próxima vez",
        saving: Math.round(result.breakdown.flights * 0.4), // approx saving
        difficulty: "Fácil"
      });
    }
    if (tripData.flights.length > 1) {
      recs.push({
        icon: <Plane />,
        title: "Buscá vuelos directos",
        saving: Math.round(result.breakdown.flights * 0.15),
        difficulty: "Moderado"
      });
    }
    if (tripData.transport.includes('taxi')) {
      recs.push({
        icon: <Navigation />,
        title: "Usá el metro de Río",
        saving: Math.round(result.breakdown.transport * 0.8),
        difficulty: "Fácil"
      });
    }
    if (tripData.accommodation === 'hotel5') {
      recs.push({
        icon: <Hotel />,
        title: "Probá un Airbnb o Hotel 3*",
        saving: Math.round(result.breakdown.accommodation * 0.5),
        difficulty: "Fácil"
      });
    }
    if (tripData.redMeatMeals > 4) {
      recs.push({
        icon: <Utensils />,
        title: "Reducí la carne roja",
        saving: Math.round(tripData.redMeatMeals * 3),
        difficulty: "Fácil"
      });
    }
    return recs.slice(0, 3);
  };
  const recommendations = getRecommendations();

  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-sand-100 flex flex-col pb-20">
      
      {/* SECTION 1: HEADER & TOTAL */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-forest-100 to-sand-100 text-center relative overflow-hidden">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="relative z-10"
        >
          <span className="text-forest-700 font-bold uppercase tracking-widest text-sm mb-4 block">
            {t('results.title')}
          </span>
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-baseline gap-3">
              <motion.span className="text-8xl font-serif font-black text-forest-900 leading-none">
                {displayTotal}
              </motion.span>
              <span className="text-3xl font-serif font-bold text-forest-700 underline decoration-forest-300 underline-offset-8 decoration-4">
                {unit}
              </span>
            </div>
            
            <div className={`mt-8 px-6 py-2 rounded-full font-black text-white shadow-lg ${impact.color} flex items-center gap-2`}>
              {total < 500 ? <Leaf className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              {impact.label}
            </div>
          </div>
        </motion.div>

        {/* Decorative circle */}
        <div className="absolute top-[-10%] left-[-10%] w-60 h-60 bg-white/30 rounded-full blur-3xl" />
      </section>

      {/* SECTION 2: BREAKDOWN CHART */}
      <section className="px-6 -mt-8">
        <div className="max-w-xl mx-auto bg-white rounded-[40px] p-8 shadow-xl shadow-forest-900/5 border border-forest-50">
          <h2 className="text-xl font-serif font-bold text-forest-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-forest-500" />
            {t('results.breakdown')}
          </h2>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`${Math.round(value)} kg CO₂`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-bold text-forest-900 truncate">{item.name}</span>
                <span className="text-[10px] text-forest-400 font-medium ml-auto">
                  {Math.round((item.value / total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: EQUIVALENCIES */}
      <section className="px-6 mt-12">
        <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-forest-900 text-white p-6 rounded-3xl flex flex-col gap-4 shadow-xl">
             <div className="w-12 h-12 bg-forest-800 rounded-2xl flex items-center justify-center">
                <TreeDeciduous className="text-forest-100" />
             </div>
             <p className="font-medium text-sm leading-relaxed">
               {t('results.equivalency.trees', { count: Math.round(result.equivalencies.trees) })}
             </p>
          </div>
          <div className="bg-sand-500 text-dark p-6 rounded-3xl flex flex-col gap-4 shadow-xl">
             <div className="w-12 h-12 bg-sand-400 rounded-2xl flex items-center justify-center">
                <Car className="text-dark" />
             </div>
             <p className="font-medium text-sm leading-relaxed">
               Equivale a manejar <strong>{Math.round(result.equivalencies.carKm).toLocaleString()} km</strong> en un auto a nafta.
             </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPARISON */}
      <section className="px-6 mt-12 max-w-xl mx-auto w-full">
        <div className="bg-white p-8 rounded-3xl border border-forest-100">
          <h3 className="text-sm font-bold text-forest-900 uppercase tracking-widest mb-8">Comparación con el evento</h3>
          <div className="relative h-4 bg-gray-100 rounded-full mb-10">
            {/* Color scale gradient background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-forest-500 via-sand-500 to-coral-500 opacity-30" />
            
            {/* User marker */}
            <motion.div 
               initial={{ left: 0 }}
               animate={{ left: `${Math.min((total / (EVENT_AVERAGE * 1.5)) * 100, 100)}%` }}
               transition={{ delay: 0.5, duration: 1 }}
               className="absolute top-1/2 -translate-y-1/2 -ml-3 z-20 flex flex-col items-center"
            >
              <div className="w-6 h-6 bg-forest-900 border-4 border-white rounded-full shadow-lg" />
              <span className="absolute -top-7 text-[10px] font-black uppercase whitespace-nowrap bg-dark text-white px-2 py-0.5 rounded">Tú</span>
            </motion.div>

            {/* Average marker */}
            <div 
               className="absolute top-1/2 -translate-y-1/2 left-[60%] -ml-1 h-8 w-1 bg-gray-400 z-10" 
            >
              <span className="absolute -bottom-6 text-[10px] font-bold text-gray-500 whitespace-nowrap">Promedio (1500)</span>
            </div>

            {/* Sustainable goal */}
            <div 
               className="absolute top-1/2 -translate-y-1/2 left-[20%] -ml-1 h-8 w-1 bg-forest-500 z-10" 
            >
               <span className="absolute -bottom-6 text-[10px] font-bold text-forest-500 whitespace-nowrap">Meta (500)</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: EDUCATION */}
      <section className="px-6 mt-12 max-w-xl mx-auto w-full">
        <div className="bg-ocean-200 p-8 rounded-3xl border border-ocean-300 flex gap-4">
           <div className="bg-white/50 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
              <Lightbulb className="text-ocean-700" />
           </div>
           <div>
             <span className="text-[10px] font-black uppercase text-ocean-700 tracking-widest block mb-1">¿Sabías que?</span>
             <p className="text-ocean-900 font-bold text-lg leading-snug">{randomFact}</p>
           </div>
        </div>
      </section>

      {/* SECTION 6: RECOMMENDATIONS */}
      <section id="recommendations" className="px-6 mt-12 max-w-xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-black text-forest-900">Top 3 Quick Wins</h2>
          <div className="bg-forest-100 text-forest-700 px-3 py-1 rounded-full text-xs font-bold">RECOMENDADO</div>
        </div>

        <div className="flex flex-col gap-4">
          {recommendations.map((rec, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-3xl border border-forest-100 shadow-sm flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-forest-50 rounded-2xl flex items-center justify-center text-forest-700">
                {rec.icon}
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-forest-900 text-sm leading-tight mb-1">{rec.title}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-forest-500 font-medium">Ahorro: <strong>{rec.saving} kg CO₂</strong></span>
                  <span className="text-[10px] font-black uppercase text-ocean-700 bg-ocean-100 px-2 py-0.5 rounded">{rec.difficulty}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-forest-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OFFSET SECTION */}
      <section className="px-6 mt-12 max-w-xl mx-auto w-full">
        <div className="bg-forest-900 p-8 rounded-[40px] text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-serif font-bold mb-2">Compensá tu huella</h3>
            <p className="text-forest-100 text-sm mb-8">
              Tu aporte apoya proyectos de reforestación y energía renovable por aprox. 
              <strong className="text-xl ml-2 text-white">USD {(total / 1000 * PRICE_PER_TON).toFixed(1)}</strong>
            </p>
            
            <div className="flex flex-col gap-3">
              <button className="bg-forest-500 hover:bg-forest-400 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-forest-500/20">
                Compensar ahora
              </button>
              <div className="flex justify-center gap-8 mt-4">
                 <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Pachama</span>
                 <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Gold Standard</span>
                 <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Moss</span>
              </div>
            </div>
          </div>
          {/* Abstract green shapes */}
          <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-forest-700 rounded-full blur-3xl opacity-50" />
        </div>
      </section>

      {/* SHARE SECTION */}
      <section className="px-6 mt-16 max-w-xl mx-auto w-full text-center">
        <div className="flex flex-col items-center gap-6">
          <button className="flex items-center gap-3 bg-dark text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all">
            <Share2 className="w-5 h-5" />
            Compartir resultado
          </button>
          
          <button className="flex items-center gap-2 text-forest-700 font-bold hover:underline">
            <Download className="w-4 h-4" />
            Descargar imagen para Stories
          </button>

          <Link href="/">
            <button 
              onClick={reset}
              className="text-forest-400 font-medium text-sm hover:text-forest-700 mt-4"
            >
              Realizar otra medición
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}
