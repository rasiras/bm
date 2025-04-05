'use client';

import { useState } from 'react';
import { BrandMention, Platform } from '@/types';
import { mockMentions } from '@/data/mockData';
import { format } from 'date-fns';

// Mock competitor data
const competitors = [
  { id: 1, name: 'Competitor A', brand: 'competitorA', logo: 'A' },
  { id: 2, name: 'Competitor B', brand: 'competitorB', logo: 'B' },
  { id: 3, name: 'Competitor C', brand: 'competitorC', logo: 'C' },
  { id: 4, name: 'Competitor D', brand: 'competitorD', logo: 'D' },
];

// Mock mentions for competitors
const competitorMentions = [
  ...mockMentions,
  {
    id: 'comp1',
    brand: 'competitorA',
    platform: 'twitter' as Platform,
    author: 'John Doe',
    content: 'Just tried Competitor A\'s new product, it\'s amazing!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    sentiment: 'positive' as const,
    engagement: { likes: 120, shares: 45, comments: 30 },
    url: 'https://twitter.com/johndoe/status/123456789',
  },
  {
    id: 'comp2',
    brand: 'competitorB',
    platform: 'facebook' as Platform,
    author: 'Jane Smith',
    content: 'Competitor B has better features than Brand Monitor',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    sentiment: 'negative' as const,
    engagement: { likes: 85, shares: 20, comments: 15 },
    url: 'https://facebook.com/janesmith/posts/987654321',
  },
  {
    id: 'comp3',
    brand: 'competitorC',
    platform: 'instagram' as Platform,
    author: 'Mike Johnson',
    content: 'Check out Competitor C\'s latest update!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    sentiment: 'neutral' as const,
    engagement: { likes: 200, shares: 60, comments: 40 },
    url: 'https://instagram.com/mikejohnson/p/abcdef123',
  },
];

export default function CompetitorsPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');

  // Filter mentions for selected competitor
  const filteredMentions = selectedCompetitor
    ? competitorMentions.filter((mention) => mention.brand === selectedCompetitor)
    : competitorMentions;

  // Calculate market share (mock data)
  const marketShare = {
    brandMonitor: 35,
    competitorA: 25,
    competitorB: 20,
    competitorC: 15,
    competitorD: 5,
  };

  // Calculate sentiment distribution for selected competitor
  const getSentimentDistribution = (brand: string) => {
    const mentions = competitorMentions.filter((mention) => mention.brand === brand);
    const total = mentions.length;
    if (total === 0) return { positive: 0, neutral: 0, negative: 0 };
    
    const positive = mentions.filter((m) => m.sentiment === 'positive').length;
    const neutral = mentions.filter((m) => m.sentiment === 'neutral').length;
    const negative = mentions.filter((m) => m.sentiment === 'negative').length;
    
    return {
      positive: (positive / total) * 100,
      neutral: (neutral / total) * 100,
      negative: (negative / total) * 100,
    };
  };

  // Get platform icon
  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'twitter':
        return '𝕏';
      case 'facebook':
        return 'f';
      case 'instagram':
        return '📸';
      case 'linkedin':
        return 'in';
      case 'reddit':
        return 'r';
      default:
        return '🌐';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Competitor Analysis</h1>
        <div className="flex items-center space-x-4">
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'day' | 'week' | 'month' | 'year')}
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Market Share */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Market Share</h2>
        <div className="mt-4">
          <div className="h-8 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="flex h-full">
              <div
                className="bg-indigo-600"
                style={{ width: `${marketShare.brandMonitor}%` }}
              ></div>
              <div
                className="bg-blue-500"
                style={{ width: `${marketShare.competitorA}%` }}
              ></div>
              <div
                className="bg-green-500"
                style={{ width: `${marketShare.competitorB}%` }}
              ></div>
              <div
                className="bg-yellow-500"
                style={{ width: `${marketShare.competitorC}%` }}
              ></div>
              <div
                className="bg-red-500"
                style={{ width: `${marketShare.competitorD}%` }}
              ></div>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
              <span className="ml-1">Brand Monitor: {marketShare.brandMonitor}%</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="ml-1">Competitor A: {marketShare.competitorA}%</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="ml-1">Competitor B: {marketShare.competitorB}%</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span className="ml-1">Competitor C: {marketShare.competitorC}%</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="ml-1">Competitor D: {marketShare.competitorD}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Competitor Selection */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <button
          className={`rounded-lg border p-4 text-center ${
            selectedCompetitor === null
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 bg-white hover:bg-gray-50'
          }`}
          onClick={() => setSelectedCompetitor(null)}
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            BM
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">All Competitors</h3>
        </button>
        {competitors.map((competitor) => (
          <button
            key={competitor.id}
            className={`rounded-lg border p-4 text-center ${
              selectedCompetitor === competitor.brand
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
            onClick={() => setSelectedCompetitor(competitor.brand)}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600">
              {competitor.logo}
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">{competitor.name}</h3>
          </button>
        ))}
      </div>

      {/* Competitor Mentions */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-4 py-3">
          <h3 className="text-sm font-medium text-gray-900">
            {selectedCompetitor
              ? `Mentions for ${competitors.find((c) => c.brand === selectedCompetitor)?.name}`
              : 'All Competitor Mentions'}
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredMentions.length > 0 ? (
            filteredMentions.map((mention) => (
              <li key={mention.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        {getPlatformIcon(mention.platform)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{mention.author}</p>
                        <span className="text-sm text-gray-500">
                          {format(new Date(mention.timestamp), 'MMM d, yyyy h:mm a')}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">{mention.content}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            mention.sentiment === 'positive'
                              ? 'bg-green-100 text-green-800'
                              : mention.sentiment === 'negative'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {mention.sentiment.charAt(0).toUpperCase() + mention.sentiment.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {mention.engagement.likes} likes, {mention.engagement.shares} shares
                        </span>
                        <a
                          href={mention.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                          View Original
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500">No mentions found for this competitor.</li>
          )}
        </ul>
      </div>
    </div>
  );
} 