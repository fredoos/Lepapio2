import { useState, useEffect } from 'react';
import type { MenuData, MenuItem } from '../types/menu';

// Fonction pour parser les fichiers Markdown
const parseMarkdownFile = (content: string): MenuItem | null => {
  try {
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontMatterMatch) return null;

    const frontMatter = frontMatterMatch[1];
    const lines = frontMatter.split('\n');
    const data: any = {};

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

    return {
      name: data.name || '',
      nameEn: data.nameEn || '',
      price: data.price || '0,00',
      description: data.description || '',
      descriptionEn: data.descriptionEn || '',
      ingredients: data.ingredients || '',
      ingredientsEn: data.ingredientsEn || '',
      order: data.order || 1,
      available: data.available !== false,
    };
  } catch (error) {
    console.warn('Erreur parsing markdown:', error);
    return null;
  }
};

// Fonction pour charger tous les fichiers d'une catégorie dynamiquement
const loadMenuCategory = async (category: string): Promise<MenuItem[]> => {
  const items: MenuItem[] = [];
  
  try {
    // Import dynamique de tous les fichiers .md de la catégorie
    const modules = import.meta.glob('/src/content/menu/**/*.md', { as: 'raw' });
    
    for (const path in modules) {
      // Vérifier si le fichier appartient à la bonne catégorie
      if (path.includes(`/menu/${category}/`)) {
        try {
          const content = await modules[path]();
          const parsed = parseMarkdownFile(content);
          if (parsed && parsed.available) {
            items.push(parsed);
          }
        } catch (error) {
          console.warn(`Erreur chargement ${path}:`, error);
        }
      }
    }

    return items.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.warn(`Erreur lors du chargement de ${category}:`, error);
    return [];
  }
};

export const useMenuData = (): MenuData => {
  const [menuData, setMenuData] = useState<MenuData>({
    entrees: [],
    plats: [],
    moules: [],
    pizzas: [],
    formules: [],
    enfant: [],
    desserts: [],
    glaces: []
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllCategories = async () => {
      try {
        setIsLoading(true);
        const categories = ['entrees', 'plats', 'moules', 'pizzas', 'formules', 'enfant', 'desserts', 'glaces'];
        const loadedData: Partial<MenuData> = {};

        await Promise.all(
          categories.map(async (category) => {
            const items = await loadMenuCategory(category);
            loadedData[category as keyof MenuData] = items;
          })
        );

        setMenuData(loadedData as MenuData);
      } catch (error) {
        console.error('Erreur générale lors du chargement du menu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllCategories();
  }, []);

  return menuData;
};