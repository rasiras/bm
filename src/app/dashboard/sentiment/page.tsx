'use client';

import { useState, useEffect } from 'react';
import { BrandMention, Sentiment, Platform } from '@/types';
import { format, subDays, subWeeks, subMonths, subYears, isWithinInterval, parseISO } from 'date-fns';

export default function SentimentPage() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [mentions, setMentions] = useState<BrandMention[]>([]);
  const [filteredMentions, setFilteredMentions] = useState<BrandMention[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentions = async () => {
      try {
        const response = await fetch('/api/mentions');
        if (!response.ok) {
          throw new Error('Failed to fetch mentions');
        }
        const data = await response.json();
        setMentions(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentions();
  }, []);

  // Filter mentions based on time range
  useEffect(() => {
    if (mentions.length === 0) {
      setFilteredMentions([]);
      return;
    }

    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case 'day':
        startDate = subDays(now, 1);
        break;
      case 'week':
        startDate = subWeeks(now, 1);
        break;
      case 'month':
        startDate = subMonths(now, 1);
        break;
      case 'year':
        startDate = subYears(now, 1);
        break;
      default:
        startDate = subWeeks(now, 1);
    }

    const filtered = mentions.filter(mention => {
      const mentionDate = parseISO(mention.createdAt);
      return isWithinInterval(mentionDate, { start: startDate, end: now });
    });

    setFilteredMentions(filtered);
  }, [mentions, timeRange]);

  // Calculate sentiment distribution
  const sentimentDistribution = filteredMentions.reduce(
    (acc, mention) => {
      acc[mention.sentiment]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 } as Record<Sentiment, number>
  );

  const totalMentions = Object.values(sentimentDistribution).reduce((a, b) => a + b, 0);
  
  // Calculate sentiment percentages
  const sentimentPercentages = {
    positive: totalMentions > 0 ? (sentimentDistribution.positive / totalMentions) * 100 : 0,
    neutral: totalMentions > 0 ? (sentimentDistribution.neutral / totalMentions) * 100 : 0,
    negative: totalMentions > 0 ? (sentimentDistribution.negative / totalMentions) * 100 : 0,
  };

  // Calculate sentiment score (weighted average: positive=1, neutral=0.5, negative=0)
  const sentimentScore = totalMentions > 0 
    ? ((sentimentDistribution.positive * 1) + (sentimentDistribution.neutral * 0.5) + (sentimentDistribution.negative * 0)) / totalMentions * 100
    : 0;

  // Get sentiment color
  const getSentimentColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500';
      case 'negative':
        return 'bg-red-500';
      case 'neutral':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get sentiment text color
  const getSentimentTextColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-700';
      case 'negative':
        return 'text-red-700';
      case 'neutral':
        return 'text-gray-700';
      default:
        return 'text-gray-700';
    }
  };

  // Get sentiment background color
  const getSentimentBgColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100';
      case 'negative':
        return 'bg-red-100';
      case 'neutral':
        return 'bg-gray-100';
      default:
        return 'bg-gray-100';
    }
  };

  // Get recent mentions by sentiment
  const getRecentMentionsBySentiment = (sentiment: Sentiment) => {
    return filteredMentions
      .filter((mention) => mention.sentiment === sentiment)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  };

  // Get sentiment by platform
  const getSentimentByPlatform = (platform: Platform) => {
    const platformMentions = filteredMentions.filter(mention => mention.platform === platform);
    const total = platformMentions.length;
    
    if (total === 0) return { positive: 0, neutral: 0, negative: 0, total: 0 };
    
    const distribution = platformMentions.reduce(
      (acc, mention) => {
        acc[mention.sentiment]++;
        return acc;
      },
      { positive: 0, neutral: 0, negative: 0 } as Record<Sentiment, number>
    );
    
    return {
      positive: (distribution.positive / total) * 100,
      neutral: (distribution.neutral / total) * 100,
      negative: (distribution.negative / total) * 100,
      total
    };
  };

  // Get platform icon
  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'twitter':
        return (
          <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        );
      case 'reddit':
        return (
          <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case 'news':
        return (
          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 20H5a1 1 0 01-1-1V5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1zM5 5v14h14V5H5zm7 2h5v2h-5V7zm0 4h5v2h-5v-2zm0 4h5v2h-5v-2zM7 7h3v2H7V7zm0 4h3v2H7v-2zm0 4h3v2H7v-2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Get sentiment trends over time
  const getSentimentTrends = () => {
    if (filteredMentions.length === 0) {
      // Generate mock data for testing if no real data is available
      return generateMockSentimentTrends();
    }
    
    // Group mentions by day
    const groupedByDay: Record<string, { positive: number, neutral: number, negative: number, total: number }> = {};
    
    filteredMentions.forEach(mention => {
      const date = format(parseISO(mention.createdAt), 'yyyy-MM-dd');
      
      if (!groupedByDay[date]) {
        groupedByDay[date] = { positive: 0, neutral: 0, negative: 0, total: 0 };
      }
      
      groupedByDay[date][mention.sentiment]++;
      groupedByDay[date].total++;
    });
    
    // Convert to array and sort by date
    return Object.entries(groupedByDay)
      .map(([date, counts]) => ({
        date,
        positive: counts.total > 0 ? (counts.positive / counts.total) * 100 : 0,
        neutral: counts.total > 0 ? (counts.neutral / counts.total) * 100 : 0,
        negative: counts.total > 0 ? (counts.negative / counts.total) * 100 : 0,
        total: counts.total
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  // Generate mock sentiment trends for testing
  const generateMockSentimentTrends = () => {
    const now = new Date();
    const trends = [];
    
    // Generate 7 days of mock data
    for (let i = 6; i >= 0; i--) {
      const date = subDays(now, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      // Random distribution between positive, neutral, and negative
      const total = Math.floor(Math.random() * 20) + 5; // 5-25 mentions per day
      const positive = Math.floor(Math.random() * total);
      const negative = Math.floor(Math.random() * (total - positive));
      const neutral = total - positive - negative;
      
      trends.push({
        date: dateStr,
        positive: (positive / total) * 100,
        neutral: (neutral / total) * 100,
        negative: (negative / total) * 100,
        total
      });
    }
    
    return trends;
  };

  // Get platform distribution
  const getPlatformDistribution = () => {
    if (filteredMentions.length === 0) return { twitter: 0, reddit: 0, facebook: 0, news: 0 };
    
    const distribution = filteredMentions.reduce(
      (acc, mention) => {
        acc[mention.platform]++;
        return acc;
      },
      { twitter: 0, reddit: 0, facebook: 0, news: 0 } as Record<Platform, number>
    );
    
    return {
      twitter: (distribution.twitter / filteredMentions.length) * 100,
      reddit: (distribution.reddit / filteredMentions.length) * 100,
      facebook: (distribution.facebook / filteredMentions.length) * 100,
      news: (distribution.news / filteredMentions.length) * 100
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading sentiment data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  const sentimentTrends = getSentimentTrends();
  const platformDistribution = getPlatformDistribution();
  const twitterSentiment = getSentimentByPlatform('twitter');
  const redditSentiment = getSentimentByPlatform('reddit');
  const facebookSentiment = getSentimentByPlatform('facebook');
  const newsSentiment = getSentimentByPlatform('news');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sentiment Analysis</h1>
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

      {/* Sentiment Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Sentiment Distribution</h2>
          <div className="mt-4">
            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="flex h-full">
                <div
                  className="bg-green-500"
                  style={{ width: `${sentimentPercentages.positive}%` }}
                ></div>
                <div
                  className="bg-gray-500"
                  style={{ width: `${sentimentPercentages.neutral}%` }}
                ></div>
                <div
                  className="bg-red-500"
                  style={{ width: `${sentimentPercentages.negative}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-600">
              <span>Positive: {sentimentPercentages.positive.toFixed(1)}%</span>
              <span>Neutral: {sentimentPercentages.neutral.toFixed(1)}%</span>
              <span>Negative: {sentimentPercentages.negative.toFixed(1)}%</span>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Total mentions: {totalMentions}
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Sentiment Score</h2>
          <div className="mt-4 flex items-center justify-center">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={sentimentScore > 70 ? "#10B981" : sentimentScore > 30 ? "#F59E0B" : "#EF4444"}
                  strokeWidth="3"
                  strokeDasharray={`${sentimentScore}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">
                  {Math.round(sentimentScore)}%
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            {sentimentScore > 70 ? "Strongly Positive" : 
             sentimentScore > 50 ? "Moderately Positive" : 
             sentimentScore > 30 ? "Neutral" : 
             sentimentScore > 10 ? "Moderately Negative" : "Strongly Negative"}
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Sentiment Trends</h2>
          <div className="mt-4 h-32">
            {sentimentTrends.length > 0 ? (
              <div className="flex h-full items-end justify-between space-x-2">
                {sentimentTrends.map((day) => (
                  <div key={day.date} className="flex flex-col items-center">
                    <div className="flex flex-col h-full">
                      <div
                        className="w-8 rounded-t bg-green-500"
                        style={{
                          height: `${day.positive}%`,
                        }}
                      ></div>
                      <div
                        className="w-8 bg-gray-500"
                        style={{
                          height: `${day.neutral}%`,
                        }}
                      ></div>
                      <div
                        className="w-8 rounded-b bg-red-500"
                        style={{
                          height: `${day.negative}%`,
                        }}
                      ></div>
                    </div>
                    <span className="mt-2 text-xs text-gray-500">{format(parseISO(day.date), 'MMM d')}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                No trend data available for this time range
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Platform Distribution */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Platform Distribution</h2>
        <div className="mt-4">
          <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="flex h-full">
              <div
                className="bg-blue-500"
                style={{ width: `${platformDistribution.twitter}%` }}
              ></div>
              <div
                className="bg-orange-500"
                style={{ width: `${platformDistribution.reddit}%` }}
              ></div>
              <div
                className="bg-indigo-500"
                style={{ width: `${platformDistribution.facebook}%` }}
              ></div>
              <div
                className="bg-green-500"
                style={{ width: `${platformDistribution.news}%` }}
              ></div>
            </div>
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Twitter: {platformDistribution.twitter.toFixed(1)}%</span>
            <span>Reddit: {platformDistribution.reddit.toFixed(1)}%</span>
            <span>Facebook: {platformDistribution.facebook.toFixed(1)}%</span>
            <span>News: {platformDistribution.news.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Platform Sentiment */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center">
            <div className="mr-2">{getPlatformIcon('twitter')}</div>
            <h3 className="text-sm font-medium text-gray-900">Twitter Sentiment</h3>
          </div>
          <div className="mt-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="flex h-full">
                <div
                  className="bg-green-500 group relative"
                  style={{ width: `${twitterSentiment.positive}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {twitterSentiment.positive.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div
                  className="bg-gray-500 group relative"
                  style={{ width: `${twitterSentiment.neutral}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {twitterSentiment.neutral.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div
                  className="bg-red-500 group relative"
                  style={{ width: `${twitterSentiment.negative}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {twitterSentiment.negative.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {twitterSentiment.total} mentions
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center">
            <div className="mr-2">{getPlatformIcon('reddit')}</div>
            <h3 className="text-sm font-medium text-gray-900">Reddit Sentiment</h3>
          </div>
          <div className="mt-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="flex h-full">
                <div
                  className="bg-green-500 group relative"
                  style={{ width: `${redditSentiment.positive}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {redditSentiment.positive.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div
                  className="bg-gray-500 group relative"
                  style={{ width: `${redditSentiment.neutral}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {redditSentiment.neutral.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div
                  className="bg-red-500 group relative"
                  style={{ width: `${redditSentiment.negative}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {redditSentiment.negative.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {redditSentiment.total} mentions
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center">
            <div className="mr-2">{getPlatformIcon('facebook')}</div>
            <h3 className="text-sm font-medium text-gray-900">Facebook Sentiment</h3>
          </div>
          <div className="mt-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="flex h-full">
                <div
                  className="bg-green-500 group relative"
                  style={{ width: `${facebookSentiment.positive}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {facebookSentiment.positive.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div
                  className="bg-gray-500 group relative"
                  style={{ width: `${facebookSentiment.neutral}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {facebookSentiment.neutral.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div
                  className="bg-red-500 group relative"
                  style={{ width: `${facebookSentiment.negative}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {facebookSentiment.negative.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {facebookSentiment.total} mentions
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center">
            <div className="mr-2">{getPlatformIcon('news')}</div>
            <h3 className="text-sm font-medium text-gray-900">News Sentiment</h3>
          </div>
          <div className="mt-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="flex h-full">
                <div
                  className="bg-green-500 group relative"
                  style={{ width: `${newsSentiment.positive}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {newsSentiment.positive.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div
                  className="bg-gray-500 group relative"
                  style={{ width: `${newsSentiment.neutral}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {newsSentiment.neutral.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div
                  className="bg-red-500 group relative"
                  style={{ width: `${newsSentiment.negative}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      {newsSentiment.negative.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {newsSentiment.total} mentions
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Positive Mentions */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 bg-green-50 px-4 py-3">
            <h3 className="text-sm font-medium text-green-800">Positive Mentions</h3>
          </div>
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {getRecentMentionsBySentiment('positive').map((mention) => (
              <li key={mention.id} className="px-4 py-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getPlatformIcon(mention.platform)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {mention.author}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{mention.content}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-400">
                        {format(new Date(mention.createdAt), 'MMM d, h:mm a')}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        {mention.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {getRecentMentionsBySentiment('positive').length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">
                No positive mentions in this time range
              </li>
            )}
          </ul>
        </div>

        {/* Neutral Mentions */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
            <h3 className="text-sm font-medium text-gray-800">Neutral Mentions</h3>
          </div>
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {getRecentMentionsBySentiment('neutral').map((mention) => (
              <li key={mention.id} className="px-4 py-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getPlatformIcon(mention.platform)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {mention.author}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{mention.content}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-400">
                        {format(new Date(mention.createdAt), 'MMM d, h:mm a')}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        {mention.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {getRecentMentionsBySentiment('neutral').length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">
                No neutral mentions in this time range
              </li>
            )}
          </ul>
        </div>

        {/* Negative Mentions */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 bg-red-50 px-4 py-3">
            <h3 className="text-sm font-medium text-red-800">Negative Mentions</h3>
          </div>
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {getRecentMentionsBySentiment('negative').map((mention) => (
              <li key={mention.id} className="px-4 py-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getPlatformIcon(mention.platform)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {mention.author}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{mention.content}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-400">
                        {format(new Date(mention.createdAt), 'MMM d, h:mm a')}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        {mention.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {getRecentMentionsBySentiment('negative').length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">
                No negative mentions in this time range
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
} 