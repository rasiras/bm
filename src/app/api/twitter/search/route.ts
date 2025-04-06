import { NextRequest, NextResponse } from 'next/server';
import { verify } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { searchPlatform } from '@/lib/googleDork';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verify(token);
    if (!decoded || !decoded.email) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email as string }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword');
    const timeRange = searchParams.get('timeRange') || 'w';

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    const posts = await searchPlatform(keyword, 'twitter', timeRange);
    
    // Save posts to database
    const savedPosts = await Promise.all(
      posts.map(post => 
        prisma.brandMention.upsert({
          where: {
            id: post.id,
            userId: user.id
          },
          update: {
            content: post.content,
            platform: post.platform,
            author: post.author,
            sentiment: post.sentiment,
            url: post.url,
            engagement: post.engagement ? JSON.parse(JSON.stringify(post.engagement)) : undefined
          },
          create: {
            id: post.id,
            content: post.content,
            platform: post.platform,
            author: post.author,
            sentiment: post.sentiment,
            url: post.url,
            engagement: post.engagement ? JSON.parse(JSON.stringify(post.engagement)) : undefined,
            userId: user.id
          }
        })
      )
    );

    return NextResponse.json({ data: savedPosts });
  } catch (error) {
    console.error('Error in Twitter search:', error);
    return NextResponse.json(
      { error: 'Failed to search Twitter' },
      { status: 500 }
    );
  }
} 