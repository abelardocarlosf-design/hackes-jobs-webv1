import { Metadata } from 'next';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Illustration } from '@/components/Illustration';
import { LeadForm } from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Soluciones para Empresas | Hacke\'s Jobs',
  description: 'Encuentra el talento que tu empresa necesita. Reclutamiento especializado, masivo y pruebas psicomǸtricas avanzadas con inteligencia artificial en MǸxico.',
};

export default function EmpresasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-brand-blue/20 selection:text-brand-blue">
      
      {/* 1. HERO SECTION - PREMIUM STITCH STYLE */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Animated background element */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container relative mx-auto px-4 z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-10 text-left">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-brand-blue text-white text-[10px] font-black tracking-[0.3em] uppercase shadow-2xl">
                <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-pulse" aria-hidden="true"></span>
                Partner de Reclutamiento Tech
              </div>
              
              <h1 className="text-6xl sm:text-7xl md:text-[6.5rem] font-black tracking-tighter text-brand-black leading-[0.85]">
                Escala tu Equipo <br/>
                <span className="text-gradient-orange">Sin Friccin.</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-400 max-w-2xl leading-relaxed font-medium">
                Encontramos el talento de élite que tu empresa merece. Utilizamos <span className="text-brand-blue font-black italic underline decoration-4 underline-offset-8">IA y Psicometra Avanzada</span> para garantizar el match cultural y tǸcnico perfecto.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <a href="#contacto">
                  <Button variant="primary" size="xl" className="w-full sm:w-auto shadow-blue/60">
                    Solicitar Talento
                  </Button>
                </a>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">Resultados garantizados <br/> en menos de 15 das</p>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <Illustration 
                src="/images/empresas-hero.png"
                alt="Empresas Hackes Jobs"
                width={600}
                height={500}
                priority={true}
                className="w-full animate-float drop-shadow-premium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-slate-50 border-y border-slate-100 py-12 overflow-hidden">
         <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
               {['98% Retention', '15 Days Avg. Hire', '10k+ Vetted Candidates', '500+ Happy Clients'].map((stat, i) => (
                 <span key={i} className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-brand-black">{stat}</span>
               ))}
            </div>
         </div>
      </section>

      {/* 3. PAIN POINTS SECTION */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1 flex flex-col justify-center space-y-6 pr-8">
                 <h2 className="text-5xl font-black text-brand-black tracking-tighter uppercase leading-none">Los costos ocultos de <br/> <span className="text-brand-orange">No elegir bien.</span></h2>
                 <p className="text-lg text-slate-500 font-medium leading-relaxed">Ignorar la calidad en el reclutamiento destruye el valor de tu compaa.</p>
              </div>
              
              {[
                { t: "Tiempo Perdido", d: "Los procesos internos lentos matan la productividad de tus lderes y desmotivan al equipo." },
                { t: "Fuga de capital", d: "La rotacin por una mala eleccin cuesta hasta un 30% del salario anual del puesto vacante." }
              ].map((p, i) => (
                <Card key={i} className="group hover:bg-brand-black transition-all duration-700">
                   <div className="p-12 space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center transition-all duration-700 group-hover:bg-brand-orange group-hover:text-white" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </div>
                      <h3 className="text-3xl font-black text-brand-black group-hover:text-white transition-colors uppercase tracking-tight leading-none">{p.t}</h3>
                      <p className="text-lg text-slate-500 group-hover:text-slate-400 transition-colors font-medium leading-relaxed">{p.d}</p>
                   </div>
                </Card>
              ))}
           </div>
        </div>
      </section>

      {/* 4. SERVICES - PREMIUM CARDS */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24 space-y-6">
            <span className="text-brand-blue font-black tracking-[0.4em] uppercase text-xs">Nuestro Valor Agregado</span>
            <h2 className="text-5xl md:text-[6rem] font-black tracking-tighter leading-none">Un modelo para <br className="hidden md:block" /> cada necesidad.</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-t-8 border-brand-blue">
               <div className="p-12 sm:p-20 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-brand-black uppercase tracking-tighter leading-none">Reclutamiento Especializado</h3>
                    <p className="text-xl text-slate-500 font-medium">Headhunting de alto nivel para perfiles crticos.</p>
                  </div>
                  <ul className="space-y-6">
                    {['Búsqueda directa y confidencial', 'Evaluación técnica profunda', 'Garantía de reposición extendida'].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-brand-black font-bold uppercase tracking-widest text-[10px]">
                        <div className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </Card>

            <Card className="border-t-8 border-brand-orange">
               <div className="p-12 sm:p-20 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-brand-black uppercase tracking-tighter leading-none">Reclutamiento Masivo</h3>
                    <p className="text-xl text-slate-500 font-medium">Cobertura ágil para expansiones aceleradas.</p>
                  </div>
                  <ul className="space-y-6">
                    {['Velocidad de cobertura garantizada', 'Filtros automatizados por IA', 'Onboarding simplificado'].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-brand-black font-bold uppercase tracking-widest text-[10px]">
                        <div className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. FORM SECTION - STITCH MODAL LOOK */}
      <section id="contacto" className="py-32 bg-brand-slate relative pb-60">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-premium border border-slate-100 relative overflow-hidden transition-all hover:shadow-premium-hover duration-700">
               {/* Background blur decoration */}
               <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none"></div>
               
               <div className="relative z-10 flex flex-col lg:flex-row gap-20">
                  <div className="lg:w-2/5 space-y-8 text-left">
                     <h2 className="text-5xl font-black text-brand-black tracking-tighter uppercase leading-none">Inicia tu <br/> <span className="text-gradient-blue">Transformación.</span></h2>
                     <p className="text-lg text-slate-400 font-medium leading-relaxed">
                       Agenda una consultoría gratuita y construye el equipo que llevará tu empresa al siguiente nivel.
                     </p>
                     <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-4 text-brand-black font-black uppercase tracking-widest text-[10px]">
                           <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-orange">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                           </div>
                           Respuesta en 24h
                        </div>
                        <div className="flex items-center gap-4 text-brand-black font-black uppercase tracking-widest text-[10px]">
                           <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-blue">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                           </div>
                           Diagnóstico Gratuito
                        </div>
                     </div>
                  </div>
                  
                  <div className="lg:w-3/5 bg-slate-50/50 p-8 sm:p-12 rounded-[3rem] border border-slate-100 shadow-inner">
                    <LeadForm />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
