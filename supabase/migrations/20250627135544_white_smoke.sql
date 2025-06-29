/*
  # Fix duplicate policies issue
  
  This migration safely creates policies only if they don't already exist,
  preventing the "policy already exists" error.
*/

-- Drop existing policies if they exist (safe approach)
DO $$ 
BEGIN
  -- Drop policies if they exist
  DROP POLICY IF EXISTS "Users can read own game ideas" ON game_ideas;
  DROP POLICY IF EXISTS "Users can create game ideas" ON game_ideas;
  DROP POLICY IF EXISTS "Users can update own game ideas" ON game_ideas;
  DROP POLICY IF EXISTS "Users can delete own game ideas" ON game_ideas;
  DROP POLICY IF EXISTS "Anyone can read public game ideas" ON game_ideas;
EXCEPTION
  WHEN undefined_table THEN
    -- Table doesn't exist, which is fine
    NULL;
END $$;

-- Ensure table exists
CREATE TABLE IF NOT EXISTS game_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  genre text NOT NULL,
  platform text[] NOT NULL DEFAULT '{}',
  complexity text NOT NULL,
  description text NOT NULL,
  core_gameplay text NOT NULL,
  unique_features text[] NOT NULL DEFAULT '{}',
  target_audience text NOT NULL,
  estimated_dev_time text NOT NULL,
  monetization text DEFAULT '',
  art_style text DEFAULT '',
  technical_requirements text[] DEFAULT '{}',
  team_size text DEFAULT '',
  budget_estimate text DEFAULT '',
  marketing_hooks text[] DEFAULT '{}',
  competitor_analysis text DEFAULT '',
  risk_factors text[] DEFAULT '{}',
  mvp_features text[] DEFAULT '{}',
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE game_ideas ENABLE ROW LEVEL SECURITY;

-- Create policies (now safe since we dropped them above)
CREATE POLICY "Users can read own game ideas"
  ON game_ideas
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create game ideas"
  ON game_ideas
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own game ideas"
  ON game_ideas
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own game ideas"
  ON game_ideas
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read public game ideas"
  ON game_ideas
  FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists, then create it
DROP TRIGGER IF EXISTS update_game_ideas_updated_at ON game_ideas;
CREATE TRIGGER update_game_ideas_updated_at
  BEFORE UPDATE ON game_ideas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();