const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Creating demo user and data...');
  
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'a@a.com' }
    });
    
    if (existingUser) {
      console.log('Demo user already exists, updating data...');
      
      // Update monitoring items
      await prisma.monitoringItems.upsert({
        where: { userId: existingUser.id },
        update: {
          domains: ['example.com', 'competitor1.com', 'competitor2.com'],
          brandNames: ['Demo Brand', 'Demo Company'],
          keywords: ['demo', 'brand monitoring', 'social media', 'marketing']
        },
        create: {
          userId: existingUser.id,
          domains: ['example.com', 'competitor1.com', 'competitor2.com'],
          brandNames: ['Demo Brand', 'Demo Company'],
          keywords: ['demo', 'brand monitoring', 'social media', 'marketing']
        }
      });
      
      // Add brand mentions
      await addBrandMentions(existingUser.id);
      
      // Add competitors
      await addCompetitors(existingUser.id);
      
      // Add reports
      await addReports(existingUser.id);
      
      console.log('Demo data updated successfully!');
      return;
    }
    
    // Hash the password
    const hashedPassword = await hash('password123', 10);
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        email: 'a@a.com',
        name: 'Demo User',
        password: hashedPassword
      }
    });
    
    console.log(`Created demo user: ${user.email} (${user.name})`);
    
    // Create monitoring items for the user
    await prisma.monitoringItems.create({
      data: {
        userId: user.id,
        domains: ['example.com', 'competitor1.com', 'competitor2.com'],
        brandNames: ['Demo Brand', 'Demo Company'],
        keywords: ['demo', 'brand monitoring', 'social media', 'marketing']
      }
    });
    
    console.log('Created monitoring items for the demo user');
    
    // Add brand mentions
    await addBrandMentions(user.id);
    
    // Add competitors
    await addCompetitors(user.id);
    
    // Add reports
    await addReports(user.id);
    
    console.log('Demo data created successfully!');
    
  } catch (error) {
    console.error('Error creating demo data:', error);
  }
}

async function addBrandMentions(userId) {
  // Delete existing mentions
  await prisma.brandMention.deleteMany({
    where: { userId }
  });
  
  // Create new mentions
  const mentions = [
    {
      content: 'Just tried @DemoBrand and it\'s amazing! Really impressed with the features.',
      platform: 'twitter',
      author: 'John Doe (@johndoe)',
      sentiment: 'positive',
      url: 'https://twitter.com/johndoe/status/123456789',
      engagement: { likes: 42, retweets: 12, replies: 5 }
    },
    {
      content: 'Not sure about @DemoBrand, seems overpriced for what it offers.',
      platform: 'twitter',
      author: 'Jane Smith (@janesmith)',
      sentiment: 'negative',
      url: 'https://twitter.com/janesmith/status/987654321',
      engagement: { likes: 15, retweets: 3, replies: 8 }
    },
    {
      content: 'Just a neutral comment about @DemoBrand, nothing special.',
      platform: 'twitter',
      author: 'Bob Johnson (@bobjohnson)',
      sentiment: 'neutral',
      url: 'https://twitter.com/bobjohnson/status/456789123',
      engagement: { likes: 7, retweets: 1, replies: 2 }
    },
    {
      content: 'I love using Demo Brand for my business! It has helped me grow my company by 25%.',
      platform: 'reddit',
      author: 'Alice Williams (u/alicewilliams)',
      sentiment: 'positive',
      url: 'https://reddit.com/r/business/comments/123456',
      engagement: { likes: 78, comments: 23 }
    },
    {
      content: 'Demo Brand is releasing a new feature next week. Looking forward to trying it out!',
      platform: 'news',
      author: 'Tech News Daily',
      sentiment: 'neutral',
      url: 'https://technewsdaily.com/article/12345',
      engagement: { shares: 45, comments: 12 }
    }
  ];
  
  for (const mention of mentions) {
    await prisma.brandMention.create({
      data: {
        userId,
        ...mention
      }
    });
  }
  
  console.log(`Added ${mentions.length} brand mentions`);
}

async function addCompetitors(userId) {
  // Delete existing competitors
  await prisma.competitor.deleteMany({
    where: { userId }
  });
  
  // Create new competitors
  const competitors = [
    {
      name: 'Competitor One',
      website: 'https://competitor1.com',
      keywords: ['competitor', 'alternative', 'similar product'],
      mentions: {
        total: 1250,
        positive: 650,
        neutral: 400,
        negative: 200
      },
      sentiment: {
        overall: 0.72,
        trend: 'increasing'
      },
      marketShare: 35.5
    },
    {
      name: 'Competitor Two',
      website: 'https://competitor2.com',
      keywords: ['competitor', 'alternative', 'similar product'],
      mentions: {
        total: 980,
        positive: 420,
        neutral: 380,
        negative: 180
      },
      sentiment: {
        overall: 0.65,
        trend: 'stable'
      },
      marketShare: 28.3
    }
  ];
  
  for (const competitor of competitors) {
    await prisma.competitor.create({
      data: {
        userId,
        ...competitor
      }
    });
  }
  
  console.log(`Added ${competitors.length} competitors`);
}

async function addReports(userId) {
  // Delete existing reports
  await prisma.report.deleteMany({
    where: { userId }
  });
  
  // Create new reports
  const reports = [
    {
      title: 'Weekly Sentiment Analysis',
      type: 'sentiment',
      data: {
        positive: 65,
        neutral: 25,
        negative: 10,
        trend: 'improving',
        topKeywords: ['great', 'love', 'recommend', 'disappointed', 'expensive']
      },
      period: 'weekly'
    },
    {
      title: 'Monthly Competitor Analysis',
      type: 'competitor',
      data: {
        marketShare: {
          'Demo Brand': 36.2,
          'Competitor One': 35.5,
          'Competitor Two': 28.3
        },
        sentimentComparison: {
          'Demo Brand': 0.78,
          'Competitor One': 0.72,
          'Competitor Two': 0.65
        },
        topMentions: [
          { brand: 'Demo Brand', count: 1250, sentiment: 0.78 },
          { brand: 'Competitor One', count: 980, sentiment: 0.72 },
          { brand: 'Competitor Two', count: 750, sentiment: 0.65 }
        ]
      },
      period: 'monthly'
    },
    {
      title: 'Quarterly Trend Report',
      type: 'trend',
      data: {
        topTrends: [
          { keyword: 'brand monitoring', growth: 45, sentiment: 0.82 },
          { keyword: 'social media', growth: 32, sentiment: 0.75 },
          { keyword: 'marketing', growth: 28, sentiment: 0.68 }
        ],
        platformDistribution: {
          twitter: 45,
          reddit: 30,
          news: 25
        },
        recommendations: [
          'Increase focus on Twitter engagement',
          'Develop more content around brand monitoring',
          'Consider expanding to Instagram platform'
        ]
      },
      period: 'quarterly'
    }
  ];
  
  for (const report of reports) {
    await prisma.report.create({
      data: {
        userId,
        ...report
      }
    });
  }
  
  console.log(`Added ${reports.length} reports`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 