import { NextResponse } from 'next/server';
import { getToken, verify } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Get the token from cookies
    const token = await getToken();

    if (!token) {
      console.log('No token found in cookies');
      return new NextResponse(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify the token
    const decoded = await verify(token);

    if (!decoded || !decoded.email) {
      console.log('Invalid token or no email in token');
      return new NextResponse(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('User email from token:', decoded.email);

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: decoded.email as string }
    });

    if (!user) {
      console.log('User not found for email:', decoded.email);
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('User found:', user.id);

    // Get brand mentions for the user
    const mentions = await prisma.brandMention.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${mentions.length} mentions for user ${user.id}`);

    // If no mentions found, return empty array instead of error
    return new NextResponse(
      JSON.stringify({
        success: true,
        data: mentions || []
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching mentions:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Get the token from cookies
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
    const { content, platform, author, sentiment, url, engagement } = body;

    // Validate required fields
    if (!content || !platform || !author || !sentiment) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create the brand mention
    const mention = await prisma.brandMention.create({
      data: {
        userId: user.id,
        content,
        platform,
        author,
        sentiment,
        url: url || null,
        engagement: engagement || null
      }
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: mention
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating mention:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Get the token from cookies
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
    const { ids } = body;

    // Validate required fields
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing or invalid mention IDs' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Delete the brand mentions
    const result = await prisma.brandMention.deleteMany({
      where: {
        id: { in: ids },
        userId: user.id // Ensure user can only delete their own mentions
      }
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: `Successfully deleted ${result.count} mentions`,
        count: result.count
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting mentions:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}