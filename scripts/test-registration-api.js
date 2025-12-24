const fetch = require('node-fetch')

async function testRegistrationAPI() {
  console.log('🧪 Testing Registration API...')
  
  const testData = {
    name: 'Test Registration User',
    email: 'test-registration@example.com',
    phone: '+1234567890',
    password: 'testpassword123',
    country: 'Sri Lanka',
    city: 'Colombo',
    preferredTravelType: 'tourist'
  }
  
  try {
    console.log('📤 Sending registration request...')
    console.log('Data:', JSON.stringify(testData, null, 2))
    
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })
    
    const responseData = await response.json()
    
    console.log(`📊 Response Status: ${response.status}`)
    console.log('📋 Response Data:', JSON.stringify(responseData, null, 2))
    
    if (response.ok) {
      console.log('✅ Registration API test successful!')
    } else {
      console.log('❌ Registration API test failed!')
    }
    
  } catch (error) {
    console.error('❌ Error testing registration API:', error.message)
  }
}

testRegistrationAPI()
