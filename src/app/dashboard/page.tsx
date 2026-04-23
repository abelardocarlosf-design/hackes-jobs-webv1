"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Users, FileText, Briefcase, TrendingUp, Calendar, ArrowUpRight, Search, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/Button';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    subscribers: 0,
    posts: 0,
    vacancies: 0,
    users: 0
  });

  useEffect(() => {
    // Fetch dashboard summary stats
    async function fetchStats() {
      try {
        const [subsRes, postsRes, usersRes] = await Promise.all([
          fetch('/api/admin/subscribers'),
          fetch('/api/admin/blog'),
          fetch('/api/admin/users')
        ]);
        
        const subs = await subsRes.json();
        const posts = await postsRes.json();
        const users = await usersRes.json();

        setStats({
          subscribers: Array.isArray(subs) ? subs.length : 0,
          posts: Array.isArray(posts) ? posts.length : 0,
          vacancies: 0, // Pending implementation
          users: Array.isArray(users) ? users.length : 0
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    fetchStats();
  }, []);

  const cards = [
    { title: 'Suscriptores', value: stats.subscribers, icon: <Users className="text-brand-blue" size={24} />, trend: '+12%', color: 'border-brand-blue' },
    { title: 'Artículos Blog', value: stats.posts, icon: <FileText className="text-brand-orange" size={24} />, trend: '+3', color: 'border-brand-orange' },
    { title: 'Vacantes Activas', value: stats.vacancies, icon: <Briefcase className="text-emerald-500" size={24} />, trend: '0%', color: 'border-emerald-500' },
    { title: 'Administradores', value: stats.users, icon: <Settings className="text-slate-700" size={24} />, trend: '0', color: 'border-slate-700' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-brand-black uppercase tracking-tighter">Panel de Control</h1>
          <p className="text-slate-400 font-medium">Bienvenido al ecosistema administrativo de Hacke's Jobs.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Buscar recursos..." 
                className="h-12 w-64 bg-white border border-slate-100 rounded-xl pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
           </div>
           <Button variant="outline" className="h-12 w-12 p-0 rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-orange rounded-full"></span>
           </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card) => (
          <Card key={card.title} className={`border-t-4 ${card.color} group hover:shadow-premium transition-all duration-500`}>
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                 <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                    {card.icon}
                 </div>
                 <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">
                    {card.trend} <ArrowUpRight size={10} />
                 </span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{card.title}</p>
                <p className="text-4xl font-black text-brand-black tracking-tighter italic">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-10 space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-brand-black uppercase tracking-tighter">Actividad Reciente</h2>
              <Button variant="ghost" size="sm" className="text-brand-blue font-black uppercase tracking-widest text-[10px]">Ver todo</Button>
           </div>
           
           <div className="space-y-6">
              {[
                { type: 'BLOG', text: 'Nuevo artículo publicado: "Tendencias IT 2024"', time: 'Hace 2 horas', icon: <FileText size={16} />, color: 'bg-brand-orange/10 text-brand-orange' },
                { type: 'USER', text: 'Nuevo usuario suscrito a la newsletter', time: 'Hace 5 horas', icon: <Users size={16} />, color: 'bg-brand-blue/10 text-brand-blue' },
                { type: 'SYS', text: 'Backup del sistema completado con éxito', time: 'Hace 1 día', icon: <Calendar size={16} />, color: 'bg-emerald-50 text-emerald-500' }
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${activity.color}`}>
                      {activity.icon}
                   </div>
                   <div className="flex-grow space-y-1">
                      <div className="flex items-center gap-3">
                         <span className="text-[9px] font-black tracking-widest uppercase opacity-40">{activity.type}</span>
                         <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                         <span className="text-[10px] font-bold text-slate-400">{activity.time}</span>
                      </div>
                      <p className="text-sm font-bold text-brand-black group-hover:text-brand-blue transition-colors">{activity.text}</p>
                   </div>
                   <Button variant="ghost" className="h-10 w-10 p-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={18} />
                   </Button>
                </div>
              ))}
           </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-8">
           <Card className="bg-brand-black text-white p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10 space-y-6">
                 <h3 className="text-xl font-black uppercase tracking-tighter">Acceso Rápido</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <Button variant="ghost" className="bg-white/5 hover:bg-white/10 h-24 flex flex-col gap-3 rounded-2xl border-white/5">
                       <FileText size={20} className="text-brand-orange" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Post</span>
                    </Button>
                    <Button variant="ghost" className="bg-white/5 hover:bg-white/10 h-24 flex flex-col gap-3 rounded-2xl border-white/5">
                       <Briefcase size={20} className="text-brand-blue" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Job</span>
                    </Button>
                 </div>
                 <Button variant="primary" className="w-full h-14 rounded-2xl shadow-blue/40">Nueva Publicación</Button>
              </div>
           </Card>

           <Card className="p-10 space-y-6 bg-slate-50 border-none">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sistema en Línea</h4>
              </div>
              <div className="space-y-1">
                 <p className="text-2xl font-black text-brand-black tracking-tighter">v2.4.0 <span className="text-brand-blue font-medium italic text-lg ml-2">Stable</span></p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Última actualización: Hoy 14:30</p>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
