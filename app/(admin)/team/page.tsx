'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Eye, 
  MoreVertical, 
  X,
  History,
  CheckCircle2,
  Clock,
  Trash2,
  ChevronRight
} from 'lucide-react';

export default function TeamPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  const mockTeam = [
    { email: 'admin@evento.com', role: 'Super Admin', status: 'Activo', date: '01/01/2024' },
    { email: 'colab@evento.com', role: 'Editor', status: 'Activo', date: '15/03/2024' },
    { email: 'viewer@evento.com', role: 'Viewer', status: 'Pendiente', date: '21/04/2024' },
  ];

  const mockLogs = [
    { user: 'admin@evento.com', action: 'Cambió el color primario', time: 'Hace 2 horas' },
    { user: 'colab@evento.com', action: 'Agregó ciudad: Madrid (MAD)', time: 'Hace 5 horas' },
    { user: 'admin@evento.com', action: 'Actualizó factor de vuelo RFI', time: 'Ayer' },
    { user: 'admin@evento.com', action: 'Login exitoso', time: 'Ayer' },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-serif font-black text-forest-900">Equipo de Trabajo</h1>
           <p className="text-forest-500 font-medium mt-1">Gestioná los accesos y roles de administración para tu equipo.</p>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 px-8 py-3 bg-forest-900 text-white rounded-2xl text-sm font-bold hover:bg-black transition-all shadow-lg shadow-forest-900/20"
        >
          <UserPlus className="w-4 h-4" />
          Invitar Miembro
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* TEAM TABLE */}
        <div className="xl:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden h-fit">
           <div className="p-8 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
              <Users size={20} className="text-gray-400" />
              <span className="font-serif font-bold text-dark">Miembros del equipo</span>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-[10px] uppercase font-black text-gray-400 tracking-widest border-b border-gray-50">
                       <th className="px-8 py-4">Usuario</th>
                       <th className="px-8 py-4">Rol</th>
                       <th className="px-8 py-4">Estado</th>
                       <th className="px-8 py-4 text-right">Acciones</th>
                    </tr>
                 </thead>
                 <tbody>
                    {mockTeam.map((m, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-none group">
                         <td className="px-8 py-6">
                            <div className="flex flex-col">
                               <span className="text-sm font-bold text-dark">{m.email}</span>
                               <span className="text-[10px] text-gray-400">Desde: {m.date}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                               {m.role === 'Super Admin' ? <Shield size={14} className="text-coral-500" /> : <Eye size={14} className="text-forest-500" />}
                               <span className="text-xs font-medium text-gray-600">{m.role}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                               m.status === 'Activo' ? 'bg-forest-100 text-forest-700' : 'bg-sand-100 text-sand-700'
                            }`}>
                               {m.status === 'Activo' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                               {m.status}
                            </div>
                         </td>
                         <td className="px-8 py-5 text-right">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2">
                               <button className="p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-xl transition-all">
                                  <MoreVertical size={16} />
                               </button>
                               {m.email !== 'admin@evento.com' && (
                                  <button className="p-2 text-gray-400 hover:text-coral-500 hover:bg-coral-50 rounded-xl transition-all">
                                     <Trash2 size={16} />
                                  </button>
                               )}
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* ACTIVITY LOG */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden h-fit flex flex-col">
           <div className="p-8 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
              <History size={20} className="text-gray-400" />
              <span className="font-serif font-bold text-dark">Log de Actividad</span>
           </div>
           <div className="p-8 flex flex-col gap-6">
              {mockLogs.map((log, i) => (
                <div key={i} className="flex gap-4 relative">
                   {i !== mockLogs.length - 1 && <div className="absolute left-4 top-8 w-px h-10 bg-gray-100" />}
                   <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 bg-forest-500 rounded-full" />
                   </div>
                   <div className="flex flex-col gap-1">
                      <p className="text-xs text-dark leading-tight">
                         <span className="font-bold">{log.user.split('@')[0]}</span> {log.action}
                      </p>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{log.time}</span>
                   </div>
                </div>
              ))}
              <button className="flex items-center justify-center gap-2 mt-4 text-xs font-bold text-forest-700 hover:underline">
                 Ver historial completo
                 <ChevronRight size={14} />
              </button>
           </div>
        </div>
      </div>

      {/* INVITE MODAL */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setIsInviteModalOpen(false)}
               className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 flex flex-col gap-8"
             >
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-serif font-black text-forest-900">Invitar Miembro</h2>
                   <button onClick={() => setIsInviteModalOpen(false)} className="text-gray-300 hover:text-dark">
                      <X size={24} />
                   </button>
                </div>
                
                <div className="flex flex-col gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Email del colaborador</label>
                      <input type="email" placeholder="ejemplo@email.com" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-forest-500 font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Rol asignado</label>
                      <select className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-forest-500 font-bold text-sm appearance-none">
                         <option>Editor</option>
                         <option>Viewer</option>
                         <option>Super Admin</option>
                      </select>
                   </div>
                   <p className="text-[10px] text-gray-400 italic px-2">Se enviará una invitación por email con los accesos temporales.</p>
                </div>

                <div className="flex gap-4 mt-4">
                   <button onClick={() => setIsInviteModalOpen(false)} className="flex-grow py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all">Cancelar</button>
                   <button className="flex-grow py-4 bg-forest-900 text-white rounded-2xl font-bold shadow-xl shadow-forest-900/20 hover:bg-black transition-all">Enviar Invitación</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
