"use client";

import { useState } from 'react';
import { discQuestions } from '@/data/discQuestions';
import { Button } from './Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './Card';
import { CheckCircle2, ChevronRight, ChevronLeft, Target, Lightbulb, Users, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DiscResults {
  D: number;
  I: number;
  S: number;
  C: number;
}

export function DiscTest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalQuestions = discQuestions.length;
  const progress = (Object.keys(answers).length / totalQuestions) * 100;

  const handleAnswer = (questionId: number, type: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: type }));
    if (currentStep < totalQuestions - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    }
  };

  const calculateResults = () => {
    setIsLoading(true);
    const counts = { D: 0, I: 0, S: 0, C: 0 };
    Object.values(answers).forEach(type => {
      counts[type as keyof typeof counts]++;
    });

    const percentages = {
      D: Math.round((counts.D / totalQuestions) * 100),
      I: Math.round((counts.I / totalQuestions) * 100),
      S: Math.round((counts.S / totalQuestions) * 100),
      C: Math.round((counts.C / totalQuestions) * 100),
    };

    // Guardamos en sessionStorage para la página de resultados
    sessionStorage.setItem('disc_results', JSON.stringify(percentages));
    
    setTimeout(() => {
      router.push('/psicometrias/disc/resultado');
    }, 1500);
  };

  const currentQuestion = discQuestions[currentStep];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-brand-blue/20 rounded-full animate-pulse" />
          <div className="absolute inset-0 border-4 border-t-brand-blue rounded-full animate-spin" />
        </div>
        <h3 className="text-3xl font-black text-brand-black mb-4 uppercase tracking-tighter">Procesando Perfil</h3>
        <p className="text-slate-600 max-w-md mx-auto">Nuestro motor de IA está analizando tus respuestas para generar tu reporte de personalidad laboral...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-blue">Progreso de Evaluación</span>
            <h2 className="text-3xl font-black text-brand-black uppercase tracking-tighter">Pregunta {currentStep + 1} de {totalQuestions}</h2>
          </div>
          <span className="text-4xl font-black text-brand-blue">{Math.round(progress)}%</span>
        </div>
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div 
            className="h-full bg-gradient-to-r from-brand-blue to-brand-orange transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 p-10">
          <CardTitle className="text-3xl normal-case font-bold leading-tight">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 sm:p-12 space-y-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(currentQuestion.id, option.type)}
              className={cn(
                "w-full group relative flex items-center p-6 text-left transition-all duration-300 rounded-[2rem] border-2",
                answers[currentQuestion.id] === option.type
                  ? "border-brand-blue bg-blue-50/50 shadow-blue/10 shadow-lg"
                  : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50"
              )}
            >
              <div className={cn(
                "flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-300 mr-6",
                answers[currentQuestion.id] === option.type
                  ? "bg-brand-blue text-white"
                  : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"
              )}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className={cn(
                "text-lg font-medium pr-8",
                answers[currentQuestion.id] === option.type ? "text-brand-blue" : "text-slate-700"
              )}>
                {option.text}
              </span>
              {answers[currentQuestion.id] === option.type && (
                <CheckCircle2 className="absolute right-8 w-8 h-8 text-brand-blue" />
              )}
            </button>
          ))}
        </CardContent>
        <CardFooter className="bg-slate-50 border-t border-slate-100 p-8 flex justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="rounded-2xl"
          >
            <ChevronLeft className="mr-2 w-5 h-5" /> Anterior
          </Button>
          
          {Object.keys(answers).length === totalQuestions ? (
            <Button 
              variant="secondary" 
              size="lg"
              onClick={calculateResults}
              className="px-10 rounded-2xl font-black"
            >
              Finalizar Test <Target className="ml-2 w-6 h-6" />
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.min(totalQuestions - 1, prev + 1))}
              disabled={!answers[currentQuestion.id]}
              className="rounded-2xl"
            >
              Siguiente <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Types Legend */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-4 bg-white rounded-3xl border border-slate-100 shadow-premium">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center"><Target size={20} /></div>
          <span className="text-xs font-black uppercase text-slate-500">Dominancia</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white rounded-3xl border border-slate-100 shadow-premium">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center"><Lightbulb size={20} /></div>
          <span className="text-xs font-black uppercase text-slate-500">Influencia</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white rounded-3xl border border-slate-100 shadow-premium">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><Users size={20} /></div>
          <span className="text-xs font-black uppercase text-slate-500">Estabilidad</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white rounded-3xl border border-slate-100 shadow-premium">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"><ShieldCheck size={20} /></div>
          <span className="text-xs font-black uppercase text-slate-500">Cumplimiento</span>
        </div>
      </div>
    </div>
  );
}
