import { DiscTest } from '@/components/DiscTest';

export const metadata = {
  title: 'Test DISC | Hacke\'s Jobs',
  description: 'Inicia tu evaluación psicométrica DISC. Un proceso rápido de 24 preguntas que revelará tu perfil conductual profesional.',
};

export default function DiscTestPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-brand-orange/20 selection:text-brand-orange">
      {/* Test Section */}
      <section className="flex-grow pt-32 pb-24 md:pt-40 md:pb-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-light.svg')] opacity-[0.03]"></div>
        <div className="container relative mx-auto px-4 z-10">
          <DiscTest />
        </div>
      </section>

      {/* Footer Info */}
      <section className="bg-white py-12 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Hacke's Jobs · Psicometría Validada v2.4</p>
        </div>
      </section>
    </div>
  );
}
