import Image from 'next/image';
import { cn } from '@/lib/utils';

interface IllustrationProps {
  name: 'hero' | 'empresas' | 'candidatos' | 'psicometria' | 'dashboard';
  className?: string;
  priority?: boolean;
}

export function Illustration({ name, className, priority = false }: IllustrationProps) {
  const images = {
    hero: '/images/hero-illustration.png',
    empresas: '/images/empresas-illustration.png',
    candidatos: '/images/candidatos-illustration.png',
    psicometria: '/images/psicometria-illustration.png',
    dashboard: '/images/dashboard-illustration.png',
  };

  const colors = {
    hero: 'from-brand-blue/20 to-transparent',
    empresas: 'from-brand-orange/20 to-transparent',
    candidatos: 'from-brand-blue/20 to-transparent',
    psicometria: 'from-indigo-500/20 to-transparent',
    dashboard: 'from-brand-black/10 to-transparent',
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Decorative Glow */}
      <div className={cn(
        "absolute -inset-4 bg-gradient-to-br blur-3xl opacity-30 rounded-full transition-opacity duration-500 group-hover:opacity-50",
        colors[name]
      )} />
      
      <div className="relative aspect-square w-full transform transition-all duration-700 hover:scale-105 hover:-rotate-1">
        <Image
          src={images[name]}
          alt={`${name} illustration`}
          fill
          priority={priority}
          className="object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
