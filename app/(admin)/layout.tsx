'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Settings, 
  Calculator, 
  MapPin, 
  QrCode, 
  Download, 
  Users, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Eye,
  Moon,
  Sun,
  LayoutDashboard,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Settings, label: 'Configuración', href: '/admin/config' },
  { icon: Calculator, label: 'Factores de Cálculo', href: '/admin/calculations' },
  { icon: MapPin, label: 'Ciudades / Aeropuertos', href: '/admin/cities' },
  { icon: QrCode, label: 'QR y Links', href: '/admin/qr' },
  { icon: Download, label: 'Exportar Datos', href: '/admin/export' },
  { icon: Users, label: 'Equipo', href: '/admin/team' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [eventStatus, setEventStatus] = useState<'Activo' | 'Pausado' | 'Finalizado'>('Activo');
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminDarkMode, setIsAdminDarkMode] = useState(false); // Admin only dark mode
  
  const isLoginPage = pathname === '/admin';

  useEffect(() => {
    setIsClient(true);
    if (!isLoginPage) {
      const isAdmin = localStorage.getItem('isAdmin');
      if (isAdmin !== 'true') {
        router.push('/admin');
      }
    }
  }, [isLoginPage, router]);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (!isClient) return null;

  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin');
  };

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300 ${isAdminDarkMode ? 'bg-dark text-white' : 'bg-[#F8F9FA] text-dark'}`}>
      
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 w-full h-16 bg-forest-900 z-[60] flex items-center justify-between px-6 shadow-xl">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-forest-900 font-bold">C</div>
           <span className="text-white font-serif font-bold">Admin</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-forest-900 flex flex-col transition-all duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-forest-900 font-bold">C</div>
          <span className="text-white font-serif font-bold text-xl">AdminPanel</span>
        </div>

        <nav className="flex-grow px-4 mt-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === item.href 
                    ? 'bg-white/10 text-white shadow-inner' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="h-px bg-white/10 my-6" />

          <div className="space-y-4 px-4">
            <div className="flex items-center justify-between">
               <span className="text-[10px] uppercase font-bold text-white/40">Modo Oscuro</span>
               <button 
                 onClick={() => setIsAdminDarkMode(!isAdminDarkMode)}
                 className={`w-10 h-5 rounded-full flex items-center p-1 transition-colors ${isAdminDarkMode ? 'bg-forest-500' : 'bg-white/10'}`}
               >
                 <motion.div 
                   animate={{ x: isAdminDarkMode ? 20 : 0 }}
                   className="w-3 h-3 bg-white rounded-full shadow-sm" 
                 />
               </button>
            </div>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Ver participante
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 py-2 text-sm font-medium text-coral-300 hover:text-coral-200 transition-all text-left"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </div>
        </nav>
      </aside>

      {/* OVERLAY for mobile */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-h-screen w-full lg:w-auto">
        {/* HEADER */}
        <header className={`h-20 border-b px-8 flex items-center justify-between sticky top-0 z-40 lg:z-40 transition-colors ${isAdminDarkMode ? 'bg-black/50 backdrop-blur-xl border-white/5' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-4 pt-16 lg:pt-0">
             <h2 className={`font-serif font-black text-xl hidden sm:block ${isAdminDarkMode ? 'text-white' : 'text-forest-900'}`}>Carbono COP28 Mockup</h2>
             <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
               eventStatus === 'Activo' ? 'bg-forest-100 text-forest-700' : 'bg-sand-100 text-sand-700'
             }`}>
               {eventStatus}
             </div>
          </div>

          <div className="flex items-center gap-3">
             <button
                onClick={() => setEventStatus(eventStatus === 'Activo' ? 'Pausado' : 'Activo')}
                className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${isAdminDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
             >
                {eventStatus === 'Activo' ? 'Pausar' : 'Activar'}
             </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className={`p-4 md:p-8 ${isAdminDarkMode ? 'admin-dark' : ''}`}>
           {children}
        </div>
      </div>
    </div>
  );
}

