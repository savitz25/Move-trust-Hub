// Minimal Supabase Database types matching our schema.
// Run `npx supabase gen types typescript --linked > types/supabase.ts` after connecting your project for full accuracy.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          slug: string;
          name: string;
          logo: string | null;
          short_description: string | null;
          description: string | null;
          founded_year: number | null;
          headquarters: string | null;
          website: string | null;
          usdot_number: string | null;
          mc_number: string | null;
          fmcsa_safety_rating: string | null;
          fmcsa_complaints: number;
          fmcsa_shipments: number;
          bbb_rating: string | null;
          bbb_accredited: boolean;
          overall_rating: number | null;
          review_count: number;
          reputation_score: number;
          years_in_business: number | null;
          avg_price_per_move: number | null;
          price_range: string | null;
          coverage: string | null;
          services: Json;
          specialties: Json;
          rating_breakdown: Json | null;
          is_verified: boolean;
          last_updated: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['companies']['Row']>;
        Update: Partial<Database['public']['Tables']['companies']['Row']>;
      };
      reviews: {
        Row: {
          id: string;
          company_id: string;
          author: string;
          rating: number;
          date: string;
          source: string;
          title: string | null;
          content: string;
          verified: boolean;
          location: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['reviews']['Row']>;
        Update: Partial<Database['public']['Tables']['reviews']['Row']>;
      };
      quote_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          from_zip: string;
          to_zip: string;
          move_date: string | null;
          home_size: string | null;
          estimated_volume: number | null;
          notes: string | null;
          source: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          phone?: string | null;
          from_zip: string;
          to_zip: string;
          move_date?: string | null;
          home_size?: string | null;
          estimated_volume?: number | null;
          notes?: string | null;
          source?: string | null;
        };
        Update: Partial<Database['public']['Tables']['quote_requests']['Row']>;
      };
    };
  };
}
