'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon, CheckIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { BrandMention, Platform, Sentiment } from '@/types';
import { format } from 'date-fns';

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
    case 'news':
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 20H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1zM5 5v14h14V5H5z" />
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

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monitoringItems, setMonitoringItems] = useState<{
    domains: string[];
    brandNames: string[];
    keywords: string[];
  } | null>(null);
  const [mentions, setMentions] = useState<BrandMention[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | 'all'>('all');
  const [newKeyword, setNewKeyword] = useState('');
  const [isAddingKeyword, setIsAddingKeyword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Generate keyword suggestions based on input
  useEffect(() => {
    if (newKeyword.trim().length > 0) {
      // Simple suggestion logic - can be enhanced with more sophisticated algorithms
      const suggestions = [
        `${newKeyword} review`,
        `${newKeyword} price`,
        `${newKeyword} alternatives`,
        `${newKeyword} vs`,
        `best ${newKeyword}`,
      ];
      setKeywordSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setKeywordSuggestions([]);
      setShowSuggestions(false);
    }
  }, [newKeyword]);

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;

    setIsAddingKeyword(true);
    setError(null);
    try {
      // First, add the keyword to monitoring items
      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domains: monitoringItems?.domains || [],
          brandNames: monitoringItems?.brandNames || [],
          keywords: [...(monitoringItems?.keywords || []), newKeyword.trim()],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add keyword');
      }

      const data = await response.json();
      setMonitoringItems(data.data);
      
      // Search Twitter for the keyword
      try {
        const twitterResponse = await fetch(`/api/twitter/search?keyword=${encodeURIComponent(newKeyword.trim())}`);
        
        if (!twitterResponse.ok) {
          console.error('Failed to search Twitter');
        } else {
          const twitterData = await twitterResponse.json();
          console.log(`Found ${twitterData.data.length} tweets for "${newKeyword.trim()}"`);
          
          // Update mentions with Twitter results
          setMentions(prevMentions => {
            const existingIds = new Set(prevMentions.map(m => m.id));
            const newMentions = twitterData.data.filter((m: BrandMention) => !existingIds.has(m.id));
            return [...newMentions, ...prevMentions];
          });
        }
      } catch (twitterError) {
        console.error('Error searching Twitter:', twitterError);
      }
      
      // Search Reddit for the keyword
      try {
        const redditResponse = await fetch(`/api/reddit/search?keyword=${encodeURIComponent(newKeyword.trim())}`);
        
        if (!redditResponse.ok) {
          console.error('Failed to search Reddit');
        } else {
          const redditData = await redditResponse.json();
          console.log(`Found ${redditData.data.length} Reddit posts for "${newKeyword.trim()}"`);
          
          // Update mentions with Reddit results
          setMentions(prevMentions => {
            const existingIds = new Set(prevMentions.map(m => m.id));
            const newMentions = redditData.data.filter((m: BrandMention) => !existingIds.has(m.id));
            return [...newMentions, ...prevMentions];
          });
        }
      } catch (redditError) {
        console.error('Error searching Reddit:', redditError);
      }
      
      setNewKeyword('');
      setSuccessMessage(`Keyword "${newKeyword.trim()}" added successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error adding keyword:', error);
      setError(error instanceof Error ? error.message : 'Failed to add keyword');
    } finally {
      setIsAddingKeyword(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewKeyword(suggestion);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('/api/user');
        const userData = await userResponse.json();

        if (!userResponse.ok) {
          if (userResponse.status === 401) {
            router.push('/sign-in');
            return;
          }
          throw new Error(userData.error || 'Failed to fetch user data');
        }

        setUser(userData);
        
        // Fetch monitoring items
        const setupResponse = await fetch('/api/setup');
        const setupData = await setupResponse.json();
        
        if (setupResponse.ok && setupData.data) {
          setMonitoringItems(setupData.data);
        } else {
          // Initialize with empty arrays
          setMonitoringItems({
            domains: [],
            brandNames: [],
            keywords: []
          });
        }

        // Fetch brand mentions
        const mentionsResponse = await fetch('/api/mentions');
        const mentionsData = await mentionsResponse.json();

        if (mentionsResponse.ok && mentionsData.data) {
          setMentions(mentionsData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If we have monitoring items, show the dashboard
  if (monitoringItems) {
    const { domains, brandNames, keywords } = monitoringItems;
    const hasItems = domains.length > 0 || brandNames.length > 0 || keywords.length > 0;

    const filteredMentions = mentions.filter((mention) => {
      if (selectedPlatform !== 'all' && mention.platform !== selectedPlatform) return false;
      if (selectedSentiment !== 'all' && mention.sentiment !== selectedSentiment) return false;
      return true;
    });

    return (
      <div className="min-h-screen bg-gray-100">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 rounded-md bg-green-50 p-4">
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
              <div className="mb-4 rounded-md bg-red-50 p-4">
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

            {/* Enhanced Keyword Input Section */}
            <div className="mb-8">
              <div className="rounded-lg bg-white shadow overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Add Keywords to Monitor</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Track mentions of your brand, products, or industry terms across social media
                  </p>
                </div>
                
                <div className="px-6 py-5">
                  <form onSubmit={handleAddKeyword} className="space-y-4">
                    <div>
                      <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
                        Keyword
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          id="keyword"
                          type="text"
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          onFocus={() => setShowSuggestions(true)}
                          placeholder="Enter a keyword to monitor..."
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        We'll search Twitter, Reddit, and Facebook for mentions of this keyword
                      </p>
                    </div>
                    
                    {showSuggestions && keywordSuggestions.length > 0 && (
                      <div className="mt-2 rounded-md bg-gray-50 p-3">
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Suggestions</h4>
                        <div className="flex flex-wrap gap-2">
                          {keywordSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isAddingKeyword || !newKeyword.trim()}
                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAddingKeyword ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Adding keyword...
                          </>
                        ) : (
                          <>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Keyword
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
                    <span>Keywords will be monitored across all platforms and saved to your mentions list</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitoring Items Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Domains Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Domains</h3>
                  <div className="mt-2 max-h-60 overflow-y-auto">
                    {domains.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {domains.map((domain, index) => (
                          <li key={index} className="py-2">
                            <div className="flex items-center">
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">{domain}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No domains added yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Brand Names Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Brand Names</h3>
                  <div className="mt-2 max-h-60 overflow-y-auto">
                    {brandNames.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {brandNames.map((name, index) => (
                          <li key={index} className="py-2">
                            <div className="flex items-center">
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No brand names added yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Keywords Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Keywords</h3>
                  <div className="mt-2 max-h-60 overflow-y-auto">
                    {keywords.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {keywords.map((keyword, index) => (
                          <li key={index} className="py-2">
                            <div className="flex items-center">
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">{keyword}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No keywords added yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Mentions Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Brand Mentions</h3>
                <div className="flex gap-4">
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
                    Try adding keywords to monitor or adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If we don't have monitoring items, show a loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading monitoring data...</p>
      </div>
    </div>
  );
} 