# Supabase Setup Guide

## Overview
Your blog has been migrated to use Supabase for:
- **Post storage** - Persistent database for all blog posts
- **User authentication** - Sign up, login, and user profiles
- **Subscriptions** - Users can subscribe to blog updates
- **Following** - Users can follow specific topics/tags

## Prerequisites
1. A Supabase account (free tier available at https://supabase.com)
2. Node.js 18+ installed locally

## Setup Steps

### 1. Create a Supabase Project
- Go to https://supabase.com and create an account
- Create a new project
- Get your **Project URL** and **Anon Key** from Settings → API

### 2. Set Environment Variables
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
ADMIN_PASSWORD=arun123
```

### 3. Create Database Tables

Run these SQL queries in Supabase SQL Editor:

#### Posts Table
```sql
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'Tech',
  date TEXT NOT NULL,
  image TEXT DEFAULT '/post-1.svg',
  tags TEXT[] DEFAULT '{}',
  excerpt TEXT,
  content TEXT,
  reading_time INTEGER DEFAULT 5,
  author_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
```

#### User Profiles Table
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  subscribed_to_updates BOOLEAN DEFAULT false,
  following TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_profiles_subscribed ON user_profiles(subscribed_to_updates);
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Update Header Navigation (Optional)
Add sign in/dashboard links to the Header component. Example:
```tsx
{user ? (
  <Link href="/dashboard">Dashboard</Link>
) : (
  <Link href="/auth">Sign In</Link>
)}
```

## Usage

### For Admin (Create Posts)
1. Go to `/admin`
2. Login with your admin password (default: `arun123`)
3. Create new posts - they'll be saved to Supabase and automatically get the "latest" tag
4. Posts appear instantly on `/blog` for all users

### For Users (Sign Up & Subscribe)
1. Go to `/auth` or click "Sign In" in header
2. Create an account or sign in
3. Visit `/dashboard` to manage preferences
4. Toggle "Subscribe to Blog Updates" to get notified of new posts
5. Follow specific topics by selecting tags

## Features

### ✅ Complete
- User authentication (sign up/login)
- Admin post CRUD with Supabase
- User profiles and subscriptions
- Tag filtering and search
- Markdown post rendering
- Responsive mobile design
- Post creation automatically adds "latest" tag

### 🔜 Coming Soon (Optional)
- Email notifications when new posts published
- User comments on posts
- Post draft saves
- Image uploads for posts
- Social sharing

## Troubleshooting

### Posts not showing up
- Check that the `posts` table exists in Supabase
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check browser console for API errors

### Can't sign up
- Make sure email verification is enabled in Supabase Auth settings
- Check that `user_profiles` table exists

### Admin can't create posts
- Verify admin password is correct
- Check that you're logged in to admin panel
- Review API error response in browser console

## Next Steps
1. Test creating a post in admin panel
2. Test user signup and subscription
3. Customize notification preferences
4. Consider adding email notifications via Supabase Webhooks + email service
