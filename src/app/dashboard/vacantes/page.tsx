"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Plus, Search, Filter, Edit, Trash2, Briefcase, Save, X, MapPin, Building2, DollarSign, Calendar } from 'lucide-react';

interface Vacante {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  active: boolean;
  requirements: string[];
}

export default function VacantesAdminPage() {
  const [vacancies, setVacancies] = useState<Vacante[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState<Partial<Vacante>>({
    title: '',
    company: 'Hacke\'s Jobs',
    location: 'CDMX / Remoto',
    type: 'Full-time',
    salary: '',
    category: 'Tecnología',
    active: true,
    requirements: []
  });

  // Mock data for now as the API for vacancies list might not be ready
  useEffect(() => {
    // fetchVacancies();
  }, []);

  const handleSave = () => {
    // Logic to save vacancy
    setIsEditing(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-brand-black uppercase tracking-tighter">Bolsa de Trabajo</h1>
          <p className="text-slate-400 font-medium">Publica y gestiona las vacantes activas en el portal.</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="secondary" className="flex gap-2 h-14 px-8 rounded-2xl shadow-orange/20">
            <Plus size={18} /> Nueva Vacante
          </Button>
        )}
      </div>

      {isEditing ? (
        <Card className="p-10 space-y-10 animate-in fade-in zoom-in duration-500">
           <div className="flex items-center justify-between border-b border-slate-50 pb-6">
              <h2 className="text-2xl font-black text-brand-black uppercase tracking-tighter">Editor de Vacante</h2>
              <Button variant="ghost" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-brand-black">
                 <X size={24} />
              </Button>
           </div>

           <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Título del Puesto</label>
                    <div className="relative">
                       <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                       <input 
                        type="text" 
                        placeholder="Ej: Senior Fullstack Developer"
                        className="w-full h-16 bg-slate-50 border-none rounded-2xl pl-14 pr-8 font-black text-xl text-brand-black focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                        value={currentJob.title}
                        onChange={e => setCurrentJob({...currentJob, title: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Empresa Cliente</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            type="text" 
                            className="w-full h-14 bg-slate-50 border-none rounded-xl pl-12 pr-6 font-bold text-slate-600 focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                            value={currentJob.company}
                            onChange={e => setCurrentJob({...currentJob, company: e.target.value})}
                          />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ubicación</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            type="text" 
                            className="w-full h-14 bg-slate-50 border-none rounded-xl pl-12 pr-6 font-bold text-slate-600 focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                            value={currentJob.location}
                            onChange={e => setCurrentJob({...currentJob, location: e.target.value})}
                          />
                        </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rango Salarial</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            type="text" 
                            placeholder="Ej: 60k - 80k MXN"
                            className="w-full h-14 bg-slate-50 border-none rounded-xl pl-12 pr-6 font-bold text-slate-600 focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                            value={currentJob.salary}
                            onChange={e => setCurrentJob({...currentJob, salary: e.target.value})}
                          />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tipo de Jornada</label>
                        <select 
                          className="w-full h-14 bg-slate-50 border-none rounded-xl px-6 font-bold text-brand-black focus:ring-2 focus:ring-brand-blue/20 outline-none appearance-none cursor-pointer"
                          value={currentJob.type}
                          onChange={e => setCurrentJob({...currentJob, type: e.target.value})}
                        >
                           <option>Full-time</option>
                           <option>Part-time</option>
                           <option>Contract</option>
                           <option>Freelance</option>
                        </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Requerimientos (Separados por coma)</label>
                    <textarea 
                      rows={3}
                      placeholder="React, TypeScript, Node.js, InglǸs avanzado..."
                      className="w-full bg-slate-50 border-none rounded-2xl p-6 font-bold text-slate-600 focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all resize-none"
                    />
                 </div>
              </div>
           </div>

           <div className="pt-10 border-t border-slate-50 flex items-center gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                 <input 
                  type="checkbox" 
                  className="w-6 h-6 rounded-lg border-2 border-slate-200 text-brand-blue focus:ring-brand-blue/20 transition-all cursor-pointer"
                  checked={currentJob.active}
                  onChange={e => setCurrentJob({...currentJob, active: e.target.checked})}
                 />
                 <span className="font-black uppercase tracking-widest text-xs group-hover:text-brand-blue">Vacante Activa</span>
              </label>
              
              <div className="flex-grow"></div>
              
              <Button onClick={() => setIsEditing(false)} variant="outline">Cancelar</Button>
              <Button onClick={handleSave} className="flex gap-2 h-14 px-10 rounded-2xl"><Save size={18} /> Publicar Vacante</Button>
           </div>
        </Card>
      ) : (
        <div className="grid gap-6">
           {/* Placeholder for Job List */}
           <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest bg-white rounded-[3rem] border border-dashed border-slate-200">
              Aún no hay vacantes registradas.
           </div>
        </div>
      )}
    </div>
  );
}
