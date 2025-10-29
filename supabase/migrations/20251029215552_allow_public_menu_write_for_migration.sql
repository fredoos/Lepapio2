/*
  # Temporarily allow public write access for menu migration

  1. Changes
    - Add temporary public INSERT policy for migration
    - Add temporary public UPDATE policy for migration
    - Add temporary public DELETE policy for migration
  
  2. Security Note
    - These are TEMPORARY policies for data migration
    - Should be removed after migration is complete
    - Public can already read menu items
*/

-- Temporary public insert policy
CREATE POLICY "Temp: public can insert menu items"
  ON menu_items
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Temporary public update policy  
CREATE POLICY "Temp: public can update menu items"
  ON menu_items
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Temporary public delete policy
CREATE POLICY "Temp: public can delete menu items"
  ON menu_items
  FOR DELETE
  TO public
  USING (true);
