import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function parseMarkdown(content) {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) return null;

  const frontMatter = frontMatterMatch[1];
  const lines = frontMatter.split('\n');
  const data = {};

  lines.forEach(line => {
    const match = line.match(/^(\w+):\s*"?([^"]*)"?$/);
    if (match) {
      const [, key, value] = match;
      if (key === 'order') {
        data[key] = parseInt(value) || 1;
      } else if (key === 'available') {
        data[key] = value === 'true';
      } else {
        data[key] = value.replace(/^"(.*)"$/, '$1');
      }
    }
  });

  return data;
}

async function importMenuItems() {
  const menuDir = path.join(__dirname, '..', 'src', 'content', 'menu');
  const categories = ['entrees', 'potages', 'plats', 'moules', 'pizzas', 'formules', 'enfant', 'desserts', 'glaces'];

  console.log('Starting menu import...\n');

  for (const category of categories) {
    const categoryDir = path.join(menuDir, category);

    if (!fs.existsSync(categoryDir)) {
      console.log(`Category ${category} does not exist, skipping...`);
      continue;
    }

    const files = fs.readdirSync(categoryDir).filter(f => f.endsWith('.md'));

    console.log(`Importing ${files.length} items for category: ${category}`);

    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = parseMarkdown(content);

      if (!data) {
        console.log(`  ⚠️  Could not parse ${file}`);
        continue;
      }

      const menuItem = {
        category,
        name: data.name || '',
        name_en: data.nameEn || '',
        description: data.description || '',
        description_en: data.descriptionEn || '',
        ingredients: data.ingredients || '',
        ingredients_en: data.ingredientsEn || '',
        price: data.price || '0,00',
        order: data.order || 1,
        available: data.available !== false
      };

      const { error } = await supabase
        .from('menu_items')
        .insert([menuItem]);

      if (error) {
        console.log(`  ❌ Error inserting ${data.name}: ${error.message}`);
      } else {
        console.log(`  ✅ Imported: ${data.name}`);
      }
    }
    console.log('');
  }

  console.log('Menu import completed!');
}

importMenuItems().catch(console.error);
