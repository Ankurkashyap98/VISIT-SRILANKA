const { PrismaClient } = require('@prisma/client')

async function testPrisma() {
  console.log('🔍 Testing Prisma client...')
  console.log('DATABASE_URL:', process.env.DATABASE_URL)
  
  const prisma = new PrismaClient()
  
  try {
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Prisma connected successfully!')
    
    // Test a simple query
    const userCount = await prisma.user.count()
    console.log('📊 User count:', userCount)
    
    // Test creating a user
    const testUser = await prisma.user.create({
      data: {
        name: 'Prisma Test User',
        email: 'prisma-test@example.com',
        password: 'hashedpassword',
        userType: 'tourist',
        role: 'user',
        preferredTravelType: 'general',
        location: 'Test City, Test Country'
      }
    })
    console.log('✅ Test user created:', testUser.email)
    
    // Clean up
    await prisma.user.delete({
      where: { id: testUser.id }
    })
    console.log('🧹 Test user cleaned up')
    
  } catch (error) {
    console.error('❌ Prisma error:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    })
  } finally {
    await prisma.$disconnect()
    console.log('🔌 Prisma disconnected')
  }
}

testPrisma()

