# Unsplash Integration Setup Guide

## 🚀 Quick Start

Your Sri Lanka tourism app now has Unsplash integration! Here's how to get it working:

### 1. Get Your Unsplash API Key

1. Go to [https://unsplash.com/developers](https://unsplash.com/developers)
2. Sign up or log in to your Unsplash account
3. Click "Your apps" in the top right
4. Click "New Application"
5. Fill out the form:
   - **Application name**: Sri Lanka Tourism App
   - **Description**: Tourism website for Sri Lanka destinations
   - **Website URL**: http://localhost:3001 (for development)
6. Accept the terms and create the application
7. Copy your **Access Key**

### 2. Configure Your Environment

1. Open the `.env.local` file in your project root
2. Replace `your_unsplash_access_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_actual_api_key_here
   ```

### 3. Restart Your Development Server

```bash
npm run dev
```

### 4. Test the Integration

1. Open your browser to `http://localhost:3001`
2. Scroll down to the "Sri Lanka Through Photography" section
3. You should see beautiful Sri Lanka images loading from Unsplash!

## 🎯 Features

- **Smart Image Search**: Automatically searches for images based on your destination data
- **Fallback System**: Works even without API key (uses fallback methods)
- **Responsive Gallery**: Beautiful grid layout that works on all devices
- **Loading States**: Smooth loading animations and error handling
- **High Quality**: Uses Unsplash's high-resolution images

## 🔧 Customization

### Change Number of Images
In `app/page.tsx`, modify the `perPage` prop:
```tsx
<UnsplashImageGallery 
  demoJsons={featuredDestinations}
  searchQuery="Sri Lanka tourism travel"
  perPage={12} // Change this number
/>
```

### Custom Search Query
Replace the `searchQuery` prop:
```tsx
<UnsplashImageGallery 
  demoJsons={featuredDestinations}
  searchQuery="Sri Lanka beaches temples wildlife" // Your custom search
  perPage={8}
/>
```

### Use Different Data
Pass different destination data to get relevant images:
```tsx
<UnsplashImageGallery 
  demoJsons={yourCustomData} // Your own data array
  searchQuery="Sri Lanka tourism travel"
  perPage={8}
/>
```

## 🚨 Troubleshooting

### Images Not Loading?
1. Check your API key is correct in `.env.local`
2. Restart your development server after adding the API key
3. Check browser console for error messages
4. Verify your internet connection

### API Rate Limits?
Unsplash has rate limits for free accounts:
- 50 requests per hour
- 5,000 requests per month

If you hit limits, the app will fall back to alternative methods.

### Still Having Issues?
The app is designed to work even without an API key using fallback methods, so your images should still load!

## 📚 Next Steps

1. **Add more image galleries** throughout your app
2. **Customize search queries** for different sections
3. **Add image caching** for better performance
4. **Implement image optimization** with Next.js Image component

Happy coding! 🎉
