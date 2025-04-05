'use client';

import { useState } from 'react';
import { BrandMention, Platform, Sentiment } from '@/types';
import { format } from 'date-fns';
import { mockMentions } from '@/data/mockData';

export default function MentionsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter mentions based on selected filters and search query
  const filteredMentions = mockMentions.filter((mention) => {
    const platformMatch = selectedPlatform === 'all' || mention.platform === selectedPlatform;
    const sentimentMatch = selectedSentiment === 'all' || mention.sentiment === selectedSentiment;
    const searchMatch = searchQuery === '' || 
      mention.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mention.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return platformMatch && sentimentMatch && searchMatch;
  });

  // Get sentiment color
  const getSentimentColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      case 'neutral':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get platform icon
  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'twitter':
        return '𝕏';
      case 'reddit':
        return 'r';
      case 'news':
        return '📰';
      default:
        return '🌐';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Brand Mentions</h1>
        <div className="flex items-center space-x-4">
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Export Data
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 rounded-lg bg-white p-4 shadow sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            id="search"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search mentions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
            Platform
          </label>
          <select
            id="platform"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as Platform | 'all')}
          >
            <option value="all">All Platforms</option>
            <option value="twitter">Twitter</option>
            <option value="reddit">Reddit</option>
            <option value="news">News</option>
          </select>
        </div>
        <div>
          <label htmlFor="sentiment" className="block text-sm font-medium text-gray-700">
            Sentiment
          </label>
          <select
            id="sentiment"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value as Sentiment | 'all')}
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>
      </div>

      {/* Mentions List */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
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
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {format(new Date(mention.timestamp), 'MMM d, yyyy h:mm a')}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">{mention.content}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getSentimentColor(mention.sentiment)}`}>
                          {mention.sentiment.charAt(0).toUpperCase() + mention.sentiment.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {[
                            mention.engagement.likes && `${mention.engagement.likes} likes`,
                            mention.engagement.shares && `${mention.engagement.shares} shares`,
                            mention.engagement.comments && `${mention.engagement.comments} comments`
                          ].filter(Boolean).join(', ') || '0 engagements'}
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
            <li className="p-4 text-center text-gray-500">No mentions found matching your criteria.</li>
          )}
        </ul>
      </div>
    </div>
  );
} 