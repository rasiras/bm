const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Creating test user...');
  
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });
    
    if (existingUser) {
      console.log('User already exists');
      return;
    }
    
    // Hash the password
    const hashedPassword = await hash('password123', 10);
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: hashedPassword
      }
    });
    
    console.log(`Created user: ${user.email} (${user.name})`);
    
    // Create monitoring items for the user
    await prisma.monitoringItems.create({
      data: {
        userId: user.id,
        domains: [],
        brandNames: [],
        keywords: []
      }
    });
    
    console.log('Created monitoring items for the user');
    
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 