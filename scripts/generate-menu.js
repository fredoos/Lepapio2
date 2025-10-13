import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../src/content/menu');
const outputFile = path.join(__dirname, '../public/data/menu.json');

const categories = ['entrees', 'potages', 'plats', 'moules', 'pizzas', 'formules', 'enfant', 'desserts', 'glaces'];

const menuData = {};

categories.forEach(category => {
  const categoryPath = path.join(contentDir, category);

  if (!fs.existsSync(categoryPath)) {
    menuData[category] = [];
    return;
  }

  const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));

  menuData[category] = files.map(file => {
    const content = fs.readFileSync(path.join(categoryPath, file), 'utf8');
    const { data } = matter(content);

    return {
      name: data.name || '',
      nameEn: data.nameEn || '',
      price: data.price || '0,00',
      description: data.description || '',
      descriptionEn: data.descriptionEn || '',
      ingredients: data.ingredients || '',
      ingredientsEn: data.ingredientsEn || '',
      order: data.order || 1,
      available: data.available !== false
    };
  })
  .filter(item => item.available)
  .sort((a, b) => a.order - b.order);
});

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(menuData, null, 2));

console.log('✅ Menu JSON généré depuis les fichiers markdown');
