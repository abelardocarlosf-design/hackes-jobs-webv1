"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './Button';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Empresas', href: '/empresas' },
    { name: 'Candidatos', href: '/candidatos' },
    { name: 'Vacantes', href: '/vacantes' },
    { name: 'Psicometrías', href: '/psicometrias' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 py-4 sm:px-8 sm:py-6",
      scrolled ? "bg-white/90 backdrop-blur-xl shadow-premium py-3 sm:py-4" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-white/20 p-2 sm:p-3 pl-6 sm:pl-8 shadow-sm">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-black rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
            <span className="text-white font-black text-xl tracking-tighter">HJ</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-brand-black uppercase hidden sm:block">Hacke's Jobs</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-sm font-black uppercase tracking-widest transition-all duration-300 hover:text-brand-blue",
                pathname === link.href ? "text-brand-blue" : "text-brand-black/60"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/login">
            <Button variant="ghost" className="hidden sm:flex text-xs uppercase tracking-widest font-black">
              Ingresar
            </Button>
          </Link>
          <Link href="/empresas">
            <Button variant="dark" size="sm" className="rounded-2xl px-6">
              Contratar Talento
            </Button>
          </Link>
          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-brand-black text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-40 bg-white transition-all duration-500 ease-in-out",
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="flex flex-col h-full p-8 pt-24 space-y-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-black uppercase tracking-tighter text-brand-black hover:text-brand-blue flex justify-between items-center group"
            >
              {link.name}
              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
            </Link>
          ))}
          <div className="pt-8 border-t border-slate-100 flex flex-col gap-4">
            <Link href="/dashboard/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="lg" className="w-full rounded-2xl">Ingresar</Button>
            </Link>
            <Link href="/empresas" onClick={() => setIsOpen(false)}>
              <Button variant="primary" size="lg" className="w-full rounded-2xl">Contratar Talento</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
