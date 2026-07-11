/**
 * Lender Trust Hub — Supabase Database types.
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

export type LeadCategory = 'fdic' | 'mortgage' | 'auto' | 'credit-repair' | 'mca';
export type LeadStatus = 'new' | 'contacted' | 'matched' | 'closed' | 'spam';

export type Database = {
  public: {
    Tables: {
      lenders: {
        Row: {
          id: string;
          slug: string;
          name: string;
          nmls_id: string;
          lender_type: string;
          city: string | null;
          state: string;
          state_slug: string;
          county: string;
          county_slug: string;
          zip_codes: Json;
          rating: number | null;
          review_count: number;
          trust_score: number;
          county_experience_score: number;
          loan_types: Json;
          specialties: Json;
          credit_tiers: Json;
          nmls_verified: boolean;
          cfpb_complaints: number;
          bbb_rating: string | null;
          google_rating: number | null;
          trustpilot_rating: number | null;
          short_description: string | null;
          website: string | null;
          phone: string | null;
          is_featured: boolean;
          zero_paid_placement: boolean;
          nmls_preview: Json | null;
          google_data: Json | null;
          public_scrape_data: Json | null;
          cfpb_complaints_data: Json | null;
          verification_sources: Json | null;
          transparency_note: string | null;
          published_from_onboarding: boolean;
          data_freshness_note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['lenders']['Row']> & {
          id: string;
          slug: string;
          name: string;
          nmls_id: string;
          state: string;
          state_slug: string;
          county: string;
          county_slug: string;
        };
        Update: Partial<Database['public']['Tables']['lenders']['Row']>;
        Relationships: [];
      };
      counties: {
        Row: {
          id: string;
          state: string;
          state_slug: string;
          county: string;
          county_slug: string;
          lender_count: number;
          region: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          state: string;
          state_slug: string;
          county: string;
          county_slug: string;
          lender_count?: number;
          region?: string | null;
        };
        Update: Partial<Database['public']['Tables']['counties']['Row']>;
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          lender_id: string;
          author: string;
          rating: number;
          review_date: string;
          source: string;
          title: string | null;
          content: string;
          verified: boolean;
          location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lender_id: string;
          author: string;
          rating: number;
          review_date: string;
          source: string;
          content: string;
          title?: string | null;
          verified?: boolean;
          location?: string | null;
        };
        Update: Partial<Database['public']['Tables']['reviews']['Row']>;
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          lender_id: string | null;
          author: string;
          quote: string;
          context: string | null;
          featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          lender_id?: string | null;
          author: string;
          quote: string;
          context?: string | null;
          featured?: boolean;
          sort_order?: number;
        };
        Update: Partial<Database['public']['Tables']['testimonials']['Row']>;
        Relationships: [];
      };
      lead_submissions: {
        Row: {
          id: string;
          email: string;
          category: LeadCategory;
          state_name: string | null;
          intent: string;
          source: string | null;
          variant: string | null;
          calculator_payload: Json | null;
          status: LeadStatus;
          created_at: string;
        };
        Insert: {
          email: string;
          category?: LeadCategory;
          state_name?: string | null;
          intent: string;
          source?: string | null;
          variant?: string | null;
          calculator_payload?: Json | null;
          status?: LeadStatus;
        };
        Update: Partial<Database['public']['Tables']['lead_submissions']['Row']>;
        Relationships: [];
      };
      lender_onboarding_submissions: {
        Row: {
          id: string;
          name: string;
          nmls_id: string;
          lender_type: string | null;
          details: string | null;
          status: string;
          submitted_by_name: string | null;
          submitted_by_email: string | null;
          submitter_ip: string | null;
          ip_hash: string | null;
          email_hash: string | null;
          source_page: string | null;
          legal_name: string | null;
          street_address: string | null;
          city: string | null;
          state: string | null;
          zip: string | null;
          phone: string | null;
          fax: string | null;
          website: string | null;
          business_email: string | null;
          date_formed: string | null;
          nmls_preview: Json | null;
          nmls_raw: Json | null;
          google_data: Json | null;
          public_scrape_data: Json | null;
          cfpb_data: Json | null;
          county_slug: string | null;
          state_slug: string | null;
          county_experience_score: number | null;
          lender_id: string | null;
          moderation_note: string | null;
          moderated_at: string | null;
          moderated_by: string | null;
          needs_manual_review: boolean;
          transparency_disclaimer: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          nmls_id: string;
          status?: string;
          lender_type?: string | null;
          details?: string | null;
          submitted_by_name?: string | null;
          submitted_by_email?: string | null;
          submitter_ip?: string | null;
          ip_hash?: string | null;
          email_hash?: string | null;
          source_page?: string | null;
          legal_name?: string | null;
          street_address?: string | null;
          city?: string | null;
          state?: string | null;
          zip?: string | null;
          phone?: string | null;
          fax?: string | null;
          website?: string | null;
          business_email?: string | null;
          date_formed?: string | null;
          nmls_preview?: Json | null;
          nmls_raw?: Json | null;
          google_data?: Json | null;
          public_scrape_data?: Json | null;
          cfpb_data?: Json | null;
          county_slug?: string | null;
          state_slug?: string | null;
          county_experience_score?: number | null;
          lender_id?: string | null;
          needs_manual_review?: boolean;
          transparency_disclaimer?: string | null;
        };
        Update: Partial<Database['public']['Tables']['lender_onboarding_submissions']['Row']>;
        Relationships: [];
      };
      lender_onboarding_rate_limits: {
        Row: {
          id: string;
          ip_hash: string;
          email_hash: string | null;
          created_at: string;
        };
        Insert: {
          ip_hash: string;
          email_hash?: string | null;
        };
        Update: Partial<Database['public']['Tables']['lender_onboarding_rate_limits']['Row']>;
        Relationships: [];
      };
      saved_calculator_scenarios: {
        Row: {
          id: string;
          session_id: string | null;
          user_id: string | null;
          calc_id: string;
          label: string | null;
          payload: Json;
          share_token: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          session_id?: string | null;
          user_id?: string | null;
          calc_id: string;
          label?: string | null;
          payload?: Json;
          share_token?: string | null;
        };
        Update: Partial<Database['public']['Tables']['saved_calculator_scenarios']['Row']>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};