import { NextResponse } from 'next/server';
import { getToken, verify } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const token = await getToken();

    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401 }
      );
    }

    const decoded = await verify(token);
    if (!decoded?.email) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in user route:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
} 