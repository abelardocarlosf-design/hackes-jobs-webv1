import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Send } from 'lucide-react';
import { Button } from './Button';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white pt-24 pb-12 overflow-hidden relative">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/5 blur-[120px] rounded-full -mr-20 -mt-20 pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                <span className="text-brand-black font-black text-2xl tracking-tighter">HJ</span>
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">Hacke's Jobs</span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed">
              Revolucionando el reclutamiento con inteligencia artificial y un enfoque humano centrado en el talento real.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Facebook, Instagram].map((Icon, idx) => (
                <Link key={idx} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-300 group">
                  <Icon size={20} className="text-slate-400 group-hover:text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-xl font-black uppercase tracking-widest text-brand-orange">Explorar</h4>
            <ul className="space-y-4 text-lg">
              {[
                { name: 'Empresas', href: '/empresas' },
                { name: 'Candidatos', href: '/candidatos' },
                { name: 'Vacantes', href: '/vacantes' },
                { name: 'Psicometrías', href: '/psicometrias' },
                { name: 'Blog', href: '/blog' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="text-xl font-black uppercase tracking-widest text-brand-blue">Contacto</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-brand-blue" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email</p>
                  <a href="mailto:hola@hackesjobs.com.mx" className="text-lg text-slate-300 hover:text-white transition-colors">hola@hackesjobs.com.mx</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-brand-orange" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Teléfono</p>
                  <a href="tel:+525512345678" className="text-lg text-slate-300 hover:text-white transition-colors">+52 55 1234 5678</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Ubicación</p>
                  <p className="text-lg text-slate-300">Ciudad de México, México</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-xl font-black uppercase tracking-widest text-white">Newsletter</h4>
            <p className="text-slate-400 text-lg">Suscríbete para recibir las últimas vacantes y consejos de carrera.</p>
            <NewsletterForm variant="dark" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 font-medium">
            © {currentYear} Hacke's Jobs. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-white transition-colors">Términos</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
