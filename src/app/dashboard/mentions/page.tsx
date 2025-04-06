'use client';

import { useState, useEffect } from 'react';
import { BrandMention, Platform, Sentiment } from '@/types';
import { format } from 'date-fns';
import { CheckIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Social media icons component
const SocialMediaIcon = ({ platform }: { platform: Platform }) => {
  switch (platform) {
    case 'twitter':
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </div>
      );
    case 'reddit':
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
          </svg>
        </div>
      );
    case 'facebook':
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </div>
      );
    case 'news':
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 20H5a1 1 0 01-1-1V5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1zM5 5v14h14V5H5z" />
            <path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
      );
  }
};

// Sentiment badge component
const SentimentBadge = ({ sentiment }: { sentiment: Sentiment }) => {
  switch (sentiment) {
    case 'positive':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Positive
        </span>
      );
    case 'negative':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Negative
        </span>
      );
    case 'neutral':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Neutral
        </span>
      );
    default:
      return null;
  }
};

export default function BrandMentionsPage() {
  const [mentions, setMentions] = useState<BrandMention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | 'all'>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchMentions();
  }, []);

  const fetchMentions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/mentions');
      
      if (!response.ok) {
        throw new Error('Failed to fetch mentions');
      }
      
      const data = await response.json();
      setMentions(data.data || []);
    } catch (error) {
      console.error('Error fetching mentions:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch mentions');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKeyword.trim()) return;

    try {
      setIsSearching(true);
      setError(null);
      
      let twitterData = { data: [] };
      let redditData = { data: [] };
      let facebookData = { data: [] };
      
      // Search Twitter
      const twitterResponse = await fetch(`/api/twitter/search?keyword=${encodeURIComponent(searchKeyword.trim())}`);
      
      if (!twitterResponse.ok) {
        console.error('Failed to search Twitter');
      } else {
        twitterData = await twitterResponse.json();
        console.log(`Found ${twitterData.data.length} tweets for "${searchKeyword.trim()}"`);
        
        // Update mentions with Twitter results
        setMentions(prevMentions => {
          const existingIds = new Set(prevMentions.map(m => m.id));
          const newMentions = twitterData.data.filter((m: BrandMention) => !existingIds.has(m.id));
          return [...newMentions, ...prevMentions];
        });
      }
      
      // Search Reddit
      const redditResponse = await fetch(`/api/reddit/search?keyword=${encodeURIComponent(searchKeyword.trim())}`);
      
      if (!redditResponse.ok) {
        console.error('Failed to search Reddit');
      } else {
        redditData = await redditResponse.json();
        console.log(`Found ${redditData.data.length} Reddit posts for "${searchKeyword.trim()}"`);
        
        // Update mentions with Reddit results
        setMentions(prevMentions => {
          const existingIds = new Set(prevMentions.map(m => m.id));
          const newMentions = redditData.data.filter((m: BrandMention) => !existingIds.has(m.id));
          return [...newMentions, ...prevMentions];
        });
      }

      // Search Facebook
      const facebookResponse = await fetch(`/api/facebook/search?keyword=${encodeURIComponent(searchKeyword.trim())}`);
      
      if (!facebookResponse.ok) {
        console.error('Failed to search Facebook');
      } else {
        facebookData = await facebookResponse.json();
        console.log(`Found ${facebookData.data.length} Facebook posts for "${searchKeyword.trim()}"`);
        
        // Update mentions with Facebook results
        setMentions(prevMentions => {
          const existingIds = new Set(prevMentions.map(m => m.id));
          const newMentions = facebookData.data.filter((m: BrandMention) => !existingIds.has(m.id));
          return [...newMentions, ...prevMentions];
        });
      }
      
      // Calculate total new mentions
      const twitterCount = twitterResponse.ok ? twitterData.data.length : 0;
      const redditCount = redditResponse.ok ? redditData.data.length : 0;
      const facebookCount = facebookResponse.ok ? facebookData.data.length : 0;
      const totalNewMentions = twitterCount + redditCount + facebookCount;
      
      if (totalNewMentions > 0) {
        setSuccessMessage(`Found ${totalNewMentions} new mentions across Twitter, Reddit, and Facebook`);
      } else {
        setError('No new mentions found');
      }
    } catch (error) {
      console.error('Error searching social media:', error);
      setError(error instanceof Error ? error.message : 'Failed to search social media');
    } finally {
      setIsSearching(false);
    }
  };

  // Filter mentions based on selected platform and sentiment
  const filteredMentions = mentions.filter(mention => {
    if (selectedPlatform !== 'all' && mention.platform !== selectedPlatform) return false;
    if (selectedSentiment !== 'all' && mention.sentiment !== selectedSentiment) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading mentions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Brand Mentions</h1>
          
          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{successMessage}</p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      onClick={() => setSuccessMessage(null)}
                      className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                    >
                      <span className="sr-only">Dismiss</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      onClick={() => setError(null)}
                      className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                    >
                      <span className="sr-only">Dismiss</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Enhanced Search Panel */}
          <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Search Social Media</h2>
              <p className="mt-1 text-sm text-gray-500">
                Find mentions of your brand, products, or keywords across multiple platforms
              </p>
            </div>
            
            <div className="px-6 py-5">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col space-y-4">
                  <div>
                    <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
                      Search Keyword
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter a keyword to search..."
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      This will search Twitter, Reddit, and Facebook for mentions of your keyword
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <input
                        id="twitter"
                        name="platforms"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="twitter" className="ml-2 block text-sm text-gray-700">
                        Twitter
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="reddit"
                        name="platforms"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="reddit" className="ml-2 block text-sm text-gray-700">
                        Reddit
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="facebook"
                        name="platforms"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="facebook" className="ml-2 block text-sm text-gray-700">
                        Facebook
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSearching || !searchKeyword.trim()}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSearching ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Searching across platforms...
                      </>
                    ) : (
                      <>
                        <MagnifyingGlassIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                        Search Social Media
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Results will be displayed below and saved to your mentions list</span>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="mb-4 sm:mb-0">
                <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                  Platform
                </label>
                <select
                  id="platform"
                  name="platform"
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value as Platform | 'all')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Platforms</option>
                  <option value="twitter">Twitter</option>
                  <option value="reddit">Reddit</option>
                  <option value="facebook">Facebook</option>
                  <option value="news">News</option>
                </select>
              </div>
              <div>
                <label htmlFor="sentiment" className="block text-sm font-medium text-gray-700">
                  Sentiment
                </label>
                <select
                  id="sentiment"
                  name="sentiment"
                  value={selectedSentiment}
                  onChange={(e) => setSelectedSentiment(e.target.value as Sentiment | 'all')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Sentiments</option>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={fetchMentions}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Refresh
              </button>
            </div>
          </div>
          
          {/* Mentions List */}
          <div className="mt-6">
            {filteredMentions.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMentions.map((mention) => (
                  <div key={mention.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <SocialMediaIcon platform={mention.platform} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {mention.author}
                            </p>
                            <div className="ml-2 flex-shrink-0">
                              <SentimentBadge sentiment={mention.sentiment} />
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                            {mention.content}
                          </p>
                          <div className="mt-4 flex items-center text-xs text-gray-500">
                            <time dateTime={mention.createdAt}>
                              {format(new Date(mention.createdAt), 'MMM d, yyyy')}
                            </time>
                            {mention.engagement && (
                              <div className="ml-4 flex items-center space-x-4">
                                {mention.engagement.likes && (
                                  <span className="flex items-center">
                                    <svg className="mr-1 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    {mention.engagement.likes}
                                  </span>
                                )}
                                {mention.engagement.retweets && (
                                  <span className="flex items-center">
                                    <svg className="mr-1 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    {mention.engagement.retweets}
                                  </span>
                                )}
                                {mention.engagement.replies && (
                                  <span className="flex items-center">
                                    <svg className="mr-1 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    {mention.engagement.replies}
                                  </span>
                                )}
                                {mention.engagement.shares && (
                                  <span className="flex items-center">
                                    <svg className="mr-1 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                    </svg>
                                    {mention.engagement.shares}
                                  </span>
                                )}
                                {mention.engagement.comments && (
                                  <span className="flex items-center">
                                    <svg className="mr-1 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    {mention.engagement.comments}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          {mention.url && (
                            <div className="mt-4">
                              <a
                                href={mention.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                              >
                                View original post
                                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No mentions found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 