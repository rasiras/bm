'use client';

import { useState } from 'react';
import { BrandMention, Sentiment } from '@/types';
import { mockMentions } from '@/data/mockData';
import { format } from 'date-fns';

export default function SentimentPage() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');

  // Calculate sentiment distribution
  const sentimentDistribution = mockMentions.reduce(
    (acc, mention) => {
      acc[mention.sentiment]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 } as Record<Sentiment, number>
  );

  const totalMentions = Object.values(sentimentDistribution).reduce((a, b) => a + b, 0);
  
  // Calculate sentiment percentages
  const sentimentPercentages = {
    positive: (sentimentDistribution.positive / totalMentions) * 100,
    neutral: (sentimentDistribution.neutral / totalMentions) * 100,
    negative: (sentimentDistribution.negative / totalMentions) * 100,
  };

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
    return mockMentions
      .filter((mention) => mention.sentiment === sentiment)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  };

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
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray={`${sentimentPercentages.positive}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">
                  {Math.round(sentimentPercentages.positive)}%
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            Overall positive sentiment
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Sentiment Trends</h2>
          <div className="mt-4 h-32">
            {/* Placeholder for a chart */}
            <div className="flex h-full items-end justify-between space-x-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="flex flex-col items-center">
                  <div
                    className="w-8 rounded-t bg-green-500"
                    style={{
                      height: `${Math.random() * 100}%`,
                    }}
                  ></div>
                  <div
                    className="w-8 rounded-t bg-gray-500"
                    style={{
                      height: `${Math.random() * 100}%`,
                    }}
                  ></div>
                  <div
                    className="w-8 rounded-t bg-red-500"
                    style={{
                      height: `${Math.random() * 100}%`,
                    }}
                  ></div>
                  <span className="mt-2 text-xs text-gray-500">{day}</span>
                </div>
              ))}
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
          <ul className="divide-y divide-gray-200">
            {getRecentMentionsBySentiment('positive').map((mention) => (
              <li key={mention.id} className="px-4 py-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {mention.author}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{mention.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(mention.timestamp), 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Neutral Mentions */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
            <h3 className="text-sm font-medium text-gray-800">Neutral Mentions</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {getRecentMentionsBySentiment('neutral').map((mention) => (
              <li key={mention.id} className="px-4 py-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {mention.author}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{mention.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(mention.timestamp), 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Negative Mentions */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 bg-red-50 px-4 py-3">
            <h3 className="text-sm font-medium text-red-800">Negative Mentions</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {getRecentMentionsBySentiment('negative').map((mention) => (
              <li key={mention.id} className="px-4 py-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {mention.author}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{mention.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(mention.timestamp), 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 