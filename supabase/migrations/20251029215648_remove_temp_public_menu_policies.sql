/*
  # Remove temporary public write policies for menu_items

  1. Changes
    - Drop temporary public INSERT policy
    - Drop temporary public UPDATE policy
    - Drop temporary public DELETE policy
  
  2. Security
    - Restores proper security by removing public write access
    - Public can still read menu items
    - Only authenticated users can modify menu (existing policies remain)
*/

-- Remove temporary public policies
DROP POLICY IF EXISTS "Temp: public can insert menu items" ON menu_items;
DROP POLICY IF EXISTS "Temp: public can update menu items" ON menu_items;
DROP POLICY IF EXISTS "Temp: public can delete menu items" ON menu_items;
