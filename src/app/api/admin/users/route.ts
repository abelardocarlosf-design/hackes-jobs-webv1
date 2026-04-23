import { NextResponse } from 'next/server';
import { getUsers, addUser } from '@/lib/auth';

export async function GET() {
  try {
    const users = await getUsers();
    // No devolver hashes en el listado
    const safeUsers = users.map(({ passwordHash, ...user }) => user);
    return NextResponse.json(safeUsers);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const newUser = await addUser(userData);
    const { passwordHash, ...safeUser } = newUser;
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 });
  }
}
