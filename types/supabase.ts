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
          fmcsa_last_checked: string | null;
          authority_active: boolean | null;
          out_of_service: boolean;
          complaints_last_12m: number;
          revocation_date: string | null;
          data_hash: string | null;
          fmcsa_legal_name: string | null;
          fmcsa_raw: Json | null;
          bbb_last_checked: string | null;
          complaints_last_36m: number;
          bbb_customer_reviews: number;
          bbb_data_hash: string | null;
          bbb_business_id: string | null;
          bbb_alert_count: number;
          bbb_raw: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['companies']['Row']>;
        Update: Partial<Database['public']['Tables']['companies']['Row']>;
      };
      bbb_refresh_runs: {
        Row: {
          id: string;
          idempotency_key: string;
          mode: string;
          status: string;
          triggered_by: string;
          companies_total: number;
          companies_processed: number;
          companies_updated: number;
          companies_failed: number;
          changes_detected: number;
          error_summary: string | null;
          started_at: string;
          finished_at: string | null;
          metadata: Json | null;
        };
        Insert: Partial<Database['public']['Tables']['bbb_refresh_runs']['Row']>;
        Update: Partial<Database['public']['Tables']['bbb_refresh_runs']['Row']>;
      };
      bbb_change_log: {
        Row: {
          id: string;
          run_id: string | null;
          company_id: string;
          company_slug: string | null;
          company_name: string | null;
          field_name: string;
          old_value: string | null;
          new_value: string | null;
          severity: string;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['bbb_change_log']['Row']>;
        Update: Partial<Database['public']['Tables']['bbb_change_log']['Row']>;
      };
      fmcsa_refresh_runs: {
        Row: {
          id: string;
          idempotency_key: string;
          mode: string;
          status: string;
          triggered_by: string;
          companies_total: number;
          companies_processed: number;
          companies_updated: number;
          companies_failed: number;
          changes_detected: number;
          error_summary: string | null;
          started_at: string;
          finished_at: string | null;
          metadata: Json | null;
        };
        Insert: Partial<Database['public']['Tables']['fmcsa_refresh_runs']['Row']>;
        Update: Partial<Database['public']['Tables']['fmcsa_refresh_runs']['Row']>;
      };
      fmcsa_change_log: {
        Row: {
          id: string;
          run_id: string | null;
          company_id: string;
          company_slug: string | null;
          company_name: string | null;
          field_name: string;
          old_value: string | null;
          new_value: string | null;
          severity: string;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['fmcsa_change_log']['Row']>;
        Update: Partial<Database['public']['Tables']['fmcsa_change_log']['Row']>;
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
      moving_companies: {
        Row: {
          id: string;
          dot_number: string | null;
          mc_number: string | null;
          slug: string;
          name: string;
          address: string | null;
          city: string | null;
          state: string | null;
          zip: string | null;
          phone: string | null;
          website: string | null;
          avg_rating: number;
          review_count: number;
          approved_review_count: number;
          legacy_company_id: string | null;
          source: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['moving_companies']['Row']> & {
          slug: string;
          name: string;
        };
        Update: Partial<Database['public']['Tables']['moving_companies']['Row']>;
      };
      company_reviews: {
        Row: {
          id: string;
          company_id: string;
          user_id: string | null;
          reviewer_name: string;
          reviewer_email: string;
          rating: number;
          title: string | null;
          content: string;
          photo_urls: Json;
          status: 'pending' | 'approved' | 'rejected';
          moderation_note: string | null;
          moderated_at: string | null;
          moderated_by: string | null;
          submitter_ip: string | null;
          email_hash: string;
          move_date: string | null;
          source_page: string | null;
          verification_tier: 'email_pending' | 'verified_mth';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          company_id: string;
          reviewer_name: string;
          reviewer_email: string;
          rating: number;
          content: string;
          email_hash: string;
          verification_tier?: 'email_pending' | 'verified_mth';
          title?: string | null;
          photo_urls?: Json;
          status?: 'pending' | 'approved' | 'rejected';
          submitter_ip?: string | null;
          move_date?: string | null;
          source_page?: string | null;
          user_id?: string | null;
        };
        Update: Partial<Database['public']['Tables']['company_reviews']['Row']>;
      };
      review_rate_limits: {
        Row: {
          id: string;
          ip_hash: string;
          email_hash: string | null;
          attempt_count: number;
          window_start: string;
          last_attempt_at: string;
        };
        Insert: {
          ip_hash: string;
          email_hash?: string | null;
        };
        Update: Partial<Database['public']['Tables']['review_rate_limits']['Row']>;
      };
      dot_verifications: {
        Row: {
          id: string;
          dot_number: string;
          number_type: 'DOT' | 'MC';
          searched_at: string;
          user_ip: string | null;
          source_page: string | null;
        };
        Insert: {
          dot_number: string;
          number_type?: 'DOT' | 'MC';
          user_ip?: string | null;
          source_page?: string | null;
        };
        Update: Partial<Database['public']['Tables']['dot_verifications']['Row']>;
      };
      company_suggestions: {
        Row: {
          id: string;
          name: string;
          usdot: string | null;
          mc_number: string | null;
          details: string | null;
          status: 'pending' | 'approved' | 'rejected';
          suggested_by_name: string | null;
          suggested_by_email: string | null;
          submitter_ip: string | null;
          ip_hash: string | null;
          email_hash: string | null;
          source_page: string | null;
          legal_name: string | null;
          headquarters: string | null;
          phone: string | null;
          authority_status: string | null;
          fmcsa_preview: Json | null;
          fmcsa_raw: Json | null;
          company_id: string | null;
          moderation_note: string | null;
          moderated_at: string | null;
          moderated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          email_hash: string;
          usdot?: string | null;
          mc_number?: string | null;
          details?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          suggested_by_name?: string | null;
          suggested_by_email?: string | null;
          submitter_ip?: string | null;
          ip_hash?: string | null;
          source_page?: string | null;
          legal_name?: string | null;
          headquarters?: string | null;
          phone?: string | null;
          authority_status?: string | null;
          fmcsa_preview?: Json | null;
          fmcsa_raw?: Json | null;
        };
        Update: Partial<Database['public']['Tables']['company_suggestions']['Row']>;
      };
      suggestion_rate_limits: {
        Row: {
          id: string;
          ip_hash: string;
          email_hash: string;
          created_at: string;
        };
        Insert: {
          ip_hash: string;
          email_hash: string;
        };
        Update: Partial<Database['public']['Tables']['suggestion_rate_limits']['Row']>;
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