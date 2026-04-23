import Link from 'next/link';
import { Button } from '@/components/Button';
import { Card, CardContent } from '@/components/Card';
import { Illustration } from '@/components/Illustration';
import { Target, Users, Zap, Brain, ChevronRight, Star, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="container-custom pt-12 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-blue/5 border border-brand-blue/10 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-brand-blue">Impulsando el futuro del trabajo</span>
            </div>
            
            <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-[0.9] text-brand-black uppercase">
              Reclutamiento <span className="text-brand-blue">Inteligente</span> <br />
              con <span className="text-brand-orange">IA</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl">
              Conectamos a las empresas más innovadoras con el talento tech de élite, utilizando IA para evaluaciones de perfil precisas y eficientes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/empresas">
                <Button size="xl" variant="primary" className="w-full sm:w-auto shadow-blue">
                  Contratar Talento
                </Button>
              </Link>
              <Link href="/candidatos">
                <Button size="xl" variant="dark" className="w-full sm:w-auto">
                  Encontrar Trabajo
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex items-center gap-12 border-t border-slate-100">
              <div className="space-y-1">
                <p className="text-3xl font-black text-brand-black">500+</p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Empresas</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-brand-black">10k+</p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Candidatos</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-brand-black">98%</p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Match Rate</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Illustration name="hero" className="w-full max-w-2xl mx-auto" priority />
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-[2.5rem] shadow-premium hidden sm:block animate-float">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Brain size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Perfil DISC Analizado</p>
                  <p className="text-lg font-black text-brand-black">Match del 94.5%</p>
                </div>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-brand-black py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue blur-[120px] rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-brand-orange blur-[120px] rounded-full -ml-20 -mb-20" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center space-y-6 mb-24">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">Nuestra Metodología</span>
            <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tighter uppercase">¿Por qué <span className="text-brand-blue">Hacke's Jobs</span>?</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
              Utilizamos tecnología de vanguardia para humanizar el proceso de reclutamiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Zap className="text-brand-blue" size={32} />,
                title: "IA Matching",
                desc: "Algoritmos avanzados que analizan no solo habilidades técnicas, sino también culturales y de comportamiento."
              },
              {
                icon: <Brain className="text-brand-orange" size={32} />,
                title: "Test DISC",
                desc: "Evaluaciones psicométricas integradas para entender el estilo de trabajo y personalidad de cada candidato."
              },
              {
                icon: <Target className="text-white" size={32} />,
                title: "Foco en Tech",
                desc: "Expertos en reclutamiento IT que hablan tu mismo idioma y entienden las necesidades del sector."
              }
            ].map((feature, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 group">
                <CardContent className="p-12 space-y-8">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{feature.title}</h3>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom">
        <div className="bg-gradient-to-br from-brand-blue to-blue-800 rounded-[4rem] p-12 sm:p-24 relative overflow-hidden shadow-blue">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white blur-[100px] rounded-full" />
          </div>
          
          <div className="relative z-10 max-w-3xl space-y-10">
            <h2 className="text-5xl sm:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              ¿Listo para dar el <span className="text-brand-orange underline decoration-8 underline-offset-8">siguiente</span> paso?
            </h2>
            <p className="text-xl sm:text-2xl text-blue-100 font-medium leading-relaxed">
              Ya sea que busques el mejor talento o tu próximo gran reto profesional, estamos aquí para hackear el proceso para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Button size="xl" variant="dark" className="rounded-3xl px-12 group">
                Empezar Ahora <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button size="xl" variant="ghost" className="text-white hover:bg-white/10 rounded-3xl">
                Ver Vacantes
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
