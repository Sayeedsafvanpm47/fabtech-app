// Configuration file for environment variables
// In production, these should be set as environment variables

export const CONFIG = {
  SUPABASE_URL: 'https://ykzzgyuipxzgmbcfnlck.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_f6XPsie8MPX4wfQlSNlEEQ_RrvTshUJ', // Replace with your actual anon key
  
  // App configuration
  APP_NAME: 'Fabtech',
  APP_VERSION: '1.0.0',
  
  // API endpoints
  API_BASE_URL: 'https://ykzzgyuipxzgmbcfnlck.supabase.co/rest/v1',
  
  // Default values
  DEFAULT_PAGE_SIZE: 20,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
}

// Helper function to get Supabase key
export const getSupabaseKey = () => {
  return process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || CONFIG.SUPABASE_ANON_KEY
}

export default CONFIG
