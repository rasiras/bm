import { BrandMention, Insight } from '@/types';

export const mockMentions: BrandMention[] = [
  {
    id: '1',
    platform: 'twitter',
    content: "Just tried the new product and it's amazing! #brandname",
    sentiment: 'positive',
    timestamp: new Date().toISOString(),
    url: 'https://twitter.com/user/1',
    author: '@user1',
    engagement: {
      likes: 150,
      shares: 25,
      comments: 10
    }
  },
  {
    id: '2',
    platform: 'reddit',
    content: 'Has anyone else experienced issues with the latest update?',
    sentiment: 'negative',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    url: 'https://reddit.com/r/subreddit/2',
    author: 'redditor123',
    engagement: {
      likes: 45,
      comments: 15
    }
  },
  {
    id: '3',
    platform: 'news',
    content: 'Company announces breakthrough innovation in their latest product line',
    sentiment: 'positive',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    url: 'https://news-site.com/article/3',
    author: 'Tech Reporter',
    engagement: {
      shares: 100
    }
  }
];

export const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'positive',
    title: 'Growing Positive Sentiment',
    description: 'Positive mentions increased by 25% in the last 24 hours',
    mentions: mockMentions.filter(m => m.sentiment === 'positive'),
    priority: 'high'
  },
  {
    id: '2',
    type: 'negative',
    title: 'Customer Service Issues',
    description: 'Multiple reports of technical difficulties',
    mentions: mockMentions.filter(m => m.sentiment === 'negative'),
    priority: 'medium'
  },
  {
    id: '3',
    type: 'trend',
    title: 'Viral Product Launch',
    description: 'Product launch generating significant social media buzz',
    mentions: mockMentions,
    priority: 'high'
  }
]; 