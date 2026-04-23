import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/Card';
import { getAllPosts } from '@/lib/blog';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Blog | Hacke\'s Jobs',
  description: 'Explora las últimas tendencias en reclutamiento, tecnología y desarrollo profesional en México.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const publishedPosts = posts.filter(p => p.status === 'published');

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-brand-blue/20 selection:text-brand-blue">
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-light.svg')] opacity-[0.05]"></div>
        <div className="container relative mx-auto px-4 text-center z-10 max-w-4xl">
          <span className="text-brand-orange font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Insights de Talento</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none uppercase">Hacke's <br/> <span className="text-gradient-blue">Journal.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">Historias, tendencias y guías para dominar el mercado laboral actual.</p>
        </div>
      </section>

      {/* 2. POSTS GRID */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {publishedPosts.length > 0 ? publishedPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="group border-none shadow-2xl shadow-slate-100 hover:shadow-premium transition-all duration-700 h-full flex flex-col rounded-[2.5rem] overflow-hidden">
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    {post.image ? (
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand-blue/5 text-brand-blue">
                         <span className="font-black text-4xl uppercase tracking-tighter opacity-20">HJ</span>
                      </div>
                    )}
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-md text-brand-black text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl border border-white/20">
                        {post.category || 'Recursos'}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-10 flex-grow flex flex-col space-y-6">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                       {new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h2 className="text-3xl font-black text-brand-black tracking-tighter group-hover:text-brand-blue transition-colors uppercase leading-none">{post.title}</h2>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="pt-4 mt-auto">
                       <span className="text-brand-orange font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                          Leer artículo <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                       </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )) : (
              <div className="col-span-full text-center py-40">
                <p className="text-slate-300 font-black uppercase tracking-[0.4em] text-sm">Próximamente más artículos</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. NEWSLETTER SECTION */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-4">
           <div className="max-w-5xl mx-auto bg-brand-orange rounded-[4rem] p-12 md:p-24 text-center space-y-10 shadow-orange relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              
              <span className="text-white/60 font-black tracking-[0.4em] uppercase text-xs block">Newsletter Exclusiva</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none uppercase">Recibe lo mejor <br/> en tu bandeja.</h2>
              <p className="text-white/80 text-xl font-medium max-w-2xl mx-auto">
                Únete a más de 5,000 profesionales que reciben consejos semanales sobre el mercado laboral y talento IT.
              </p>
              
              <NewsletterForm />
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Sin spam, solo valor. Cancela cuando quieras.</p>
           </div>
        </div>
      </section>
    </div>
  );
}
