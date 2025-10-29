import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateMenu() {
  console.log('🔄 Starting menu migration to Supabase...');

  // Read the generated menu.json
  const menuJsonPath = path.resolve(__dirname, '../public/data/menu.json');

  if (!fs.existsSync(menuJsonPath)) {
    console.error('❌ menu.json not found. Run generate-menu.js first.');
    process.exit(1);
  }

  const menuData = JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8'));

  // Clear existing menu items
  console.log('🗑️  Clearing existing menu items...');
  const { error: deleteError } = await supabase
    .from('menu_items')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (deleteError) {
    console.error('❌ Error clearing menu items:', deleteError);
    process.exit(1);
  }

  // Insert all menu items
  let totalItems = 0;

  for (const [category, items] of Object.entries(menuData)) {
    if (!Array.isArray(items) || items.length === 0) continue;

    console.log(`📝 Migrating ${items.length} items from category: ${category}`);

    const itemsToInsert = items.map(item => ({
      category,
      name: item.name,
      name_en: item.nameEn,
      description: item.description || '',
      description_en: item.descriptionEn || '',
      ingredients: item.ingredients || '',
      ingredients_en: item.ingredientsEn || '',
      price: item.price,
      order: item.order || 1,
      available: item.available !== false
    }));

    const { error: insertError } = await supabase
      .from('menu_items')
      .insert(itemsToInsert);

    if (insertError) {
      console.error(`❌ Error inserting ${category}:`, insertError);
      process.exit(1);
    }

    totalItems += items.length;
  }

  console.log(`✅ Successfully migrated ${totalItems} menu items to Supabase!`);
  console.log('🎉 Migration complete!');
}

migrateMenu().catch(console.error);
