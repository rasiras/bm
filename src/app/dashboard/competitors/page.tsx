'use client';

import { useState, useEffect } from 'react';
import { BrandMention, Platform, Competitor } from '@/types';
import { format } from 'date-fns';

export default function CompetitorsPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [mentions, setMentions] = useState<BrandMention[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [competitorsResponse, mentionsResponse] = await Promise.all([
          fetch('/api/competitors'),
          fetch('/api/mentions')
        ]);

        if (!competitorsResponse.ok || !mentionsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [competitorsData, mentionsData] = await Promise.all([
          competitorsResponse.json(),
          mentionsResponse.json()
        ]);

        setCompetitors(competitorsData.competitors || []);
        setMentions(mentionsData.mentions || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter mentions for selected competitor
  const filteredMentions = selectedCompetitor
    ? mentions.filter((mention) => mention.brand === selectedCompetitor)
    : mentions;

  // Calculate market share based on mentions
  const marketShare = competitors.reduce(
    (acc, competitor) => {
      const competitorMentions = mentions.filter((m) => m.brand === competitor.brand).length;
      acc[competitor.brand] = competitorMentions;
      return acc;
    },
    { brandMonitor: mentions.filter((m) => !m.brand).length } as Record<string, number>
  );

  const totalMentions = Object.values(marketShare).reduce((a: number, b: number) => a + b, 0);
  const marketSharePercentages = Object.entries(marketShare).reduce(
    (acc, [brand, count]) => {
      acc[brand] = totalMentions > 0 ? (count / totalMentions) * 100 : 0;
      return acc;
    },
    {} as Record<string, number>
  );

  // Calculate sentiment distribution for selected competitor
  const getSentimentDistribution = (brand: string) => {
    const brandMentions = mentions.filter((mention) => mention.brand === brand);
    const total = brandMentions.length;
    if (total === 0) return { positive: 0, neutral: 0, negative: 0 };
    
    const positive = brandMentions.filter((m) => m.sentiment === 'positive').length;
    const neutral = brandMentions.filter((m) => m.sentiment === 'neutral').length;
    const negative = brandMentions.filter((m) => m.sentiment === 'negative').length;
    
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading competitor data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (competitors.length === 0 && mentions.length === 0) {
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

        {/* No Data Message */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Market Share</h2>
          <div className="mt-4 text-center text-sm text-gray-500">
            No market share data available yet
          </div>
        </div>

        {/* Competitor Selection */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              BM
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Brand Monitor</h3>
          </div>
        </div>

        {/* Competitor Mentions */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-4 py-3">
            <h3 className="text-sm font-medium text-gray-900">Competitor Mentions</h3>
          </div>
          <div className="p-4 text-center text-sm text-gray-500">
            No competitor mentions available yet
          </div>
        </div>
      </div>
    );
  }

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
                style={{ width: `${marketSharePercentages.brandMonitor}%` }}
              ></div>
              {competitors.map((competitor, index) => (
                <div
                  key={competitor.id}
                  className={`bg-${['blue', 'green', 'yellow', 'red'][index % 4]}-500`}
                  style={{ width: `${marketSharePercentages[competitor.brand]}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
              <span className="ml-1">Brand Monitor: {marketSharePercentages.brandMonitor.toFixed(1)}%</span>
            </div>
            {competitors.map((competitor, index) => (
              <div key={competitor.id} className="flex items-center">
                <div className={`h-3 w-3 rounded-full bg-${['blue', 'green', 'yellow', 'red'][index % 4]}-500`}></div>
                <span className="ml-1">{competitor.name}: {marketSharePercentages[competitor.brand].toFixed(1)}%</span>
              </div>
            ))}
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
              {competitor.name.charAt(0)}
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
                          {format(new Date(mention.createdAt), 'MMM d, yyyy h:mm a')}
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
                        {mention.engagement && (
                          <span className="text-sm text-gray-500">
                            {[
                              mention.engagement.likes && `${mention.engagement.likes} likes`,
                              mention.engagement.shares && `${mention.engagement.shares} shares`,
                              mention.engagement.comments && `${mention.engagement.comments} comments`
                            ].filter(Boolean).join(', ') || '0 engagements'}
                          </span>
                        )}
                        {mention.url && (
                          <a
                            href={mention.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-900"
                          >
                            View Original
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500">No mentions found for the selected competitor.</li>
          )}
        </ul>
      </div>
    </div>
  );
} 