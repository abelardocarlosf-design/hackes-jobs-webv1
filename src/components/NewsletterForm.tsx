"use client";

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  variant?: 'light' | 'dark';
}

export function NewsletterForm({ variant = 'light' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-2xl animate-in fade-in duration-500">
        <CheckCircle2 size={24} />
        <span className="font-bold">¡Te has suscrito con éxito!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu mejor email..."
        required
        className={cn(
          "w-full h-14 pl-6 pr-16 rounded-2xl font-medium outline-none transition-all duration-300 border-2",
          variant === 'light' 
            ? "bg-white border-slate-100 focus:border-brand-blue" 
            : "bg-white/5 border-white/10 text-white focus:border-brand-orange focus:bg-white/10"
        )}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          "absolute right-2 top-2 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-90",
          variant === 'light'
            ? "bg-brand-blue text-white hover:bg-blue-700"
            : "bg-brand-orange text-white hover:bg-orange-600"
        )}
      >
        <Send size={18} className={cn(status === 'loading' && "animate-pulse")} />
      </button>
    </form>
  );
}
