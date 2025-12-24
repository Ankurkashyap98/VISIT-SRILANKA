import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 12)
  const touristPassword = await bcrypt.hash('tourist123', 12)
  const hostPassword = await bcrypt.hash('host123', 12)
  const medicalPassword = await bcrypt.hash('medical123', 12)

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@srilanka.gov.lk' },
    update: {},
    create: {
      email: 'admin@srilanka.gov.lk',
      name: 'Admin User',
      password: adminPassword,
      phone: '+94 11 234 5678',
      location: 'Colombo, Sri Lanka',
      preferredTravelType: 'admin',
      role: 'admin',
      userType: 'admin',
      verified: true,
    },
  })

  // Create tourist user
  const tourist = await prisma.user.upsert({
    where: { email: 'tourist@example.com' },
    update: {},
    create: {
      email: 'tourist@example.com',
      name: 'John Tourist',
      password: touristPassword,
      phone: '+1 555 123 4567',
      location: 'New York, USA',
      preferredTravelType: 'tourist',
      role: 'user',
      userType: 'tourist',
      verified: true,
    },
  })

  // Create host user
  const host = await prisma.user.upsert({
    where: { email: 'host@example.com' },
    update: {},
    create: {
      email: 'host@example.com',
      name: 'Sarah Host',
      password: hostPassword,
      phone: '+94 77 123 4567',
      location: 'Galle, Sri Lanka',
      preferredTravelType: 'host',
      role: 'partner',
      userType: 'host',
      verified: true,
    },
  })

  // Create medical tourist user
  const medicalTourist = await prisma.user.upsert({
    where: { email: 'medical@example.com' },
    update: {},
    create: {
      email: 'medical@example.com',
      name: 'Dr. Emily Medical',
      password: medicalPassword,
      phone: '+44 20 7123 4567',
      location: 'London, UK',
      preferredTravelType: 'medical-tourist',
      role: 'user',
      userType: 'medical-tourist',
      verified: true,
    },
  })

  // Create sample destinations
  const sigiriya = await prisma.destination.upsert({
    where: { id: 'sigiriya-rock' },
    update: {},
    create: {
      id: 'sigiriya-rock',
      name: 'Sigiriya Rock Fortress',
      description: 'Ancient rock fortress and UNESCO World Heritage Site featuring stunning frescoes and panoramic views.',
      location: 'Sigiriya, Central Province',
      latitude: 7.9569,
      longitude: 80.7597,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
      ]),
      category: 'cultural',
      features: JSON.stringify(['UNESCO Heritage', 'Ancient Architecture', 'Scenic Views']),
    },
  })

  const kandy = await prisma.destination.upsert({
    where: { id: 'sacred-kandy' },
    update: {},
    create: {
      id: 'sacred-kandy',
      name: 'Sacred City of Kandy',
      description: 'The last capital of the ancient kings of Sri Lanka, home to the Temple of the Tooth Relic.',
      location: 'Kandy, Central Province',
      latitude: 7.2906,
      longitude: 80.6337,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
      ]),
      category: 'cultural',
      features: JSON.stringify(['Temple of Tooth', 'Cultural Heritage', 'City Tours']),
    },
  })

  // Create sample listing for host
  const beachVilla = await prisma.listing.upsert({
    where: { id: 'beach-villa-galle' },
    update: {},
    create: {
      id: 'beach-villa-galle',
      title: 'Cozy Beachfront Villa',
      description: 'Beautiful beachfront villa with stunning ocean views and modern amenities.',
      address: 'Unawatuna, Galle, Sri Lanka',
      latitude: 6.0027,
      longitude: 80.2460,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
      ]),
      amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Kitchen', 'Beach Access']),
      pricePerNight: 150.00,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: 'villa',
      verified: true,
      hostId: host.id,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('Created users:', { admin: admin.email, tourist: tourist.email, host: host.email, medical: medicalTourist.email })
  console.log('Created destinations:', { sigiriya: sigiriya.name, kandy: kandy.name })
  console.log('Created listing:', { villa: beachVilla.title })
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
