# 🚀 Quick Database Setup Instructions

## ⚠️ IMPORTANT: Fix the "users table not found" Error

The error you're seeing is because the database tables haven't been created in your Supabase project yet.

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase Dashboard
2. Click on **"SQL Editor"** in the left sidebar
3. Click **"+ New query"**

### Step 2: Run the Database Setup
1. Copy the entire content from `database/quick-setup.sql`
2. Paste it into the Supabase SQL Editor
3. Click **"Run"** to execute the script

### Step 3: Verify Tables Created
After running the script, you should see these tables in your Supabase Dashboard:
- ✅ `users` - User profiles
- ✅ `services` - Manufacturing services
- ✅ `bookings` - User bookings
- ✅ `reviews` - Service reviews
- ✅ `subscriptions` - User subscriptions

### Step 4: Test the App
1. Run `npm start` in your terminal
2. Try signing up with a valid email (like `test@example.com`)
3. The app should now work without database errors!

## 🔧 What the Setup Script Does

- **Creates all required tables** with proper relationships
- **Sets up Row Level Security (RLS)** for data protection
- **Adds sample services** so you can see data immediately
- **Creates automatic user profile creation** when users sign up
- **Adds database indexes** for better performance

## 🐛 If You Still Get Errors

1. **Check your Supabase URL and Key** in `config/config.js`
2. **Make sure you're using the correct project** in Supabase
3. **Verify the tables exist** in your Supabase Dashboard
4. **Check the Supabase logs** for any error details

## 📱 Testing the App

Once the database is set up:
1. **Sign Up** - Create a new account
2. **Login** - Sign in with your credentials
3. **Browse Services** - View the sample services
4. **Book a Service** - Test the booking functionality
5. **View Profile** - Check your user profile

The app should now work perfectly! 🎉
