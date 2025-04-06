const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database of demo data...');
  
  // Delete all brand mentions
  const deletedMentions = await prisma.brandMention.deleteMany();
  console.log(`Deleted ${deletedMentions.count} brand mentions`);
  
  // Delete all competitors
  const deletedCompetitors = await prisma.competitor.deleteMany();
  console.log(`Deleted ${deletedCompetitors.count} competitors`);
  
  // Delete all reports
  const deletedReports = await prisma.report.deleteMany();
  console.log(`Deleted ${deletedReports.count} reports`);
  
  // Delete all monitoring items
  const deletedMonitoringItems = await prisma.monitoringItems.deleteMany();
  console.log(`Deleted ${deletedMonitoringItems.count} monitoring items`);
  
  // Get all users
  const users = await prisma.user.findMany();
  console.log(`Found ${users.length} users`);
  
  // For each user, create empty monitoring items
  for (const user of users) {
    await prisma.monitoringItems.create({
      data: {
        userId: user.id,
        domains: [],
        brandNames: [],
        keywords: []
      }
    });
    console.log(`Created empty monitoring items for user ${user.email}`);
  }
  
  console.log('Database cleared successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 