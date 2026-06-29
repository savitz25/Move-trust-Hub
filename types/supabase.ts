/**
 * Supabase Database types for Move Trust Hub (savitz25).
 * Regenerate after schema changes:
 *   npx supabase gen types typescript --project-id <ref> > types/supabase.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type QuoteStatus = 'new' | 'contacted' | 'matched' | 'closed' | 'spam';
export type QuoteServiceType = 'moving' | 'auto-transport';

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
          estimated_weight: number | null;
          inventory: Json | null;
          notes: string | null;
          destination_slug: string | null;
          market_priority: number | null;
          source: string | null;
          service_type: QuoteServiceType;
          auto_transport: Json | null;
          status: QuoteStatus;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
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
          estimated_weight?: number | null;
          inventory?: Json | null;
          notes?: string | null;
          destination_slug?: string | null;
          market_priority?: number | null;
          source?: string | null;
          service_type?: QuoteServiceType;
          auto_transport?: Json | null;
          status?: QuoteStatus;
        };
        Update: Partial<Database['public']['Tables']['quote_requests']['Row']>;
      };
      saved_quotes: {
        Row: {
          id: string;
          user_id: string;
          quote_request_id: string | null;
          label: string | null;
          payload: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          quote_request_id?: string | null;
          label?: string | null;
          payload?: Json;
        };
        Update: Partial<Database['public']['Tables']['saved_quotes']['Row']>;
      };
      saved_comparisons: {
        Row: {
          id: string;
          user_id: string;
          company_slugs: string[];
          name: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          company_slugs: string[];
          name?: string | null;
        };
        Update: Partial<Database['public']['Tables']['saved_comparisons']['Row']>;
      };
    };
    Views: {
      quote_analytics_summary: {
        Row: {
          day: string;
          quotes: number;
          with_phone: number;
          attributed: number;
        };
      };
    };
  };
}