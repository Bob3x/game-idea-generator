/*
  # Create game ideas storage system

  1. New Tables
    - `game_ideas`
      - `id` (uuid, primary key)
      - `title` (text)
      - `genre` (text)
      - `platform` (text array)
      - `complexity` (text)
      - `description` (text)
      - `core_gameplay` (text)
      - `unique_features` (text array)
      - `target_audience` (text)
      - `estimated_dev_time` (text)
      - `monetization` (text)
      - `art_style` (text)
      - `technical_requirements` (text array)
      - `team_size` (text)
      - `budget_estimate` (text)
      - `marketing_hooks` (text array)
      - `competitor_analysis` (text)
      - `risk_factors` (text array)
      - `mvp_features` (text array)
      - `user_id` (uuid, references auth.users)
      - `is_public` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `game_ideas` table
    - Add policies for users to manage their own ideas
    - Add policy for public ideas to be readable by everyone
*/

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

-- Users can read their own ideas
CREATE POLICY "Users can read own game ideas"
  ON game_ideas
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own ideas
CREATE POLICY "Users can create game ideas"
  ON game_ideas
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own ideas
CREATE POLICY "Users can update own game ideas"
  ON game_ideas
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own ideas
CREATE POLICY "Users can delete own game ideas"
  ON game_ideas
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Anyone can read public ideas
CREATE POLICY "Anyone can read public game ideas"
  ON game_ideas
  FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_game_ideas_updated_at
  BEFORE UPDATE ON game_ideas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();