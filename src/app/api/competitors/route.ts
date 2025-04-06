import { NextResponse } from 'next/server';
import { getToken, verify } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const token = await getToken();

    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify the token
    const decoded = await verify(token);
    
    if (!decoded || !decoded.email) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: decoded.email as string }
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get competitors for the user
    const competitors = await prisma.competitor.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return new NextResponse(
      JSON.stringify({ 
        success: true,
        data: competitors
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching competitors:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = await getToken();

    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify the token
    const decoded = await verify(token);
    
    if (!decoded || !decoded.email) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: decoded.email as string }
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { name, website, keywords } = body;

    // Validate required fields
    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create the competitor
    const competitor = await prisma.competitor.create({
      data: {
        userId: user.id,
        name,
        website: website || null,
        keywords: keywords || [],
        mentions: {},
        sentiment: {},
        marketShare: 0
      }
    });

    return new NextResponse(
      JSON.stringify({ 
        success: true,
        data: competitor
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating competitor:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 