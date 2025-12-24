const { PrismaClient } = require('@prisma/client')

async function testDatabase() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔍 Testing database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    // Check existing users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        createdAt: true
      }
    })
    
    console.log(`📊 Found ${users.length} users in database:`)
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - ${user.userType} - Created: ${user.createdAt}`)
    })
    
    // Test creating a user
    console.log('\n🧪 Testing user creation...')
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password',
        userType: 'tourist',
        role: 'user',
        preferredTravelType: 'general',
        location: 'Test City, Test Country'
      }
    })
    
    console.log('✅ Test user created successfully:', testUser.email)
    
    // Clean up test user
    await prisma.user.delete({
      where: { id: testUser.id }
    })
    console.log('🧹 Test user cleaned up')
    
  } catch (error) {
    console.error('❌ Database error:', error)
  } finally {
    await prisma.$disconnect()
    console.log('🔌 Database disconnected')
  }
}

testDatabase()
