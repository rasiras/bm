import { Sentiment } from '@/types';

const positiveWords = new Set([
  'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'perfect',
  'love', 'like', 'good', 'best', 'awesome', 'brilliant', 'outstanding',
  'positive', 'happy', 'pleased', 'satisfied', 'impressive', 'innovative',
  'success', 'win', 'winning', 'winner', 'achievement', 'breakthrough'
]);

const negativeWords = new Set([
  'bad', 'terrible', 'awful', 'horrible', 'worst', 'poor', 'disappointing',
  'hate', 'dislike', 'negative', 'unhappy', 'angry', 'frustrated', 'upset',
  'fail', 'failure', 'failing', 'problem', 'issue', 'bug', 'crash', 'error',
  'broken', 'wrong', 'incorrect', 'inferior', 'subpar', 'mediocre'
]);

export function analyzeSentiment(text: string): Sentiment {
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    if (positiveWords.has(word)) positiveCount++;
    if (negativeWords.has(word)) negativeCount++;
  });

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
} 