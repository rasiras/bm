export type Sentiment = 'positive' | 'neutral' | 'negative';

export type Platform = 'twitter' | 'reddit' | 'news';

export interface BrandMention {
  id: string;
  platform: Platform;
  content: string;
  sentiment: Sentiment;
  timestamp: string;
  url: string;
  author: string;
  engagement: {
    likes?: number;
    shares?: number;
    comments?: number;
  };
}

export interface Insight {
  id: string;
  type: 'positive' | 'negative' | 'trend';
  title: string;
  description: string;
  mentions: BrandMention[];
  priority: 'high' | 'medium' | 'low';
} 