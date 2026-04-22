'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Edit3, BarChart3, Sprout } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('welcome');

  const steps = [
    { icon: <Edit3 className="w-8 h-8 text-forest-700" />, title: t('step1'), delay: 0.1 },
    { icon: <BarChart3 className="w-8 h-8 text-forest-700" />, title: t('step2'), delay: 0.2 },
    { icon: <Sprout className="w-8 h-8 text-forest-700" />, title: t('step3'), delay: 0.3 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header handled in layout.tsx for LanguageSelector, 
          but adding logo here as requested */}
      <header className="p-6 md:p-8 flex justify-start items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-forest-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <span className="font-serif text-2xl font-bold text-forest-900">CarbonEvent</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center">
        {/* HERO SECTION */}
        <section className="px-6 py-16 md:py-24 text-center max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-100 text-forest-800 text-sm font-bold mb-8">
              <Clock className="w-4 h-4" />
              {t('minutes')}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-black text-forest-900 mb-6 leading-tight">
              {t('title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-forest-700 mb-12 max-w-2xl mx-auto font-sans leading-relaxed">
              {t('subtitle')}
            </p>

            <Link href="/wizard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-forest-700 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-xl shadow-forest-900/20 hover:bg-forest-800 transition-colors"
              >
                {t('cta')}
              </motion.button>
            </Link>
          </motion.div>
        </section>

        {/* HOW IT WORKS */}
        <section className="w-full bg-white/50 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-forest-900 text-center mb-12 italic">
              ¿Cómo funciona?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: step.delay }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-forest-100 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-forest-900">
                    {step.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="p-8 text-center text-forest-900/40 text-sm font-medium border-t border-forest-100">
        <p>Los resultados son orientativos y educativos.</p>
        <p className="mt-2 font-serif italic">CarbonEvent © 2024</p>
      </footer>
    </div>
  );
}
