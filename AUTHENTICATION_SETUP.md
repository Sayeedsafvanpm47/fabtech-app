# Authentication Setup Guide

This guide explains how to set up user authentication for the Fabtech app using Supabase Auth.

## Features Implemented

### ✅ **Authentication System**
- **Sign Up** - Users can create new accounts with email/password
- **Sign In** - Users can login with email/password
- **Sign Out** - Users can logout from their accounts
- **Password Reset** - Users can reset forgotten passwords
- **Profile Management** - Users can edit their profile information

### ✅ **User Interface**
- **Login Screen** - Clean, modern login interface
- **Sign Up Screen** - User registration with validation
- **Loading Screen** - Smooth loading experience
- **Profile Screen** - Complete user profile management

### ✅ **Data Integration**
- **Real User Data** - All screens now use authenticated user data
- **Dynamic Greetings** - Personalized greetings with user names
- **User Initials** - Profile icons show user initials
- **Secure Data Access** - All data is tied to authenticated users

## Setup Instructions

### 1. Enable Supabase Authentication

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Settings**
3. Enable **Email** authentication
4. Configure email templates (optional but recommended)

### 2. Update Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Run the updated `database/schema.sql` script
3. This will create proper RLS policies for authenticated users

### 3. Configure Authentication Settings

In your Supabase dashboard:

1. **Authentication** > **Settings** > **Auth**
   - Enable "Enable email confirmations" (recommended)
   - Set "Site URL" to your app's URL
   - Configure redirect URLs

2. **Authentication** > **Settings** > **Email Templates**
   - Customize signup confirmation email
   - Customize password reset email

### 4. Test Authentication Flow

1. Start your app: `npm start`
2. You should see the login screen first
3. Try creating a new account
4. Test login/logout functionality
5. Verify profile editing works

## Authentication Flow

### **App Startup**
1. App checks for existing authentication session
2. If authenticated → Show main app (TabNavigator)
3. If not authenticated → Show login screen (AuthNavigator)

### **User Registration**
1. User fills out signup form
2. Supabase creates user account
3. User receives email confirmation (if enabled)
4. User can then login

### **User Login**
1. User enters email/password
2. Supabase validates credentials
3. On success → User is logged in and redirected to main app
4. User profile is automatically created/loaded

### **Data Security**
- All user data is protected by Row Level Security (RLS)
- Users can only access their own bookings, reviews, and subscriptions
- Services are publicly viewable but bookings are user-specific

## Code Structure

### **Authentication Context** (`contexts/AuthContext.js`)
- Manages authentication state
- Provides auth functions (signIn, signUp, signOut)
- Handles user profile management
- Auto-creates user profiles on first login

### **Auth Screens**
- `LoginScreen.js` - User login interface
- `SignUpScreen.js` - User registration interface
- `LoadingScreen.js` - Loading state during auth checks

### **Updated Screens**
- All screens now use `useAuth()` hook
- Real user data instead of hardcoded "John Doe"
- Dynamic user initials and greetings
- Secure data access with user IDs

## User Experience

### **Personalized Interface**
- Greetings show actual user names
- Profile icons display user initials
- User-specific data throughout the app

### **Profile Management**
- Users can edit their name and phone number
- Profile updates are saved to Supabase
- Real-time profile synchronization

### **Secure Operations**
- All bookings are tied to authenticated users
- Reviews are associated with user accounts
- Subscriptions are user-specific

## Security Features

### **Row Level Security (RLS)**
- Users can only access their own data
- Database-level security enforcement
- Prevents unauthorized data access

### **Authentication State Management**
- Secure token handling
- Automatic session management
- Proper logout cleanup

### **Data Validation**
- Form validation on signup/login
- Email format validation
- Password strength requirements

## Troubleshooting

### **Common Issues**

1. **"User not found" errors**
   - Check if user profile was created
   - Verify RLS policies are correct
   - Ensure user is properly authenticated

2. **Login not working**
   - Check Supabase Auth settings
   - Verify email confirmation is not required
   - Check console for error messages

3. **Profile not loading**
   - Check if user profile exists in database
   - Verify RLS policies allow profile access
   - Check authentication state

### **Debug Mode**

Add this to your app for debugging:

```javascript
import { supabase } from './config/supabase';

// Enable debug logging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event, session);
});
```

## Next Steps

### **Optional Enhancements**
1. **Social Login** - Add Google/Facebook login
2. **Biometric Auth** - Add fingerprint/face ID
3. **Two-Factor Auth** - Add SMS/email verification
4. **Profile Pictures** - Add image upload functionality
5. **User Roles** - Add admin/customer roles

### **Production Considerations**
1. **Email Templates** - Customize confirmation emails
2. **Rate Limiting** - Add login attempt limits
3. **Session Management** - Configure session timeouts
4. **Audit Logging** - Track user actions
5. **Data Backup** - Regular database backups

## Support

For authentication issues:
1. Check Supabase Auth documentation
2. Review console logs for errors
3. Verify database schema and RLS policies
4. Test with a fresh user account

The authentication system is now fully integrated and ready for production use! 🎉
