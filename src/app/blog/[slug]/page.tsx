import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post no encontrado' };
  
  return {
    title: `${post.title} | Hacke's Jobs Journal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white font-sans selection:bg-brand-orange/20 selection:text-brand-orange">
      {/* Header / Hero */}
      <header className="pt-32 pb-16 md:pt-40 md:pb-32 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-light.svg')] opacity-[0.05]"></div>
        <div className="container relative mx-auto px-4 z-10 max-w-4xl text-center space-y-10">
          <Link href="/blog" className="inline-flex items-center gap-3 text-brand-orange font-black text-[10px] uppercase tracking-[0.3em] hover:gap-5 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Volver al blog
          </Link>
          
          <div className="space-y-6">
             <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
               {new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-brand-black tracking-tighter leading-none uppercase">
               {post.title}
             </h1>
             <div className="flex justify-center items-center gap-4">
                <span className="bg-brand-blue text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                  {post.category || 'Recursos'}
                </span>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Por Equipo Hacke's Jobs</span>
             </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl py-24 md:py-32">
        {post.image && (
          <div className="mb-20 rounded-[3rem] overflow-hidden shadow-premium">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto"
            />
          </div>
        )}
        
        <div 
          className="prose prose-2xl prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:text-brand-black prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-brand-black prose-a:text-brand-blue prose-img:rounded-[2rem] prose-img:shadow-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-32 pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="space-y-2 text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">¿Te gustó este artículo?</p>
              <h3 className="text-2xl font-black text-brand-black uppercase tracking-tight italic">Compártelo con tu red profesional</h3>
           </div>
           
           <div className="flex gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all cursor-pointer">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </div>
              ))}
           </div>
        </div>
      </div>
    </article>
  );
}
