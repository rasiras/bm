import { NextRequest, NextResponse } from 'next/server';
import { verify } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { searchPlatform } from '@/lib/googleDork';
import { Platform } from '@/types';

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
    const platformParam = searchParams.get('platform');

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    // Define platforms to search
    const platforms: Platform[] = platformParam
      ? [platformParam as Platform]
      : ['twitter', 'reddit', 'facebook', 'news'];

    // Log the search parameters
    console.log(`Performing case-sensitive search for keyword: "${keyword}" across platforms: ${platforms.join(', ')}`);

    // Search all platforms in parallel with case-sensitive exact match
    const searchPromises = platforms.map(platform =>
      searchPlatform(keyword, platform, timeRange as string)
    );

    const results = await Promise.all(searchPromises);
    const allMentions = results.flat();

    // Save all mentions to database
    const savedMentions = await Promise.all(
      allMentions.map(mention =>
        prisma.brandMention.upsert({
          where: {
            id: mention.id,
            userId: user.id
          },
          update: {
            content: mention.content,
            platform: mention.platform,
            author: mention.author,
            sentiment: mention.sentiment,
            url: mention.url,
            engagement: mention.engagement ? JSON.parse(JSON.stringify(mention.engagement)) : undefined
          },
          create: {
            id: mention.id,
            content: mention.content,
            platform: mention.platform,
            author: mention.author,
            sentiment: mention.sentiment,
            url: mention.url,
            engagement: mention.engagement ? JSON.parse(JSON.stringify(mention.engagement)) : undefined,
            userId: user.id
          }
        })
      )
    );

    return NextResponse.json({
      success: true,
      data: savedMentions,
      stats: {
        total: savedMentions.length,
        byPlatform: platforms.reduce((acc, platform) => {
          acc[platform] = savedMentions.filter(m => m.platform === platform).length;
          return acc;
        }, {} as Record<Platform, number>)
      }
    });
  } catch (error) {
    console.error('Error in search:', error);
    return NextResponse.json(
      { error: 'Failed to search for mentions' },
      { status: 500 }
    );
  }
}
