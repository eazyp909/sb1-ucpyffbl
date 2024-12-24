/*
  # Create saved recipes table

  1. New Tables
    - `saved_recipes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `title` (text)
      - `ingredients` (text array)
      - `instructions` (text array)
      - `cooking_time` (text)
      - `servings` (integer)
      - `difficulty` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `saved_recipes` table
    - Add policies for users to manage their own recipes
*/

CREATE TABLE IF NOT EXISTS saved_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  ingredients text[] NOT NULL,
  instructions text[] NOT NULL,
  cooking_time text NOT NULL,
  servings integer NOT NULL,
  difficulty text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_difficulty CHECK (difficulty IN ('Easy', 'Medium', 'Hard'))
);

ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own recipes
CREATE POLICY "Users can read own recipes"
  ON saved_recipes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own recipes
CREATE POLICY "Users can insert own recipes"
  ON saved_recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own recipes
CREATE POLICY "Users can update own recipes"
  ON saved_recipes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);