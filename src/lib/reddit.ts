import { BrandMention } from '@/types';

// Reddit API credentials
const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_USERNAME = process.env.REDDIT_USERNAME;
const REDDIT_PASSWORD = process.env.REDDIT_PASSWORD;

// Function to get Reddit access token
async function getRedditToken(): Promise<string> {
  if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET || !REDDIT_USERNAME || !REDDIT_PASSWORD) {
    throw new Error('Reddit API credentials not configured');
  }

  const auth = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=password&username=${REDDIT_USERNAME}&password=${REDDIT_PASSWORD}`,
  });

  if (!response.ok) {
    throw new Error('Failed to get Reddit access token');
  }

  const data = await response.json();
  return data.access_token;
}

// Function to search Reddit posts and comments
export async function searchReddit(keyword: string): Promise<BrandMention[]> {
  try {
    // If we don't have Reddit API credentials, return mock data
    if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET) {
      console.log('Reddit API credentials not found, returning mock data');
      return generateMockRedditPosts(keyword);
    }

    const token = await getRedditToken();
    
    // Search for posts and comments
    const response = await fetch(
      `https://oauth.reddit.com/search?q=${encodeURIComponent(keyword)}&sort=new&limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'BrandMonitor/1.0.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform Reddit data to BrandMention format
    return data.data.children.map((item: any) => {
      const post = item.data;
      const isComment = post.kind === 't1';
      
      return {
        id: post.id,
        content: isComment ? post.body : post.title,
        platform: 'reddit',
        author: `u/${post.author}`,
        sentiment: analyzeSentiment(isComment ? post.body : post.title),
        url: `https://reddit.com${post.permalink}`,
        engagement: {
          likes: post.score,
          comments: post.num_comments || 0,
        },
        createdAt: new Date(post.created_utc * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Error searching Reddit:', error);
    // Return mock data in case of error
    return generateMockRedditPosts(keyword);
  }
}

// Simple sentiment analysis function (reused from Twitter implementation)
function analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'best', 'awesome', 'perfect', 'happy', 'wonderful'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'disappointed', 'poor', 'sad', 'angry'];
  
  const lowerText = text.toLowerCase();
  
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

// Generate mock Reddit posts for development/testing
function generateMockRedditPosts(keyword: string): BrandMention[] {
  const sentiments: ('positive' | 'neutral' | 'negative')[] = ['positive', 'neutral', 'negative'];
  const usernames = ['redditor1', 'redditor2', 'redditor3', 'redditor4', 'redditor5'];
  const subreddits = ['technology', 'business', 'marketing', 'startups', 'entrepreneur'];
  
  return Array.from({ length: 5 }, (_, i) => {
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    const username = usernames[i];
    const subreddit = subreddits[i];
    const id = `mock-reddit-${i}-${Date.now()}`;
    const createdAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
    
    let content = '';
    switch (sentiment) {
      case 'positive':
        content = `I've been using ${keyword} for a while now and it's been a game-changer for my workflow. Highly recommend!`;
        break;
      case 'negative':
        content = `I'm having issues with ${keyword}. The interface is confusing and support hasn't been helpful.`;
        break;
      default:
        content = `Just discovered ${keyword}. Anyone have experience with it? Looking for honest reviews.`;
    }
    
    return {
      id,
      content,
      platform: 'reddit',
      author: `u/${username}`,
      sentiment,
      url: `https://reddit.com/r/${subreddit}/comments/${id}`,
      engagement: {
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 20),
      },
      createdAt,
      updatedAt: new Date().toISOString(),
    };
  });
} 