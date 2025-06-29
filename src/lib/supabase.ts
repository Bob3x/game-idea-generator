import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      game_ideas: {
        Row: {
          id: string;
          title: string;
          genre: string;
          platform: string[];
          complexity: string;
          description: string;
          core_gameplay: string;
          unique_features: string[];
          target_audience: string;
          estimated_dev_time: string;
          monetization: string | null;
          art_style: string | null;
          technical_requirements: string[];
          team_size: string | null;
          budget_estimate: string | null;
          marketing_hooks: string[];
          competitor_analysis: string | null;
          risk_factors: string[];
          mvp_features: string[];
          user_id: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          genre: string;
          platform: string[];
          complexity: string;
          description: string;
          core_gameplay: string;
          unique_features: string[];
          target_audience: string;
          estimated_dev_time: string;
          monetization?: string | null;
          art_style?: string | null;
          technical_requirements?: string[];
          team_size?: string | null;
          budget_estimate?: string | null;
          marketing_hooks?: string[];
          competitor_analysis?: string | null;
          risk_factors?: string[];
          mvp_features?: string[];
          user_id?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          genre?: string;
          platform?: string[];
          complexity?: string;
          description?: string;
          core_gameplay?: string;
          unique_features?: string[];
          target_audience?: string;
          estimated_dev_time?: string;
          monetization?: string | null;
          art_style?: string | null;
          technical_requirements?: string[];
          team_size?: string | null;
          budget_estimate?: string | null;
          marketing_hooks?: string[];
          competitor_analysis?: string | null;
          risk_factors?: string[];
          mvp_features?: string[];
          user_id?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};