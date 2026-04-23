"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Download, Brain, Star, Target, Zap, ArrowLeft, Loader2, Share2, FileText } from 'lucide-react';
import dynamic from 'next/dynamic';

// Importación dinámica de PDFDownloadLink para evitar errores de SSR
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

const DISCPdfDocument = dynamic(
  () => import('@/components/DISCPdfDocument').then(mod => mod.DISCPdfDocument),
  { ssr: false }
);

function ResultsContent() {
  const searchParams = useSearchParams();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const D = Number(searchParams.get('D')) || 0;
  const I = Number(searchParams.get('I')) || 0;
  const S = Number(searchParams.get('S')) || 0;
  const C = Number(searchParams.get('C')) || 0;

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const response = await fetch('/api/disc/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ D, I, S, C }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          setAnalysis(data.analysis);
        } else {
          setError(data.error || "Error al generar el análisis");
        }
      } catch (err) {
        setError("Error de conexión con el servicio de IA");
      } finally {
        setLoading(false);
      }
    }

    if (D || I || S || C) {
      fetchAnalysis();
    }
  }, [D, I, S, C]);

  const scores = [
    { label: 'Dominancia', value: D, color: 'bg-brand-blue', icon: <Target size={20} />, desc: 'Enfoque en resultados y desafíos.' },
    { label: 'Influencia', value: I, color: 'bg-brand-orange', icon: <Zap size={20} />, desc: 'Habilidad para persuadir y colaborar.' },
    { label: 'Estabilidad', value: S, color: 'bg-emerald-500', icon: <Star size={20} />, desc: 'Paciencia, apoyo y consistencia.' },
    { label: 'Cumplimiento', value: C, color: 'bg-slate-700', icon: <FileText size={20} />, desc: 'Atención al detalle y normas.' },
  ];

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-8">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
           <Target size={48} />
        </div>
        <h2 className="text-4xl font-black text-brand-black uppercase tracking-tighter">Ups, algo salió mal</h2>
        <p className="text-xl text-slate-500 font-medium">{error}</p>
        <Link href="/psicometrias/disc">
          <Button variant="secondary" size="xl">Reintentar test</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-6">
          <Link href="/psicometrias" className="inline-flex items-center gap-3 text-brand-orange font-black text-[10px] uppercase tracking-[0.4em] hover:gap-5 transition-all">
            <ArrowLeft size={16} strokeWidth={3} />
            Volver a evaluaciones
          </Link>
          <h1 className="text-6xl md:text-8xl font-black text-brand-black tracking-tighter uppercase leading-none">
            Tu Perfil <br/> <span className="text-gradient-blue">Profesional.</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="dark" size="lg" className="rounded-2xl h-16 px-8 group">
             <Share2 className="mr-2 group-hover:scale-110 transition-transform" size={20} /> Compartir
          </Button>
          
          {analysis && (
            <PDFDownloadLink 
              document={<DISCPdfDocument scores={{D, I, S, C}} analysis={analysis} />} 
              fileName="reporte-disc-hackes-jobs.pdf"
            >
              {({ loading: pdfLoading }) => (
                <Button variant="secondary" size="lg" className="rounded-2xl h-16 px-8 shadow-orange/20" disabled={pdfLoading}>
                  {pdfLoading ? (
                    <><Loader2 className="mr-2 animate-spin" size={20} /> Generando...</>
                  ) : (
                    <><Download className="mr-2" size={20} /> Descargar Reporte PDF</>
                  )}
                </Button>
              )}
            </PDFDownloadLink>
          )}
        </div>
      </div>

      {/* Grid Results */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Scores List */}
        <div className="lg:col-span-1 space-y-6">
          {scores.map((score) => (
            <Card key={score.label} className="border-none shadow-xl shadow-slate-100 overflow-hidden rounded-3xl group hover:shadow-premium transition-all duration-500">
               <div className="p-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className={`w-12 h-12 ${score.color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                       {score.icon}
                    </div>
                    <span className="text-4xl font-black text-brand-black tracking-tighter italic">{score.value}%</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-brand-black uppercase tracking-tight mb-1">{score.label}</h3>
                    <p className="text-sm text-slate-500 font-medium">{score.desc}</p>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${score.color} transition-all duration-1000 delay-500`}
                      style={{ width: `${score.value}%` }}
                    />
                  </div>
               </div>
            </Card>
          ))}
        </div>

        {/* AI Analysis */}
        <Card className="lg:col-span-2 border-none shadow-premium bg-brand-black text-white rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <CardHeader className="p-12 md:p-16 pb-0 relative z-10">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-orange">
                   <Brain size={24} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Análisis Inteligente por HJ-AI</span>
             </div>
             <CardTitle className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
               Interpretación del <span className="text-brand-blue">Comportamiento.</span>
             </CardTitle>
          </CardHeader>
          <CardContent className="p-12 md:p-16 pt-10 relative z-10">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <Loader2 className="animate-spin text-brand-blue" size={48} />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Procesando vectores de personalidad...</p>
              </div>
            ) : (
              <div className="space-y-8">
                 <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed italic">
                   "{analysis}"
                 </p>
                 <div className="pt-8 border-t border-white/10 flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Este análisis ha sido generado basándose exclusivamente en tus respuestas al test DISC.</p>
                 </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Final Action */}
      <div className="pt-10 text-center">
        <Link href="/psicometrias">
          <Button variant="ghost" size="lg" className="text-slate-400 hover:text-brand-black font-black uppercase tracking-widest">
            Volver al catálogo
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function ResultadoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-brand-orange/20 selection:text-brand-orange">
      <main className="flex-grow container mx-auto px-4 py-20 max-w-6xl">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-40 text-slate-300">
            <div className="w-20 h-20 border-8 border-slate-100 border-t-brand-orange rounded-full animate-spin mb-10"></div>
            <p className="font-black uppercase tracking-[0.4em] text-sm animate-pulse">Preparando reporte HJ...</p>
          </div>
        }>
          <ResultsContent />
        </Suspense>
      </main>
    </div>
  );
}
