'use client';

import { mockMentions, mockInsights } from '@/data/mockData';
import { BrandMention, Insight, Platform, Sentiment } from '@/types';
import { useState } from 'react';
import { format } from 'date-fns';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<'mentions' | 'insights'>('mentions');
  const [selectedMention, setSelectedMention] = useState<BrandMention | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | 'all'>('all');

  const filteredMentions = mockMentions.filter((mention) => {
    if (selectedPlatform !== 'all' && mention.platform !== selectedPlatform) return false;
    if (selectedSentiment !== 'all' && mention.sentiment !== selectedSentiment) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Brand Mentions</h1>
            <div className="mt-4 flex gap-4">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value as Platform | 'all')}
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="all">All Platforms</option>
                <option value="twitter">Twitter</option>
                <option value="reddit">Reddit</option>
                <option value="news">News</option>
              </select>
              <select
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value as Sentiment | 'all')}
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="all">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredMentions.map((mention) => (
              <MentionCard key={mention.id} mention={mention} />
            ))}
          </div>
        </div>

        {/* Insights panel */}
        <div className="w-80">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-medium text-gray-900">Insights</h2>
            <div className="mt-4 space-y-4">
              {mockInsights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MentionCard({ mention }: { mention: BrandMention }) {
  const sentimentColors = {
    positive: 'bg-green-100 text-green-800',
    neutral: 'bg-gray-100 text-gray-800',
    negative: 'bg-red-100 text-red-800',
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">{mention.author}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{mention.platform}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">
              {format(new Date(mention.timestamp), 'MMM d, h:mm a')}
            </span>
          </div>
          <p className="mt-2 text-gray-900">{mention.content}</p>
          <div className="mt-4 flex items-center gap-4">
            {mention.engagement.likes && (
              <span className="text-sm text-gray-500">
                {mention.engagement.likes} likes
              </span>
            )}
            {mention.engagement.shares && (
              <span className="text-sm text-gray-500">
                {mention.engagement.shares} shares
              </span>
            )}
            {mention.engagement.comments && (
              <span className="text-sm text-gray-500">
                {mention.engagement.comments} comments
              </span>
            )}
          </div>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            sentimentColors[mention.sentiment]
          }`}
        >
          {mention.sentiment}
        </span>
      </div>
    </div>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  const typeColors = {
    positive: 'bg-green-100 text-green-800',
    negative: 'bg-red-100 text-red-800',
    trend: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-gray-900">{insight.title}</h3>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            typeColors[insight.type]
          }`}
        >
          {insight.type}
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-500">{insight.description}</p>
      <div className="mt-2 text-xs text-gray-500">
        {insight.mentions.length} mentions
      </div>
    </div>
  );
} 