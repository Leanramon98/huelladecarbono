'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ChevronRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake Auth
    localStorage.setItem('isAdmin', 'true');
    router.push('/admin/dashboard');
  };

  return (
    <main className="min-h-screen bg-sand-100 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl shadow-forest-900/10 border border-forest-50"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-forest-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4">
            C
          </div>
          <h1 className="text-2xl font-serif font-bold text-forest-900">Panel de Administración</h1>
          <p className="text-forest-500 text-sm mt-2">Ingresá tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-300" />
            <input
              type="email"
              placeholder="admin@evento.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-forest-50 border-2 border-forest-100 rounded-2xl focus:border-forest-500 focus:outline-none transition-all font-medium"
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-300" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-forest-50 border-2 border-forest-100 rounded-2xl focus:border-forest-500 focus:outline-none transition-all font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-forest-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-forest-900/20"
          >
            Ingresar
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>

        <p className="mt-8 text-center text-forest-300 text-xs font-medium">
          ¿Problemas con el acceso? Contactá a soporte@carbonevent.com
        </p>
      </motion.div>
    </main>
  );
}
