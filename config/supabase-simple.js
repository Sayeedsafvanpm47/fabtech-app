import { createClient } from '@supabase/supabase-js'
import { CONFIG, getSupabaseKey } from './config'

// Supabase configuration
const supabaseUrl = CONFIG.SUPABASE_URL
const supabaseKey = getSupabaseKey()

// Create a minimal Supabase client for React Native
// This avoids the realtime module that causes bundling issues
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  // Disable realtime completely to avoid bundling issues
  realtime: {
    enabled: false,
  },
  // Use fetch for HTTP requests
  global: {
    fetch: fetch,
  },
})

// Database table names
export const TABLES = {
  SERVICES: 'services',
  BOOKINGS: 'bookings',
  USERS: 'users',
  REVIEWS: 'reviews',
  SUBSCRIPTIONS: 'subscriptions'
}

// Service functions (simplified without realtime)
export const supabaseService = {
  // Services
  async getServices() {
    const { data, error } = await supabase
      .from(TABLES.SERVICES)
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getServiceById(id) {
    const { data, error } = await supabase
      .from(TABLES.SERVICES)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async searchServices(query) {
    const { data, error } = await supabase
      .from(TABLES.SERVICES)
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Bookings
  async createBooking(bookingData) {
    const { data, error } = await supabase
      .from(TABLES.BOOKINGS)
      .insert([bookingData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async getBookings(userId) {
    const { data, error } = await supabase
      .from(TABLES.BOOKINGS)
      .select(`
        *,
        service:services(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateBooking(id, updates) {
    const { data, error } = await supabase
      .from(TABLES.BOOKINGS)
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteBooking(id) {
    const { error } = await supabase
      .from(TABLES.BOOKINGS)
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Reviews
  async getReviews(serviceId) {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .select(`
        *,
        user:users(name, avatar)
      `)
      .eq('service_id', serviceId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createReview(reviewData) {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .insert([reviewData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Subscriptions
  async getSubscriptions() {
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTIONS)
      .select('*')
      .order('price', { ascending: true })
    
    if (error) throw error
    return data
  },

  async createSubscription(subscriptionData) {
    const { data, error } = await supabase
      .from(TABLES.SUBSCRIPTIONS)
      .insert([subscriptionData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Users
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.log('User profile not found, creating default profile');
        // Return a default profile if user doesn't exist in users table
        return {
          id: userId,
          email: '',
          name: 'User',
          phone: '',
          created_at: new Date().toISOString()
        }
      }
      return data
    } catch (err) {
      console.log('Error fetching user profile:', err);
      // Return a default profile on error
      return {
        id: userId,
        email: '',
        name: 'User',
        phone: '',
        created_at: new Date().toISOString()
      }
    }
  },

  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .update(updates)
        .eq('id', userId)
        .select()
      
      if (error) {
        // If user doesn't exist, create them
        const { data: newData, error: createError } = await supabase
          .from(TABLES.USERS)
          .insert([{ id: userId, ...updates }])
          .select()
        
        if (createError) throw createError
        return newData[0]
      }
      return data[0]
    } catch (err) {
      console.log('Error updating user profile:', err);
      throw err
    }
  }
}

export default supabase
