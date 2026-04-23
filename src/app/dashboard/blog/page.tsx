"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, FileText, Loader2, Save, X, Image as ImageIcon } from 'lucide-react';
import { BlogPost } from '@/lib/blog';
import dynamic from 'next/dynamic';

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'Tecnología',
    status: 'draft',
    image: '',
    tags: []
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPost)
      });
      if (res.ok) {
        setIsEditing(false);
        fetchPosts();
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  }

  async function handleDelete(slug: string) {
    if (confirm('Estǭs seguro de eliminar este artículo?')) {
      try {
        await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
        fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-brand-black uppercase tracking-tighter">Gestión de Blog</h1>
          <p className="text-slate-400 font-medium">Crea y edita el contenido educativo de Hacke's Jobs.</p>
        </div>
        {!isEditing && (
          <Button onClick={() => {
            setCurrentPost({ title: '', excerpt: '', content: '', category: 'Tecnología', status: 'draft', image: '', tags: [] });
            setIsEditing(true);
          }} variant="secondary" className="flex gap-2 h-14 px-8 rounded-2xl shadow-orange/20">
            <Plus size={18} /> Nuevo Artículo
          </Button>
        )}
      </div>

      {isEditing ? (
        <Card className="p-10 space-y-10 animate-in fade-in zoom-in duration-500">
           <div className="flex items-center justify-between border-b border-slate-50 pb-6">
              <h2 className="text-2xl font-black text-brand-black uppercase tracking-tighter">Editor de Contenido</h2>
              <Button variant="ghost" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-brand-black">
                 <X size={24} />
              </Button>
           </div>

           <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Título del Artículo</label>
                    <input 
                      type="text" 
                      placeholder="Ej: El futuro del trabajo remoto en MǸxico"
                      className="w-full h-16 bg-slate-50 border-none rounded-2xl px-8 font-black text-2xl text-brand-black focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                      value={currentPost.title}
                      onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cuerpo del Post</label>
                    <div className="rounded-2xl overflow-hidden border border-slate-100">
                      <ReactQuill 
                        theme="snow" 
                        value={currentPost.content}
                        onChange={content => setCurrentPost({...currentPost, content})}
                        className="bg-white min-h-[400px]"
                      />
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Resumen (Excerpt)</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-slate-50 border-none rounded-2xl p-6 font-bold text-slate-600 focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all resize-none"
                      value={currentPost.excerpt}
                      onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Categoría</label>
                    <select 
                      className="w-full h-14 bg-slate-50 border-none rounded-xl px-6 font-bold text-brand-black focus:ring-2 focus:ring-brand-blue/20 outline-none appearance-none cursor-pointer"
                      value={currentPost.category}
                      onChange={e => setCurrentPost({...currentPost, category: e.target.value})}
                    >
                       <option>Tecnología</option>
                       <option>Recursos Humanos</option>
                       <option>Career Advice</option>
                       <option>Mercado Laboral</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">URL Imagen de Portada</label>
                    <div className="relative">
                       <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                       <input 
                        type="text" 
                        placeholder="https://..."
                        className="w-full h-14 bg-slate-50 border-none rounded-xl pl-12 pr-6 font-bold text-slate-600 text-sm focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                        value={currentPost.image}
                        onChange={e => setCurrentPost({...currentPost, image: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="pt-6">
                    <Button onClick={handleSave} className="w-full h-16 rounded-2xl flex gap-3 text-sm font-black uppercase tracking-widest">
                       <Save size={18} /> Guardar Cambios
                    </Button>
                 </div>
              </div>
           </div>
        </Card>
      ) : (
        <div className="space-y-6">
           <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-6 rounded-3xl border border-slate-50 shadow-sm">
              <div className="relative flex-grow">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                 <input 
                  type="text" 
                  placeholder="Filtrar por título o categoría..." 
                  className="h-12 w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                 />
              </div>
              <Button variant="outline" className="flex gap-2 rounded-xl">
                 <Filter size={16} /> Filtros
              </Button>
           </div>

           <div className="grid gap-6">
             {loading ? (
               <div className="py-20 flex justify-center">
                  <Loader2 className="animate-spin text-brand-blue" size={40} />
               </div>
             ) : posts.map((post) => (
               <Card key={post.slug} className="p-6 group hover:border-brand-blue/20 transition-all shadow-premium">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                     <div className="w-32 h-20 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                        {post.image ? <img src={post.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-200"><ImageIcon size={24} /></div>}
                     </div>
                     
                     <div className="flex-grow space-y-1">
                        <div className="flex items-center gap-3">
                           <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-brand-blue/5 text-brand-blue">{post.category}</span>
                           <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${post.status === 'published' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}>{post.status}</span>
                        </div>
                        <h3 className="text-xl font-black text-brand-black tracking-tight group-hover:text-brand-blue transition-colors uppercase">{post.title}</h3>
                     </div>

                     <div className="flex items-center gap-2">
                        <Button variant="ghost" className="h-12 w-12 p-0 rounded-xl text-slate-400 hover:text-brand-blue hover:bg-brand-blue/5">
                           <Edit size={18} />
                        </Button>
                        <Button 
                          onClick={() => handleDelete(post.slug)}
                          variant="ghost" 
                          className="h-12 w-12 p-0 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50"
                        >
                           <Trash2 size={18} />
                        </Button>
                     </div>
                  </div>
               </Card>
             ))}
           </div>
        </div>
      )}
    </div>
  );
}
