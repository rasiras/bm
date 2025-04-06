import { BrandMention } from '@/types';

// Twitter API credentials
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

// Function to search tweets based on a keyword
export async function searchTweets(keyword: string): Promise<BrandMention[]> {
  try {
    // If we don't have Twitter API credentials, return mock data
    if (!TWITTER_BEARER_TOKEN) {
      console.log('Twitter API credentials not found, returning mock data');
      return generateMockTweets(keyword);
    }

    // Make API request to Twitter
    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(keyword)}&max_results=10&tweet.fields=created_at,public_metrics,author_id&expansions=author_id&user.fields=name,username`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform Twitter data to BrandMention format
    return data.data.map((tweet: any) => {
      const author = data.includes.users.find((user: any) => user.id === tweet.author_id);
      
      return {
        id: tweet.id,
        content: tweet.text,
        platform: 'twitter',
        author: author ? `${author.name} (@${author.username})` : 'Unknown',
        sentiment: analyzeSentiment(tweet.text),
        url: `https://twitter.com/${author?.username}/status/${tweet.id}`,
        engagement: {
          likes: tweet.public_metrics?.like_count || 0,
          retweets: tweet.public_metrics?.retweet_count || 0,
          replies: tweet.public_metrics?.reply_count || 0,
        },
        createdAt: tweet.created_at,
        updatedAt: new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Error searching tweets:', error);
    // Return mock data in case of error
    return generateMockTweets(keyword);
  }
}

// Simple sentiment analysis function
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

// Generate mock tweets for development/testing
function generateMockTweets(keyword: string): BrandMention[] {
  const sentiments: ('positive' | 'neutral' | 'negative')[] = ['positive', 'neutral', 'negative'];
  const usernames = ['user1', 'user2', 'user3', 'user4', 'user5'];
  const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown'];
  
  return Array.from({ length: 5 }, (_, i) => {
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    const username = usernames[i];
    const name = names[i];
    const id = `mock-tweet-${i}-${Date.now()}`;
    const createdAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
    
    let content = '';
    switch (sentiment) {
      case 'positive':
        content = `I love ${keyword}! It's amazing and has really improved my workflow. Highly recommend!`;
        break;
      case 'negative':
        content = `I'm disappointed with ${keyword}. It doesn't work as advertised and was a waste of money.`;
        break;
      default:
        content = `Just tried ${keyword} for the first time. Not sure what to think yet, will update later.`;
    }
    
    return {
      id,
      content,
      platform: 'twitter',
      author: `${name} (@${username})`,
      sentiment,
      url: `https://twitter.com/${username}/status/${id}`,
      engagement: {
        likes: Math.floor(Math.random() * 100),
        retweets: Math.floor(Math.random() * 50),
        replies: Math.floor(Math.random() * 20),
      },
      createdAt,
      updatedAt: new Date().toISOString(),
    };
  });
} 