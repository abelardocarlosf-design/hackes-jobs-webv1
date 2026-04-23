import { NextResponse } from 'next/server';
import { getAllPosts, savePost } from '@/lib/blog';

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const post = await request.json();
    await savePost(post);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar post' }, { status: 500 });
  }
}
