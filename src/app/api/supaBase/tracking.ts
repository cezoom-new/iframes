// packages/tracking/src/tracking.ts
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://wawdpbtjltsmfwtuhada.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indhd2RwYnRqbHRzbWZ3dHVoYWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDQzODcsImV4cCI6MjA1NDQyMDM4N30.w3I9CojH947XCtOLX5o_SWSn-m-MRctDX7_rR0EtBdM'; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

export const trackPageView = async (url: string, eventType: string) => {
  console.log(`Tracking ${eventType} for: ${url}`);

  try {
    const { data, error } = await supabase
      .from('page_views')
      .insert([{ url, event_type: eventType }]);

    if (error) {
      console.error('Error inserting page view:', error.message);
    } else {
      console.log('Page view saved:', data);
    }
  } catch (err) {
    console.error('Error tracking page view:', err);
  }
};
