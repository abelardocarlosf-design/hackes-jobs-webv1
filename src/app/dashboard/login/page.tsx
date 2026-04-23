"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Shield, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Illustration } from '@/components/Illustration';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        // En una app real, guardaramos el token
        localStorage.setItem('hj_admin_user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.error || 'Credenciales invǭlidas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex items-center justify-center p-6 relative overflow-hidden selection:bg-brand-blue/20 selection:text-brand-blue">
      {/* Background Decors */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="hidden lg:block space-y-10">
           <Illustration name="hero" className="w-full max-w-md opacity-80" />
           <div className="space-y-6">
              <h1 className="text-6xl font-black text-brand-black tracking-tighter uppercase leading-[0.9]">
                 Acceso <br /> <span className="text-brand-blue">Privado.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium max-w-sm">
                 Gestiona el talento, contenido y configuraciones del ecosistema Hacke's Jobs.
              </p>
           </div>
        </div>

        <Card className="bg-white/70 backdrop-blur-3xl border-white shadow-premium p-10 sm:p-20 rounded-[4rem] space-y-12">
           <div className="space-y-6 text-center lg:text-left">
              <div className="w-20 h-20 bg-brand-black rounded-3xl flex items-center justify-center mx-auto lg:mx-0 shadow-2xl rotate-3">
                 <Shield className="text-brand-orange" size={40} />
              </div>
              <h2 className="text-4xl font-black text-brand-black tracking-tighter uppercase">Admin Hub</h2>
           </div>

           <form onSubmit={handleLogin} className="space-y-8">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-500 p-6 rounded-2xl flex items-center gap-4 animate-in shake duration-500">
                   <AlertCircle size={20} />
                   <p className="text-sm font-bold uppercase tracking-widest">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Usuario / ID</label>
                    <div className="relative">
                       <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                       <input 
                        type="text" 
                        required
                        className="w-full h-16 bg-slate-50 border-none rounded-2xl pl-14 pr-8 font-bold text-brand-black focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all placeholder:text-slate-300"
                        placeholder="admin"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Contrasea</label>
                    <div className="relative">
                       <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                       <input 
                        type="password" 
                        required
                        className="w-full h-16 bg-slate-50 border-none rounded-2xl pl-14 pr-8 font-bold text-brand-black focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                       />
                    </div>
                 </div>
              </div>

              <div className="pt-6">
                 <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-20 rounded-[2rem] text-xl font-black uppercase tracking-[0.2em] shadow-blue/40 flex gap-4 group"
                 >
                   {loading ? <Loader2 className="animate-spin" /> : <>Ingresar al Panel <ArrowRight className="group-hover:translate-x-2 transition-transform" /></>}
                 </Button>
              </div>
           </form>

           <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Hacke's Jobs Security Layer v2.0</p>
           </div>
        </Card>
      </div>
    </div>
  );
}
