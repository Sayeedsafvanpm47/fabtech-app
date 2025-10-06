# Supabase Integration Setup

This document explains how to set up Supabase backend integration for the Fabtech app.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Supabase project created
3. Your Supabase project URL and API keys

## Setup Steps

### 1. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy your:
   - Project URL (e.g., `https://ykzzgyuipxzgmbcfnlck.supabase.co`)
   - Anon (public) key

### 2. Update Configuration

1. Open `config/config.js`
2. Replace `your-anon-key-here` with your actual Supabase anon key:

```javascript
export const CONFIG = {
  SUPABASE_URL: 'https://ykzzgyuipxzgmbcfnlck.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_f6XPsie8MPX4wfQlSNlEEQ_RrvTshUJ',
  // ... rest of config
};
```

### 3. Set Up Database Schema

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Run the SQL script to create all necessary tables

### 4. Configure Row Level Security (RLS)

The schema includes RLS policies, but you may need to adjust them based on your authentication setup:

- For now, the policies allow all operations (suitable for development)
- In production, you should implement proper authentication and restrict access

### 5. Test the Integration

1. Start your app: `npm start`
2. Navigate to the Services screen
3. Try searching for services
4. Try booking a service
5. Check your Supabase dashboard to see if data is being created

## Database Tables

The following tables are created:

- **users**: User profiles and information
- **services**: Available services offered by Fabtech
- **bookings**: User bookings and appointments
- **reviews**: Customer reviews for services
- **subscriptions**: User subscription plans
- **subscription_plans**: Available subscription plan templates

## API Functions

The app includes these Supabase service functions:

### Services
- `getServices()` - Get all services
- `getServiceById(id)` - Get specific service
- `searchServices(query)` - Search services by title/description

### Bookings
- `createBooking(data)` - Create new booking
- `getBookings(userId)` - Get user's bookings
- `updateBooking(id, updates)` - Update booking status
- `deleteBooking(id)` - Cancel booking

### Reviews
- `getReviews(serviceId)` - Get service reviews
- `createReview(data)` - Add new review

### Subscriptions
- `getSubscriptions()` - Get available plans
- `createSubscription(data)` - Subscribe to plan

### Users
- `getUserProfile(userId)` - Get user profile
- `updateUserProfile(userId, updates)` - Update profile

## Environment Variables (Optional)

For production, you can use environment variables:

1. Create a `.env` file in the project root
2. Add your Supabase credentials:

```
EXPO_PUBLIC_SUPABASE_URL=https://ykzzgyuipxzgmbcfnlck.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Troubleshooting

### Common Issues

1. **"Failed to load services"** - Check your Supabase URL and API key
2. **"Permission denied"** - Check RLS policies in Supabase
3. **"Table doesn't exist"** - Run the schema.sql script in Supabase

### Debug Mode

Enable debug logging by adding this to your app:

```javascript
import { supabase } from './config/supabase';

// Enable debug mode
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event, session);
});
```

## Next Steps

1. Implement user authentication (Supabase Auth)
2. Add real-time subscriptions for live updates
3. Implement file uploads for service images
4. Add push notifications for booking updates
5. Set up proper error handling and retry logic

## Support

For issues with Supabase integration:
1. Check the Supabase documentation
2. Review the console logs for error messages
3. Verify your database schema matches the expected structure
