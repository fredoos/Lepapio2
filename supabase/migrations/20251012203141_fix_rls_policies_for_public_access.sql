/*
  # Fix RLS Policies for Public Access

  ## Changes
  - Drop existing restrictive policies
  - Create new permissive policies for public read access
  - Keep authenticated user policies for write operations

  ## Security
  - Public users can read all available menu items
  - Public users can read all published news articles
  - Only authenticated users can modify data
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view available menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can view all menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can insert menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can update menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can delete menu items" ON menu_items;

DROP POLICY IF EXISTS "Public can view published news" ON news_articles;
DROP POLICY IF EXISTS "Authenticated users can view all news" ON news_articles;
DROP POLICY IF EXISTS "Authenticated users can insert news" ON news_articles;
DROP POLICY IF EXISTS "Authenticated users can update news" ON news_articles;
DROP POLICY IF EXISTS "Authenticated users can delete news" ON news_articles;

-- Create new permissive policies for menu_items

-- Anyone can read all menu items (including anon users)
CREATE POLICY "Anyone can view menu items"
  ON menu_items
  FOR SELECT
  USING (true);

-- Authenticated users can insert
CREATE POLICY "Auth users can insert menu items"
  ON menu_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update
CREATE POLICY "Auth users can update menu items"
  ON menu_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete
CREATE POLICY "Auth users can delete menu items"
  ON menu_items
  FOR DELETE
  TO authenticated
  USING (true);

-- Create new permissive policies for news_articles

-- Anyone can read published news
CREATE POLICY "Anyone can view published news"
  ON news_articles
  FOR SELECT
  USING (published = true);

-- Authenticated users can view all news
CREATE POLICY "Auth users can view all news"
  ON news_articles
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert
CREATE POLICY "Auth users can insert news"
  ON news_articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update
CREATE POLICY "Auth users can update news"
  ON news_articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete
CREATE POLICY "Auth users can delete news"
  ON news_articles
  FOR DELETE
  TO authenticated
  USING (true);
