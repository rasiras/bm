export type Sentiment = 'positive' | 'neutral' | 'negative';

export type Platform = 'twitter' | 'reddit' | 'news' | 'facebook';

export interface Engagement {
  likes?: number;
  retweets?: number;
  replies?: number;
  shares?: number;
  comments?: number;
}

export type Competitor = {
  id: string;
  name: string;
  brand: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
};

export interface BrandMention {
  id: string;
  content: string;
  platform: Platform;
  author: string;
  sentiment: Sentiment;
  url?: string;
  engagement?: Engagement;
  createdAt: string;
  updatedAt: string;
}

export type Insight = {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'trend';
  mentions: string[];
}; 