import { BrandMention } from '@/types';

// Facebook API credentials
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

// Function to search Facebook posts and comments
export async function searchFacebook(keyword: string): Promise<BrandMention[]> {
  try {
    // If we don't have Facebook API credentials, return mock data
    if (!FACEBOOK_ACCESS_TOKEN) {
      console.log('Facebook API credentials not found, returning mock data');
      return generateMockFacebookPosts(keyword);
    }

    // Make API request to Facebook Graph API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/search?q=${encodeURIComponent(keyword)}&type=post&access_token=${FACEBOOK_ACCESS_TOKEN}&fields=id,message,created_time,from,shares,reactions.summary(true),comments.summary(true)`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Facebook API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform Facebook data to BrandMention format
    return data.data.map((post: any) => {
      const author = post.from;
      
      return {
        id: post.id,
        content: post.message || '',
        platform: 'facebook',
        author: author ? `${author.name}` : 'Unknown',
        sentiment: analyzeSentiment(post.message || ''),
        url: `https://facebook.com/${post.id}`,
        engagement: {
          likes: post.reactions?.summary?.total_count || 0,
          shares: post.shares?.count || 0,
          comments: post.comments?.summary?.total_count || 0,
        },
        createdAt: post.created_time,
        updatedAt: new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Error searching Facebook:', error);
    // Return mock data in case of error
    return generateMockFacebookPosts(keyword);
  }
}

// Function to analyze sentiment of text
function analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const positiveWords = ['love', 'great', 'awesome', 'amazing', 'excellent', 'best', 'good', 'perfect', 'happy', 'wonderful'];
  const negativeWords = ['hate', 'terrible', 'awful', 'bad', 'worst', 'poor', 'disappointed', 'angry', 'sad', 'horrible'];
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

// Generate mock Facebook posts for development/testing
function generateMockFacebookPosts(keyword: string): BrandMention[] {
  const sentiments: ('positive' | 'neutral' | 'negative')[] = ['positive', 'neutral', 'negative'];
  const names = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson'];
  const pages = ['Tech News', 'Business Insider', 'Marketing Weekly', 'Startup Hub', 'Entrepreneur Daily'];
  
  return Array.from({ length: 5 }, (_, i) => {
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    const name = names[i];
    const page = pages[i];
    const id = `mock-facebook-${i}-${Date.now()}`;
    const createdAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
    
    let content = '';
    switch (sentiment) {
      case 'positive':
        content = `Just discovered ${keyword} and I'm absolutely loving it! The features are exactly what I needed. Highly recommend checking it out! 👍`;
        break;
      case 'negative':
        content = `Disappointed with my experience using ${keyword}. The interface is confusing and customer support hasn't been helpful. Hoping for improvements soon. 😕`;
        break;
      default:
        content = `Has anyone tried ${keyword}? Looking for honest reviews before making a decision. Let me know your thoughts! 🤔`;
    }
    
    return {
      id,
      content,
      platform: 'facebook',
      author: `${name} (${page})`,
      sentiment,
      url: `https://facebook.com/${page}/posts/${id}`,
      engagement: {
        likes: Math.floor(Math.random() * 200),
        shares: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 30),
      },
      createdAt,
      updatedAt: new Date().toISOString(),
    };
  });
} 