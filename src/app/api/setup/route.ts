import { NextResponse } from 'next/server';
import { getToken, verify } from '@/lib/jwt';
import prisma from '@/lib/prisma';

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
      where: { email: decoded.email }
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { keywords } = body;

    // Validate the data
    if (!Array.isArray(keywords)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid data format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Filter out empty values
    const filteredKeywords = keywords.filter(keyword => keyword.trim() !== '');

    // Check if monitoring items exist
    const existingMonitoringItems = await prisma.monitoringItems.findUnique({
      where: { userId: user.id }
    });

    // Create or update monitoring items
    let monitoringItems;
    if (existingMonitoringItems) {
      // Update existing monitoring items
      monitoringItems = await prisma.monitoringItems.update({
        where: {
          userId: user.id
        },
        data: {
          keywords: filteredKeywords
        }
      });
    } else {
      // Create new monitoring items
      monitoringItems = await prisma.monitoringItems.create({
        data: {
          userId: user.id,
          domains: [],
          brandNames: [],
          keywords: filteredKeywords
        }
      });
    }

    return new NextResponse(
      JSON.stringify({ 
        success: true,
        message: 'Keywords updated successfully',
        data: monitoringItems
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in setup:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

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
      where: { email: decoded.email }
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get monitoring items
    const monitoringItems = await prisma.monitoringItems.findUnique({
      where: { userId: user.id }
    });

    // If no monitoring items exist, create empty ones
    if (!monitoringItems) {
      const newMonitoringItems = await prisma.monitoringItems.create({
        data: {
          userId: user.id,
          domains: [],
          brandNames: [],
          keywords: []
        }
      });

      return new NextResponse(
        JSON.stringify({ 
          success: true,
          data: newMonitoringItems
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new NextResponse(
      JSON.stringify({ 
        success: true,
        data: monitoringItems
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in setup:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 