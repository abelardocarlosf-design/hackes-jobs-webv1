"use client";

import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input'; // Assuming Input exists or we'll create it
import { Send, CheckCircle2 } from 'lucide-react';

interface LeadFormProps {
  type: 'empresas' | 'candidatos';
}

export function LeadForm({ type }: LeadFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulación de envío
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-12 bg-white rounded-[3rem] shadow-premium animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-brand-blue text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-blue">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-4xl font-black text-brand-black mb-4 uppercase tracking-tighter">¡Solicitud Recibida!</h3>
        <p className="text-xl text-slate-600 max-w-md mx-auto">
          Gracias por confiar en Hacke's Jobs. Uno de nuestros consultores senior se pondrá en contacto contigo en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 sm:p-12 rounded-[3rem] shadow-premium-hover">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4">Nombre Completo</label>
          <input 
            type="text" 
            placeholder="Ej. Juan Pérez" 
            required 
            className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-brand-blue focus:bg-white outline-none transition-all duration-300 text-brand-black font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4">Empresa / Cargo</label>
          <input 
            type="text" 
            placeholder="Ej. Hacke's Jobs / CEO" 
            required 
            className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-brand-blue focus:bg-white outline-none transition-all duration-300 text-brand-black font-medium"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4">Email Corporativo</label>
        <input 
          type="email" 
          placeholder="juan@empresa.com" 
          required 
          className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-brand-blue focus:bg-white outline-none transition-all duration-300 text-brand-black font-medium"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4">¿Cómo podemos ayudarte?</label>
        <textarea 
          placeholder="Cuéntanos brevemente tus necesidades de talento..." 
          rows={4}
          required
          className="w-full p-6 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-brand-blue focus:bg-white outline-none transition-all duration-300 text-brand-black font-medium resize-none"
        ></textarea>
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        size="lg" 
        className="w-full rounded-2xl shadow-blue py-8"
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : (
          <>Enviar Solicitud <Send className="ml-2 w-5 h-5" /></>
        )}
      </Button>
      
      <p className="text-center text-slate-400 text-sm font-medium">
        Al enviar aceptas nuestra política de privacidad y términos de servicio.
      </p>
    </form>
  );
}
