'use client';

import React, { useState } from 'react';
import { useEventConfigStore } from '@/lib/store/useEventConfigStore';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Copy, 
  Download, 
  ExternalLink, 
  RefreshCw, 
  Palette, 
  Check,
  Smartphone,
  Maximize2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRPage() {
  const { config } = useEventConfigStore();
  const [url, setUrl] = useState(`https://huella.evento.com/${config.name.toLowerCase().replace(/ /g, '-')}`);
  const [qrColor, setQrColor] = useState('#2D6A4F');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = (format: 'png' | 'svg') => {
    const svg = document.getElementById('qr-main');
    if (!svg) return;
    
    // Logic to download SVG or convert to PNG would go here
    // For now, it's a simulated action
    alert(`Descargando QR en formato ${format.toUpperCase()}...`);
  };

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-serif font-black text-forest-900">QR y Link Público</h1>
           <p className="text-forest-500 font-medium mt-1">Generá el acceso directo para tus participantes en el evento físico.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* QR GENERATOR */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center gap-8">
           <div className="bg-gray-50 p-8 rounded-[32px] border-2 border-dashed border-gray-100 relative group">
              <div id="qr-wrapper" className="bg-white p-6 rounded-2xl shadow-xl">
                 <QRCodeSVG 
                    id="qr-main"
                    value={url} 
                    size={240} 
                    fgColor={qrColor} 
                    includeMargin={true}
                    level="H"
                 />
              </div>
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                 <Maximize2 size={16} className="text-gray-400" />
              </button>
           </div>

           <div className="w-full space-y-6">
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Color del QR</label>
                 <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <input 
                      type="color" 
                      value={qrColor} 
                      onChange={(e) => setQrColor(e.target.value)}
                      className="w-8 h-8 rounded-full overflow-hidden border-none bg-transparent cursor-pointer"
                    />
                    <span className="text-sm font-mono font-bold uppercase text-gray-500">{qrColor}</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <button 
                   onClick={() => downloadQR('png')}
                   className="flex items-center justify-center gap-2 py-4 bg-forest-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-lg shadow-forest-900/20"
                 >
                    <Download size={18} /> Descargar PNG
                 </button>
                 <button 
                   onClick={() => downloadQR('svg')}
                   className="flex items-center justify-center gap-2 py-4 border-2 border-forest-900 text-forest-900 rounded-2xl font-bold text-sm hover:bg-forest-50 transition-all"
                 >
                    <RefreshCw size={18} /> Descargar SVG
                 </button>
              </div>
           </div>
        </div>

        {/* LINK AND PREVIEW */}
        <div className="flex flex-col gap-8">
           <div className="bg-forest-900 p-8 rounded-[40px] text-white space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-forest-800 rounded-lg flex items-center justify-center">
                    <Smartphone size={18} />
                 </div>
                 <h3 className="font-serif font-bold text-lg">Link de Acceso</h3>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/10">
                 <p className="flex-grow font-mono text-sm truncate opacity-80">{url}</p>
                 <button 
                   onClick={handleCopy}
                   className={`p-3 rounded-xl transition-all ${copied ? 'bg-forest-500' : 'bg-white/20 hover:bg-white/30'}`}
                 >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                 </button>
              </div>

              <div className="flex items-center justify-between pt-2">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-forest-900 bg-gray-200" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-forest-900 bg-forest-800 flex items-center justify-center text-[10px] font-bold">+120</div>
                 </div>
                 <span className="text-xs font-bold text-white/50">Participantes ya midieron</span>
              </div>
           </div>

           <div className="bg-sand-100 p-10 rounded-[40px] border border-forest-100 relative overflow-hidden flex flex-col gap-6">
              <h4 className="text-xs font-black uppercase text-forest-700 tracking-widest">Mockup Banner del Evento</h4>
              <div className="relative w-full aspect-[3/4] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-10 gap-6">
                 <div className="w-12 h-12 bg-forest-900 rounded-xl" />
                 <h5 className="text-xl font-serif font-black text-forest-900 text-center leading-tight">Mide tu Huella de VIAJE</h5>
                 <div className="p-4 border-2 border-forest-100 rounded-xl">
                    <QRCodeSVG value={url} size={120} fgColor="#2D6A4F" />
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-forest-300">Escaneá y Participá</div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-forest-200 rounded-full blur-3xl opacity-50" />
           </div>
        </div>
      </div>
    </div>
  );
}
