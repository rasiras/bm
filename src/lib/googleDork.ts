import { BrandMention, Platform, Sentiment } from '@/types';
import { analyzeSentiment } from './sentiment';

interface GoogleSearchResult {
  title: string;
  link: string;
  snippet: string;
  date?: string;
}

export async function searchGoogleDork(
  query: string,
  site: string,
  timeRange: string = 'w' // w = week, m = month, y = year
): Promise<GoogleSearchResult[]> {
  try {
    const searchQuery = encodeURIComponent(`${query} site:${site}`);
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${searchQuery}&tbs=qdr:${timeRange}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Google search results');
    }

    const data = await response.json();
    return data.items?.map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      date: item.pagemap?.metatags?.[0]?.['article:published_time'] || undefined
    })) || [];
  } catch (error) {
    console.error('Error searching Google:', error);
    return [];
  }
}

export async function searchPlatform(
  keyword: string,
  platform: Platform,
  timeRange: string = 'w'
): Promise<BrandMention[]> {
  const siteMap = {
    twitter: 'x.com',
    reddit: 'reddit.com',
    facebook: 'facebook.com',
    news: 'news.google.com'
  };

  const site = siteMap[platform];
  if (!site) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  const results = await searchGoogleDork(keyword, site, timeRange);
  
  return results.map(result => ({
    id: Math.random().toString(36).substring(7),
    content: result.snippet,
    platform,
    author: extractAuthor(result.title, platform),
    sentiment: analyzeSentiment(result.snippet),
    url: result.link,
    createdAt: result.date || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
}

function extractAuthor(title: string, platform: Platform): string {
  switch (platform) {
    case 'twitter':
      // Extract username from "Username on X" format
      const twitterMatch = title.match(/^(.+?)\s+on X/);
      return twitterMatch ? twitterMatch[1] : 'Unknown User';
    
    case 'reddit':
      // Extract subreddit and username from "Post title : subreddit" format
      const redditMatch = title.match(/: r\/([^:]+)/);
      return redditMatch ? `r/${redditMatch[1]}` : 'Unknown Subreddit';
    
    case 'facebook':
      // Extract page name from "Page Name - Facebook" format
      const facebookMatch = title.match(/^(.+?)\s+-\s+Facebook/);
      return facebookMatch ? facebookMatch[1] : 'Unknown Page';
    
    case 'news':
      // Extract source from "Title - Source" format
      const newsMatch = title.match(/\s+-\s+([^-]+)$/);
      return newsMatch ? newsMatch[1].trim() : 'Unknown Source';
    
    default:
      return 'Unknown Author';
  }
} 